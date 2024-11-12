let input = document.getElementById('inputTarefa');
let btnAdd = document.getElementById('btnAdd');
let btnDelete = document.getElementById('btnDelete');
let main = document.getElementById('areaLista');
let contador = 0;

function addTarefa(){
  // pegar o valor digitado no input
  let valorInput = input.value;

  //validação
  if (valorInput !== "" && valorInput !== null && valorInput !== undefined) {
    ++contador;
    let novoItem = `<div id="${contador}" class="item">
      <div onclick="marcarTarefa(${contador})" class="itemIcone">
        <i id="icone_${contador}" class="mdi mdi-circle-outline"></i>
      </div>
      <div class="itemNome">
        ${valorInput}
      </div>
      <div class="itemBotao">
        <button onclick="deletarTarefa(${contador})" id="btnDelete" class="delete"><i class="mdi mdi-delete"></i> Deletar</button>
      </div>
    </div>`

    // adicionar novo item no main
    main.innerHTML += novoItem;

    //zerar o campo
    input.value = "";
    input.focus();
  }
}

input.addEventListener("keyup", function(event) {
  if(event.keyCode === 13) {
    event.preventDefault();
    btnAdd.click();
  }
});

function deletarTarefa(id) {
  var element = document.getElementById(id);
  element.remove();
}

function marcarTarefa(id) {
  var item = document.getElementById(id);
  var classe = item.getAttribute('class');

  if (classe === "item") {
    item.classList.add('clicado');

    var icone = document.getElementById('icone_'+id)
    icone.classList.remove('mdi-circle-outline');
    icone.classList.add('mdi-check-circle');

    item.parentNode.appendChild(item);
  } else {
    item.classList.remove('clicado');

    var icone = document.getElementById('icone_'+id)
    icone.classList.add('mdi-circle-outline');
    icone.classList.remove('mdi-check-circle');
  }
}