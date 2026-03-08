// ===========================
// ATIVIDADE 1 — MODA BÁSICA
// (números aleatórios)
// ===========================

(function () {

  numbersArea.innerHTML = '';
  resultado.innerHTML = '';

  const quantidade = 6; // quantidade de números da questão
  const valores = [];

  // gera números aleatórios de 1 a 10
  for (let i = 0; i < quantidade; i++) {
    const n = Math.floor(Math.random() * 10) + 1;
    valores.push(n);
  }

  // exibe os números
  valores.forEach(v => criarNumero(v));

  resolverBtn.onclick = () => {
    const respostaAluno = prompt(
      'Qual é a moda? (separe por vírgula se houver mais de uma)'
    );

    if (respostaAluno === null) return;

    // contagem das ocorrências
    const contagem = {};
    valores.forEach(v => contagem[v] = (contagem[v] || 0) + 1);

    const frequencias = Object.values(contagem);
    const max = Math.max(...frequencias);

    const modas = Object.keys(contagem)
      .filter(v => contagem[v] === max)
      .map(Number)
      .sort((a, b) => a - b);

    // verifica se todos aparecem igualmente
    const todosIguais =
      frequencias.every(f => f === frequencias[0]);

    let corretaTexto = '';
    let acertou = false;

    if (todosIguais) {
      corretaTexto = 'Todos os números aparecem igualmente';
      acertou =
        respostaAluno.toLowerCase().includes('todos');
    } else {
      corretaTexto =
        modas.length === 1
          ? `A moda é ${modas[0]}`
          : `Os números ${modas.join(', ')} aparecem ${max} vezes`;

      const respostaTratada = respostaAluno
        .split(',')
        .map(v => Number(v.trim()))
        .filter(v => !isNaN(v))
        .sort((a, b) => a - b);

      acertou =
        JSON.stringify(respostaTratada) ===
        JSON.stringify(modas);
    }

    tentativas.moda.push({
      valores: [...valores],
      respostaAluno,
      correta: corretaTexto,
      acertou
    });

    if (acertou) {
      resultado.innerHTML = `
        ✅ <strong>Resposta correta!</strong><br>
        Você identificou corretamente a moda.
      `;
    } else {
      resultado.innerHTML = `
        ❌ <strong>Resposta incorreta.</strong><br>
        Sua resposta: ${respostaAluno}<br>
        Resposta correta: <strong>${corretaTexto}</strong>
      `;
    }
  };

})();
