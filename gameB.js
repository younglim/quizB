const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-container'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let availableQuestions = [];

// List of questions
let questions = [
  {
    question: 'Sample question, answer is choice 1',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    answer: 1,
  },

  {
    question: 'Sample question, answer is choice 3',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    answer: 3,
  },

  {
    question: 'Sample question, answer is choice 4',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    answer: 4,
  },

  {
    question: 'Sample question, answer is choice 3',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    answer: 3,
  },

  {
    question: 'Sample question, answer is choice 2',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    answer: 2,
  },

  {
    question: 'Sample question, answer is choice 1',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    answer: 1,
  },

  {
    question: 'Sample question, answer is choice 2',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    answer: 2,
  },

  {
    question: 'Sample question, answer is choice 4',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    answer: 4,
  },

  {
    question: 'Sample question, answer is choice 1',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    answer: 1,
  },

  {
    question: 'Sample question, answer is choice 1',
    choice1: 'Choice 1',
    choice2: 'Choice 2',
    choice3: 'Choice 3',
    choice4: 'Choice 4',
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  // if available questions is equals to zero
  // or if the questions counter is more than the max questions
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);

    // keeps track of score
    return window.location.assign('end.html');
  }

  // notes question x of max qn, and it increments by one each time
  questionCounter++;
  progressText.innerText = `${questionCounter} of ${MAX_QUESTIONS}`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
      document.getElementById('question').focus();
    }, 1000);
  });
});

//Keyboard listeners
var choiceList = document.querySelector('.choice-list');

choiceList.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;

    const selectedAnswer = selectedChoice.dataset['number'];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
      selectedChoice.classList.add(classToApply);

      // @Royce, this is where screen reader reads out correct or wrong depending on the selected answer
      srSpeak('correct answer', 'assertive');
    } else {
      selectedChoice.classList.add(classToApply);
      srSpeak('wrong answer', 'assertive');
    }

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();

      //@Royce, this is where focus is reset to readScore id so that score is read when a new question is called
      document.getElementById('readScore').focus();
    }, 1000);
  }
});

// @Royce, this is the code that creates a new div to hold the sentence for the screen reader to read
function srSpeak(text, priority) {
  var el = document.createElement('div');
  var id = 'speak-' + Date.now();
  el.setAttribute('id', id);
  el.setAttribute('aria-live', priority || 'polite');
  el.classList.add('visually-hidden');
  document.body.appendChild(el);

  window.setTimeout(function () {
    document.getElementById(id).innerHTML = text;
    console.log(text);
  }, 100);

  window.setTimeout(function () {
    document.body.removeChild(document.getElementById(id));
  }, 1000);
}

// countdown

var counter = 60;

setInterval(function () {
  counter--;

  if (counter >= 0) {
    id = document.getElementById('timer');
    id.innerHTML = `00:${counter}`;
  }

  if (counter === 0) {
    id.innerHTML = 'TIMEOUT!';
    localStorage.setItem('mostRecentScore', score);
    window.location.href = 'end.html';
  }
}, 1000);

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
