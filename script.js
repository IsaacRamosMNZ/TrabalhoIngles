const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty-select');
const startScreen = document.getElementById('start-screen');
const quizBox = document.getElementById('quiz-box');
const questionEl = document.getElementById('question');
const optionBtns = document.querySelectorAll('.option-btn');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const result = document.getElementById('result');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let questions = [
  {
    question: "She ___ to school every day. (go)",
    options: ["go", "goes", "going"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "They ___ English very well. (speak)",
    options: ["speaks", "speak", "speaking"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "The UK capital is ___?",
    options: ["London", "Manchester", "Edinburgh"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "How often ___ he visit his grandparents?",
    options: ["do", "does", "did"],
    correct: 1,
    difficulty: "medium"
  },
  {
    question: "Which is NOT a British holiday?",
    options: ["Guy Fawkes Night", "Thanksgiving", "Boxing Day"],
    correct: 1,
    difficulty: "medium"
  },
  {
    question: "They ___ football on Sundays. (play)",
    options: ["plays", "play", "playing"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "Choose the correct: I ___ to work by bus.",
    options: ["go", "goes", "going"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "UK's national flower is ___?",
    options: ["Rose", "Daffodil", "Thistle"],
    correct: 0,
    difficulty: "medium"
  },
  {
    question: "He ___ his homework every evening. (do)",
    options: ["does", "do", "doing"],
    correct: 0,
    difficulty: "easy"
  },
  {
    question: "What's the UK currency?",
    options: ["Euro", "Pound", "Dollar"],
    correct: 1,
    difficulty: "easy"
  },
  {
    question: "They ___ in London last summer. (live)",
    options: ["lived", "live", "living"],
    correct: 0,
    difficulty: "hard"
  },
  {
    question: "Which city is famous for its university?",
    options: ["Oxford", "Birmingham", "Liverpool"],
    correct: 0,
    difficulty: "medium"
  }
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if(currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  const difficulty = difficultySelect.value;
  
  if(difficulty === 'random') {
    // Pega 10 perguntas aleatórias
    currentQuestions = shuffleArray(questions).slice(0, 10);
  } else {
    // Filtra pela dificuldade e pega até 10
    currentQuestions = questions.filter(q => q.difficulty === difficulty);
    if(currentQuestions.length > 10) {
      currentQuestions = shuffleArray(currentQuestions).slice(0, 10);
    }
  }
  
  startScreen.classList.add('hidden');
  quizBox.classList.remove('hidden');
  result.classList.add('hidden');
  
  showQuestion();
}

function showQuestion() {
  const question = currentQuestions[currentQuestionIndex];
  questionEl.textContent = `(${question.difficulty.toUpperCase()}) ${question.question}`;
  
  optionBtns.forEach((btn, index) => {
    btn.textContent = question.options[index];
    btn.disabled = false;
    btn.style.backgroundColor = '';
  });
  
  feedback.textContent = '';
  nextBtn.style.display = 'none';
}

function chooseOption(index) {
  const question = currentQuestions[currentQuestionIndex];
  
  if(index === question.correct) {
    score++;
    feedback.textContent = "Correct!";
    feedback.style.color = 'green';
    optionBtns[index].style.backgroundColor = '#a6f0a6';
  } else {
    feedback.textContent = `Wrong! The correct answer is "${question.options[question.correct]}".`;
    feedback.style.color = 'red';
    optionBtns[index].style.backgroundColor = '#f0a6a6';
    optionBtns[question.correct].style.backgroundColor = '#a6f0a6';
  }
  
  optionBtns.forEach(btn => btn.disabled = true);
  nextBtn.style.display = 'inline-block';
}

function showResult() {
  quizBox.classList.add('hidden');
  result.classList.remove('hidden');
  scoreEl.textContent = score;
}

function restartQuiz() {
  startScreen.classList.remove('hidden');
  quizBox.classList.add('hidden');
  result.classList.add('hidden');
}

// Utilitário para embaralhar array
function shuffleArray(array) {
  let arr = array.slice();
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
