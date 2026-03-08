(function(){

numbersArea.innerHTML = '';
resultado.innerHTML = '';

/* quantidade maior */
const quantidade = Math.floor(Math.random() * 6) + 10; // 10 a 15

let valores = [];

/* números maiores */
for (let i = 0; i < quantidade; i++) {
  const n = Math.floor(Math.random() * 20) + 1;
  valores.push(n);
}

/* mostrar números */
valores.forEach(v => criarNumero(v));

resolverBtn.onclick = () => {

  const respostaAluno = prompt(
    "Qual é a moda? (separe por vírgula se houver mais de uma)"
  );

  if (respostaAluno === null) return;

  const contagem = {};

  valores.forEach(v => contagem[v] = (contagem[v] || 0) + 1);

  const max = Math.max(...Object.values(contagem));

  const correta = Object.keys(contagem)
    .filter(v => contagem[v] === max)
    .map(Number)
    .sort((a,b)=>a-b);

  const respostaTratada = respostaAluno
    .split(',')
    .map(v => Number(v.trim()))
    .filter(v => !isNaN(v))
    .sort((a,b)=>a-b);

  const acertou =
    JSON.stringify(respostaTratada) ===
    JSON.stringify(correta);

  tentativas.moda.push({
    valores:[...valores],
    respostaAluno,
    correta,
    acertou
  });

  mostrarResultado(
    "moda",
    respostaAluno,
    correta,
    acertou
  );

};

})();