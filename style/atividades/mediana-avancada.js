(function(){

numbersArea.innerHTML = '';
resultado.innerHTML = '';

/* mais números */
const quantidade = Math.floor(Math.random() * 7) + 9; // 9 a 15

let valores = [];

/* números maiores */
for (let i = 0; i < quantidade; i++) {
  const n = Math.floor(Math.random() * 50) + 1;
  valores.push(n);
}

/* ordenar */
valores.sort((a,b)=>a-b);

/* mostrar */
valores.forEach(v => criarNumero(v));

let medianaCorreta;

if (valores.length % 2 === 1) {
  medianaCorreta = valores[Math.floor(valores.length/2)];
} else {
  const meio1 = valores[valores.length/2 - 1];
  const meio2 = valores[valores.length/2];
  medianaCorreta = (meio1 + meio2) / 2;
}

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