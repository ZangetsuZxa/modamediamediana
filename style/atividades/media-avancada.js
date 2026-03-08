(function(){

numbersArea.innerHTML = '';
resultado.innerHTML = '';

/* mais números */
const quantidade = Math.floor(Math.random() * 8) + 8; // 8 a 15

let valores = [];

/* valores maiores */
for (let i = 0; i < quantidade; i++) {
  const n = Math.floor(Math.random() * 50) + 1;
  valores.push(n);
}

/* ordenar */
valores.sort((a,b)=>a-b);

/* mostrar */
valores.forEach(v => criarNumero(v));

const soma = valores.reduce((a,b)=>a+b,0);
const mediaCorreta = soma / valores.length;

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