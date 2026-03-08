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

/* calcular média */
const soma = valores.reduce((a,b) => a + b, 0);
const mediaCorreta = soma / valores.length;

/* botão responder */
resolverBtn.onclick = () => {

  const respostaAluno = prompt(
    "Qual é o valor da média desses números?"
  );

  if (respostaAluno === null) return;

  const acertou = Number(respostaAluno) === mediaCorreta;

  tentativas.media.push({
    valores:[...valores],
    respostaAluno,
    correta:mediaCorreta,
    acertou
  });

  mostrarResultado(
    "média",
    respostaAluno,
    mediaCorreta,
    acertou
  );

};

})();