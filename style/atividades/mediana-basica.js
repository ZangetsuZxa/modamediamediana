(function(){

numbersArea.innerHTML = '';
resultado.innerHTML = '';

/* quantidade aleatória de 5 a 10 */
const quantidade = Math.floor(Math.random() * 6) + 5;

let valores = [];

/* gerar números aleatórios */
for (let i = 0; i < quantidade; i++) {
  const n = Math.floor(Math.random() * 10) + 1;
  valores.push(n);
}

/* ordenar em ordem crescente */
valores.sort((a,b) => a - b);

/* mostrar números */
valores.forEach(v => criarNumero(v));

/* calcular mediana */
let medianaCorreta;

if (valores.length % 2 === 1) {
  medianaCorreta = valores[Math.floor(valores.length / 2)];
} else {
  const meio1 = valores[valores.length/2 - 1];
  const meio2 = valores[valores.length/2];
  medianaCorreta = (meio1 + meio2) / 2;
}

/* botão responder */
resolverBtn.onclick = () => {

  const respostaAluno = prompt(
    "Qual é o valor da mediana desses números?"
  );

  if (respostaAluno === null) return;

  const acertou = Number(respostaAluno) === medianaCorreta;

  tentativas.mediana.push({
    valores:[...valores],
    respostaAluno,
    correta:medianaCorreta,
    acertou
  });

  mostrarResultado(
    "mediana",
    respostaAluno,
    medianaCorreta,
    acertou
  );

};

})();