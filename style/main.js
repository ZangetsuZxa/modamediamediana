const atividadeSelect = document.getElementById('atividadeSelect');
const carregarBtn    = document.getElementById('carregarBtn');
const numbersArea    = document.getElementById('numbersArea');
const resolverBtn    = document.getElementById('resolverBtn');
const resultado      = document.getElementById('resultado');

let atividadeAtual = null;

/* Registro de tentativas */
const tentativas = {
  moda: [],
  media: [],
  mediana: []
};

/* ===========================
   CARREGAMENTO DE ATIVIDADES
   =========================== */

carregarBtn.addEventListener('click', () => {
  const valor = atividadeSelect.value;

  numbersArea.innerHTML = '';
  resultado.innerHTML = '';
  resolverBtn.onclick = null;

  if (!valor) {
    alert('Selecione uma atividade primeiro.');
    return;
  }

  if (valor === 'atividade1') {
    carregarAtividade('style/atividades/moda-basica.js');
    return;
  }
  if (valor === 'atividade2') {
    carregarAtividade('style/atividades/media-basica.js');
    return;
  }
  if (valor === 'atividade3') {
  carregarAtividade('style/atividades/mediana-basica.js');
    return;
  }
  if (valor === 'atividade4') {
  carregarAtividade('style/atividades/moda-avancada.js');
    return;
  }
  if (valor === 'atividade5') {
  carregarAtividade('style/atividades/media-avancada.js');
    return;
  }
  if (valor === 'atividade6') {
  carregarAtividade('style/atividades/mediana-avancada.js');
  return;
  }

  if (valor === 'criar') {
    const confirmar = confirm(
      'Você deseja criar e responder sua própria pergunta?'
    );

    if (!confirmar) return;

    iniciarCriacaoDeQuestao();
    return;
  }

  alert('Atividade ainda não implementada.');
});

/* ===========================
   FUNÇÃO PARA CARREGAR JS
   =========================== */

function carregarAtividade(src) {
  if (atividadeAtual) {
    atividadeAtual.remove();
    atividadeAtual = null;
  }

  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  document.body.appendChild(script);

  atividadeAtual = script;
}

/* ===========================
   FUNÇÕES AUXILIARES
   =========================== */

function criarNumero(valor) {
  const el = document.createElement('div');
  el.className = 'numero';
  el.textContent = valor;
  numbersArea.appendChild(el);
}

function obterValores() {
  return [...numbersArea.children].map(el =>
    Number(el.textContent)
  );
}

/* ===========================
   CRIAÇÃO DE QUESTÃO PELO ALUNO
   (base – será expandido depois)
   =========================== */

function iniciarCriacaoDeQuestao() {
  numbersArea.innerHTML = '';
  resultado.innerHTML = '';

  const tipo = prompt(
    'Qual tipo de questão?\nDigite: moda, media ou mediana'
  );
  if (!tipo || !['moda', 'media', 'mediana'].includes(tipo)) {
    alert('Tipo inválido.');
    return;
  }

  const qtd = Number(
    prompt('Quantos números a questão terá?')
  );
  if (!qtd || qtd < 2) {
    alert('Quantidade inválida.');
    return;
  }

  const valores = [];

  for (let i = 0; i < qtd; i++) {
    const v = Number(
      prompt(`Digite o ${i + 1}º número:`)
    );
    if (isNaN(v)) {
      alert('Valor inválido.');
      return;
    }
    valores.push(v);
  }

  valores.sort((a, b) => a - b);
  valores.forEach(v => criarNumero(v));

  resolverBtn.onclick = () => {
    if (tipo === 'moda') calcularModaCriada(valores);
    if (tipo === 'media') calcularMediaCriada(valores);
    if (tipo === 'mediana') calcularMedianaCriada(valores);
  };
}

/* ===========================
   CÁLCULOS (modo criado)
   =========================== */

function calcularMediaCriada(valores) {
  const respostaAluno = prompt(
    'Qual é o valor da média?'
  );
  if (respostaAluno === null) return;

  const correta =
    valores.reduce((a, b) => a + b, 0) / valores.length;

  const acertou = Number(respostaAluno) === correta;

  tentativas.media.push({
    valores: [...valores],
    respostaAluno,
    correta,
    acertou
  });

  mostrarResultado('média', respostaAluno, correta, acertou);
}

function calcularMedianaCriada(valores) {
  const n = valores.length;
  const correta =
    n % 2 === 1
      ? valores[Math.floor(n / 2)]
      : (valores[n / 2 - 1] + valores[n / 2]) / 2;

  const respostaAluno = prompt(
    'Qual é o valor da mediana?'
  );
  if (respostaAluno === null) return;

  const acertou = Number(respostaAluno) === correta;

  tentativas.mediana.push({
    valores: [...valores],
    respostaAluno,
    correta,
    acertou
  });

  mostrarResultado('mediana', respostaAluno, correta, acertou);
}

function calcularModaCriada(valores) {
  const respostaAluno = prompt(
    'Qual é a moda? (separe por vírgula se houver mais de uma)'
  );
  if (respostaAluno === null) return;

  const contagem = {};
  valores.forEach(v => contagem[v] = (contagem[v] || 0) + 1);

  const max = Math.max(...Object.values(contagem));
  const correta = Object.keys(contagem)
    .filter(v => contagem[v] === max)
    .map(Number);

  const respostaTratada = respostaAluno
    .split(',')
    .map(v => Number(v.trim()))
    .sort();

  const acertou =
    JSON.stringify(respostaTratada) ===
    JSON.stringify(correta.sort());

  tentativas.moda.push({
    valores: [...valores],
    respostaAluno,
    correta,
    acertou
  });

  mostrarResultado('moda', respostaAluno, correta, acertou);
}

/* ===========================
   FEEDBACK AO ALUNO
   =========================== */

function mostrarResultado(tipo, respostaAluno, correta, acertou) {
  if (acertou) {
    resultado.innerHTML = `
      ✅ <strong>Resposta correta!</strong><br>
      Você acertou a ${tipo}.
    `;
  } else {
    resultado.innerHTML = `
      ❌ <strong>Resposta incorreta.</strong><br>
      Sua resposta: ${respostaAluno}<br>
      Resposta correta: <strong>${correta}</strong>
    `;
  }
}
