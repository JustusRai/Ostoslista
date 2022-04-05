var ostoslista = {
  // (A) INITIALIZE TO DO LIST
  järjestys : [],
  Add : null, // html add item tekstikenttä
  Template : null, // html item row template
  List : null, // html to do list
  alusta : function() {
    // (A1) INIT LOCALSTORAGE
    if (localStorage.JustuksenOstoslista == undefined) { localStorage.JustuksenOstoslista = "[]"; }

    // (A2) RESTORE PREVIOUS SESSION
    ostoslista.järjestys = JSON.parse(localStorage.JustuksenOstoslista);

    // (A3) GET HTML ELEMENTS
    ostoslista.Add = document.getElementById("todo-item");
    ostoslista.Template = document.getElementById("todo-template").content;
    ostoslista.List = document.getElementById("todo-list");

    // (A4) "ENABLE" ADD ITEM FORM
    document.getElementById("todo-add").onsubmit = ostoslista.add;

    // (A5) DRAW TO DO LIST
    ostoslista.draw();
  },

  // (B) DRAW TO DO LIST
  draw : function() {
    // (B1) RESET LIST
    ostoslista.List.innerHTML = "";

    // (B2) LOOP & GENERATE ROWS
    if (ostoslista.järjestys.length>0) { for (let id in ostoslista.järjestys) {
      let row = ostoslista.Template.cloneNode(true);
      row.querySelector(".todo-item").textContent = ostoslista.järjestys[id][0];
      row.querySelector(".todo-done").onclick = () => { ostoslista.toggle(id); };
      row.querySelector(".todo-del").onclick = () => { ostoslista.del(id); };
      if (ostoslista.järjestys[id][1]) {
        row.querySelector(".todo-item").classList.add("todo-ok");
      }
      ostoslista.List.appendChild(row);
    }}
  },

  // (C) HELPER - SAVE DATA INTO LOCAL STORAGE
  save: function() {
    localStorage.JustuksenOstoslista = JSON.stringify(ostoslista.järjestys);
    ostoslista.draw();
  },

  // (D) ADD A NEW ITEM TO THE LIST
  add : function() {
    ostoslista.järjestys.push([ostoslista.Add.value, false]);
    ostoslista.Add.value = "";
    ostoslista.save();
    return false;
  },

  // (E) UPDATE TODO ITEM DONE/NOT YET
  toggle: (id) => {
    ostoslista.järjestys[id][1] = !ostoslista.järjestys[id][1];
    ostoslista.save();
  },

  // (F) DELETE ITEM
  del: (id) => { 
    if (confirm("Poista listalta?")) {
    ostoslista.järjestys.splice(id, 1);
    ostoslista.save();
  }}
};

// (G) PAGE INIT
window.addEventListener("load", ostoslista.alusta);
