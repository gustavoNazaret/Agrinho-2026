const questions = [
  {
    q: "O que é a prática de plantio direto e qual seu principal benefício ambiental?",
    options: [
      "Plantar sem arar o solo, reduzindo erosão e preservando a microbiota",
      "Plantar usando apenas irrigação artificial",
      "Eliminar o uso de sementes nativas",
      "Substituir culturas tradicionais por exóticas"
    ],
    answer: 0
  },
  {
    q: "Qual é o objetivo do Código Florestal Brasileiro em relação às propriedades rurais?",
    options: [
      "Proibir qualquer tipo de produção agrícola",
      "Exigir que toda a propriedade seja reflorestada",
      "Definir áreas de preservação permanente e reserva legal obrigatória",
      "Permitir o desmatamento irrestrito para produção"
    ],
    answer: 2
  },
  {
    q: "O que é agricultura de precisão?",
    options: [
      "Uso de tecnologia para aplicar insumos somente onde e na quantidade necessária",
      "Plantar em linhas perfeitamente retas",
      "Usar apenas ferramentas manuais no campo",
      "Medir a produção com balanças de alta precisão"
    ],
    answer: 0
  },
  {
    q: "Qual prática ajuda a reduzir o uso de água na agricultura e contribui para a sustentabilidade?",
    options: [
      "Irrigação por inundação em toda a lavoura",
      "Gotejamento e irrigação localizada",
      "Deixar de irrigar por completo",
      "Aumentar o número de canais de drenagem"
    ],
    answer: 1
  },
  {
    q: "O que é o Sistema de Integração Lavoura-Pecuária-Floresta (ILPF)?",
    options: [
      "Um sistema que separa completamente as atividades de lavoura e pecuária",
      "A substituição de florestas por pastagens",
      "Integração de cultivos, criação animal e árvores na mesma área para maior sustentabilidade",
      "Um programa de exportação de madeira nativa"
    ],
    answer: 2
  },
  {
    q: "Por que a manutenção de matas ciliares é importante para a produção agrícola?",
    options: [
      "Elas aumentam a área disponível para plantio",
      "Protegem rios e nascentes, garantindo água para irrigação e biodiversidade",
      "Servem apenas como barreira contra ventos",
      "Reduzem a fertilidade do solo ao redor"
    ],
    answer: 1
  },
  {
    q: "O que é o Manejo Integrado de Pragas (MIP)?",
    options: [
      "Uso exclusivo de agrotóxicos para eliminar pragas",
      "Eliminar toda fauna do campo para proteger a lavoura",
      "Combinação de métodos biológicos, culturais e químicos para controlar pragas com menor impacto ambiental",
      "Importar insetos estrangeiros para combater pragas nativas"
    ],
    answer: 2
  },
  {
    q: "Como o Brasil pode ser considerado referência em agro sustentável no mundo?",
    options: [
      "Por ter o maior rebanho bovino alimentado 100% com ração artificial",
      "Por produzir alimentos em larga escala com crescente uso de tecnologias que reduzem desmatamento e emissões",
      "Por não possuir nenhuma legislação ambiental",
      "Por substituir totalmente a mão de obra humana por robôs"
    ],
    answer: 1
  }
];

let current = 0, score = 0, answered = false;

const questionText = document.getElementById('question-text');
const optionsDiv = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const questionCount = document.getElementById('question-count');
const progressFill = document.getElementById('progress-fill');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');

function loadQuestion() {
  answered = false;
  nextBtn.disabled = true;
  const q = questions[current];
  questionText.textContent = q.q;
  questionCount.textContent = `Pergunta ${current + 1} de ${questions.length}`;
  progressFill.style.width = `${(current / questions.length) * 100}%`;

  optionsDiv.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const buttons = optionsDiv.querySelectorAll('.option');
  buttons.forEach(b => b.disabled = true);
  buttons[questions[current].answer].classList.add('correct');
  if (index !== questions[current].answer) {
    buttons[index].classList.add('wrong');
  } else {
    score++;
  }

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizBox.classList.add('hidden');
  resultBox.classList.remove('hidden');

  const pct = score / questions.length;
  let icon, title, msg;

  if (pct === 1) {
    icon = '🏆'; title = 'Parabéns, especialista!';
    msg = 'Você acertou tudo! Seu conhecimento sobre agro sustentável é exemplar.';
  } else if (pct >= 0.6) {
    icon = '🌿'; title = 'Muito bem!';
    msg = 'Você tem bom domínio do tema. Continue aprendendo sobre produção sustentável!';
  } else {
    icon = '🌱'; title = 'Continue aprendendo!';
    msg = 'O equilíbrio entre produção e meio ambiente é um tema essencial. Vale aprofundar os estudos!';
  }

  document.getElementById('result-icon').textContent = icon;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-score').textContent = `${score} / ${questions.length}`;
  document.getElementById('result-msg').textContent = msg;
}

document.getElementById('restart-btn').onclick = () => {
  current = 0; score = 0;
  resultBox.classList.add('hidden');
  quizBox.classList.remove('hidden');
  loadQuestion();
};

loadQuestion();
