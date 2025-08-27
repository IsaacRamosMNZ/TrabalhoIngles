// ==================== ELEMENTOS DO DOM ====================
const startScreen = document.getElementById('start-screen');
const quizBox = document.getElementById('quiz-box');
const result = document.getElementById('result');

const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty-select');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionEl = document.getElementById('question');
const optionBtns = document.querySelectorAll('.option-btn');
const feedback = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const totalQuestionsEl = document.getElementById('total-questions'); // Para mostrar "de 10"

// ==================== BANCO DE PERGUNTAS ====================
// Agora com 10 perguntas para cada dificuldade
const questions = [
  // --- FÁCIL (EASY) ---
  {
    question: "She ___ to school every day.",
    options: ["go", "goes", "is going"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "They ___ English very well.",
    options: ["speaks", "speak", "speaking"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "The capital of the UK is ___.",
    options: ["London", "Manchester", "Edinburgh"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "I ___ a student of English.",
    options: ["is", "are", "am"],
    correct: 2,
    difficulty: "easy"
  },
  {
    question: "What is the currency of the UK?",
    options: ["Euro", "Pound Sterling", "Dollar"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "He ___ his homework every evening.",
    options: ["does", "do", "doing"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "There ___ seven days in a week.",
    options: ["is", "are", "be"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "The opposite of 'hot' is ___.",
    options: ["cold", "warm", "cool"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "We ___ in a small house.",
    options: ["lives", "live", "living"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "A cat says ___.",
    options: ["woof", "quack", "meow"],
    correct: 2,
    difficulty: "easy"
  },
  // --- MÉDIO (MEDIUM) ---
  {
    question: "They ___ to the cinema yesterday.",
    options: ["go", "have gone", "went"],
    correct: 2,
    difficulty: "medium"
  },
  {
    question: "What are you ___ right now?",
    options: ["do", "doing", "does"],
    correct: 1,
    difficulty: "medium"
  },
  {
    question: "Which of these is NOT a British holiday?",
    options: ["Guy Fawkes Night", "Thanksgiving", "Boxing Day"],
    correct: 1,
    difficulty: "medium"
  },
  {
    question: "The famous clock in London is called ___.",
    options: ["The London Eye", "Big Ben", "Tower Bridge"],
    correct: 1,
    difficulty: "medium"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "J.K. Rowling", "William Shakespeare"],
    correct: 2,
    difficulty: "medium"
  },
  {
    question: "If it rains tomorrow, I ___ an umbrella.",
    options: ["will take", "took", "take"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "The Beatles were from which UK city?",
    options: ["London", "Liverpool", "Manchester"],
    correct: 1,
    difficulty: "medium"
  },
  {
    question: "She is ___ than her sister.",
    options: ["tall", "taller", "the tallest"],
    correct: 1,
    difficulty: "medium"
  },
  {
    question: "He ___ (not visit) his grandparents last week.",
    options: ["not visited", "didn't visit", "doesn't visit"],
    correct: 1,
    difficulty: "medium"
  },
  {
    question: "What is the national flower of England?",
    options: ["Rose", "Daffodil", "Thistle"],
    correct: 0,
    difficulty: "medium"
  },
  // --- DIFÍCIL (HARD) ---
  {
    question: "She has ___ in London since 2010.",
    options: ["live", "living", "lived"],
    correct: 2,
    difficulty: "hard"
  },
  {
    question: "By the time I arrived, the train ___.",
    options: ["already left", "had already left", "was leaving"],
    correct: 1,
    difficulty: "hard"
  },
  {
    question: "If I ___ studied harder, I would have passed.",
    options: ["have", "had", "would have"],
    correct: 1,
    difficulty: "hard"
  },
  {
    question: "Which UK country's patron saint is St. Andrew?",
    options: ["Wales", "Northern Ireland", "Scotland"],
    correct: 2,
    difficulty: "hard"
  },
  {
    question: "The project must be finished ___ Friday at the latest.",
    options: ["in", "on", "by"],
    correct: 2,
    difficulty: "hard"
  },
  {
    question: "Despite ___ tired, he completed the marathon.",
    options: ["of being", "being", "he was"],
    correct: 1,
    difficulty: "hard"
  },
  {
    question: "Stonehenge is located in which English county?",
    options: ["Cornwall", "Kent", "Wiltshire"],
    correct: 2,
    difficulty: "hard"
  },
  {
    question: "What does the idiom 'to be on cloud nine' mean?",
    options: ["To be very happy", "To be confused", "To be in trouble"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "The report ___ by the manager tomorrow morning.",
    options: ["will review", "is reviewing", "will be reviewed"],
    correct: 2,
    difficulty: "hard"
  },
  {
    question: "Who was the reigning monarch during the Victorian Era?",
    options: ["Queen Elizabeth I", "Queen Victoria", "King George III"],
    correct: 1,
    difficulty: "hard"
  },
];

// ==================== VARIÁVEIS DE ESTADO DO QUIZ ====================
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// ==================== FUNÇÕES DO QUIZ ====================

// Função para embaralhar um array (algoritmo Fisher-Yates)
function shuffleArray(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Inicia o quiz
function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  const difficulty = difficultySelect.value;
  const questionsPerQuiz = 10;

  let filteredQuestions;

  if (difficulty === 'random') {
    // Se for aleatório, embaralha todas as 30 e pega 10
    filteredQuestions = shuffleArray(questions);
  } else {
    // Se for uma dificuldade específica, filtra APENAS por ela
    filteredQuestions = questions.filter(q => q.difficulty === difficulty);
    // Embaralha as perguntas daquela dificuldade
    filteredQuestions = shuffleArray(filteredQuestions);
  }

  // Pega as 10 primeiras perguntas da lista filtrada e embaralhada
  currentQuestions = filteredQuestions.slice(0, questionsPerQuiz);
  
  // Esconde a tela inicial e mostra o quiz
  startScreen.classList.add('hidden');
  result.classList.add('hidden');
  quizBox.classList.remove('hidden');

  showQuestion();
}

// Mostra a pergunta atual na tela
function showQuestion() {
  // Reseta o estado dos botões e feedback
  resetState();

  const question = currentQuestions[currentQuestionIndex];
  questionEl.textContent = `(${currentQuestionIndex + 1}/${currentQuestions.length}) ${question.question}`;

  optionBtns.forEach((btn, index) => {
    btn.textContent = question.options[index];
    // Adiciona um listener de clique para cada botão de opção
    btn.addEventListener('click', chooseOption);
  });
}

// Limpa o estado da pergunta anterior
function resetState() {
  feedback.textContent = '';
  nextBtn.style.display = 'none';

  optionBtns.forEach(btn => {
    btn.disabled = false;
    btn.style.backgroundColor = '';
    btn.removeEventListener('click', chooseOption); // Remove listener antigo para evitar duplicatas
  });
}

// Executa quando o usuário escolhe uma opção
function chooseOption(event) {
  const selectedBtn = event.target;
  const selectedIndex = Array.from(optionBtns).indexOf(selectedBtn);
  const question = currentQuestions[currentQuestionIndex];

  if (selectedIndex === question.correct) {
    score++;
    feedback.textContent = "Correct!";
    feedback.style.color = 'green';
    selectedBtn.style.backgroundColor = '#a6f0a6';
  } else {
    feedback.textContent = `Wrong! The correct answer is "${question.options[question.correct]}".`;
    feedback.style.color = 'red';
    selectedBtn.style.backgroundColor = '#f0a6a6';
    optionBtns[question.correct].style.backgroundColor = '#a6f0a6'; // Mostra a correta
  }

  // Desabilita todos os botões e mostra o botão "Next"
  optionBtns.forEach(btn => btn.disabled = true);
  nextBtn.style.display = 'inline-block';
}

// Mostra a tela de resultado final
function showResult() {
  quizBox.classList.add('hidden');
  result.classList.remove('hidden');
  scoreEl.textContent = score;
  totalQuestionsEl.textContent = currentQuestions.length;
}

// Reinicia o quiz, voltando para a tela inicial
function restartQuiz() {
  result.classList.add('hidden');
  startScreen.classList.remove('hidden');
}

// Navega para a próxima pergunta ou finaliza o quiz
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ==================== EVENT LISTENERS ====================
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNextButton);
restartBtn.addEventListener('click', restartQuiz);
