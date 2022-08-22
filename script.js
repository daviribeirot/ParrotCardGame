let contaJogadas = 0;
let qtdCartas = [];
let imgParrots = [
    "imagens/bobrossparrot.gif",
    "imagens/explodyparrot.gif",
    "imagens/fiestaparrot.gif",
    "imagens/metalparrot.gif",
    "imagens/revertitparrot.gif",
    "imagens/tripletsparrot.gif",
    "imagens/unicornparrot.gif"
];
let qntDeFinalizados = 0;

function iniciarJogo() {
  imgParrots.sort(comparador);
  const lista = document.querySelector(".cartas");

  qntDeFinalizados = 0;
  contaJogadas = 0;
  lista.innerHTML = "";
  qtdCartas = [];
 

  let num = 0;
  while (num < 4 || num > 14 || num % 2 === 1) {
    num = prompt("Digite o número de cartas (números pares entre 4 e 14)");
  }

  for (let i = 0; i < num / 2; i++) {
    qtdCartas[i] = imgParrots[i];
  }

  for (let i = 0; i < num / 2; i++) {
    qtdCartas.push(qtdCartas[i]);
  }

  qtdCartas.sort(comparador);

  for (let i = 0; i < num; i++) {
    
    lista.innerHTML += `
              <li class="carta" onclick="virarCarta(this)">
              <div class="frente face">
                <img class="images" src="./imagens/front.png"/>
              </div>
              <div class="verso face">
                  <img class="images" src=${qtdCartas[i]}>
              </div>
              </li> `;
  }
}

const lista = document.querySelector(".cartas");
let frentes = [];
let imagens = [];

function virarCarta(cartaAtual) {
  const frente = cartaAtual.querySelector(".frente");
  const verso = cartaAtual.querySelector(".verso");

  if (
    frente.classList.contains("finalizado") ||
    lista.classList.contains("espera")
  ) {
    return;
  } else if (frentes[0] === undefined) {

    verso.classList.add("verso-click");
    frente.classList.add("frente-click");

    frentes[0] = frente;
    imagens[0] = verso.querySelector(".images");

    contaJogadas++;
  } else if (imagens[0].parentNode === verso) {
    return;
  } else if (imagens[0].src === verso.querySelector(".images").src) {
    verso.classList.add("verso-click");
    frente.classList.add("frente-click");

    frentes[0].classList.add("finalizado");
    frente.classList.add("finalizado");

    frentes = [];
    imagens = [];

    qntDeFinalizados++;
    contaJogadas++;

    setTimeout(alertaFinal, 400);
    setTimeout(reset, 500);
  }  else {
    verso.classList.add("verso-click");
    frente.classList.add("frente-click");

    lista.classList.add("espera");

    setTimeout(desviraAsCartas, 1000, imagens[0], frentes[0], verso, frente);

    frentes = [];
    imagens = [];

    contaJogadas++;
  }
}
function comparador() {
  return Math.random() - 0.5;
}

function desviraAsCartas(var1, var2, var3, var4) {
  var1.parentNode.classList.remove("verso-click");
  var2.classList.remove("frente-click");
  var3.classList.remove("verso-click");
  var4.classList.remove("frente-click");

  lista.classList.remove("espera");
}

iniciarJogo();

function alertaFinal() {
  if (qntDeFinalizados === qtdCartas.length / 2) {
    alert(
      `Você ganhou em ${contaJogadas} jogadas!`
    );
  }
}
function reset() {
  let recomecar = "";
  if (qntDeFinalizados === qtdCartas.length / 2) {
    recomecar = prompt("Deseja recomeçar o jogo? (sim ou não): ");

    if (recomecar === "não") {
      return;
    } else if (recomecar === "sim") {
      iniciarJogo();
    } else {
      reset();
    }
  }
}