const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-container'));
const progressText = document.getElementsByClassName('progress');
const scoreText = document.getElementsByClassName('scoretext');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let availableQuestions = [];

// List of questions
let questions = [
  {
    question: 'Which of these is not a prime number?',
    choice1: '81',
    choice2: '17',
    choice3: '11',
    choice4: '23',
    answer: 1,
  },

  {
    question: 'Which of these is not a vowel',
    choice1: 'i',
    choice2: 'u',
    choice3: 'y',
    choice4: 'a',
    answer: 3,
  },

  {
    question: 'What is Facebook parent company now?',
    choice1: 'Bytedance',
    choice2: 'Instagram',
    choice3: 'Marksmania',
    choice4: 'Meta',
    answer: 4,
  },

  {
    question: 'Which company did Bill Gates founded?',
    choice1: 'Apple',
    choice2: 'TikTok',
    choice3: 'Microsoft',
    choice4: 'Samsung',
    answer: 3,
  },

  {
    question: 'What does the C in our ABC values stand for?',
    choice1: 'Creative',
    choice2: 'Collaborative',
    choice3: 'Committed',
    choice4: 'Courageous',
    answer: 2,
  },

  {
    question: 'What is Star Wars famous phrase?',
    choice1: 'May the force be with you.',
    choice2: 'Live long and prosper.',
    choice3: 'To infinity and beyond.',
    choice4: 'Wakanda forever.',
    answer: 1,
  },

  {
    question: 'Which country has a cedar tree in its flag?',
    choice1: 'Swaziland',
    choice2: 'Lebanon',
    choice3: 'Cyprus',
    choice4: 'Estonia',
    answer: 2,
  },

  {
    question: 'In LOTR, who accompanied Frodo till the end?',
    choice1: 'Lady Galadriel',
    choice2: 'Gandalf',
    choice3: 'Samdol Chendol',
    choice4: 'Samwise Gamgee',
    answer: 4,
  },

  {
    question: 'Which of these is not a country?',
    choice1: 'Africa',
    choice2: 'Vatican City',
    choice3: 'Cyprus',
    choice4: 'Monaco',
    answer: 1,
  },

  {
    question: 'Which of these is not a cat breed?',
    choice1: 'Shorty Meow',
    choice2: 'Maine Coon',
    choice3: 'Ragdoll',
    choice4: 'Peterbald',
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

  for (var i = 0; i < progressText.length; i++) {
    progressText[i].innerText = `${questionCounter} of ${MAX_QUESTIONS}`;
  }

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
      selectedChoice.innerText = 'CORRECT!';
    } else {
      selectedChoice.innerText = 'INCORRECT!';
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
      selectedChoice.innerText = 'CORRECT!';
    } else {
      selectedChoice.classList.add(classToApply);
      srSpeak('wrong answer', 'assertive');
      selectedChoice.innerText = 'INCORRECT!';
    }

    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();

      //@Royce, this is where focus is reset to readScore id so that score is read when a new question is called
      document.getElementById('question').focus();
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

  const timer = document.getElementsByClassName('timer');

  if (counter >= 10) {
    for (var i = 0; i < timer.length; i++) {
      timer[i].innerHTML = `00:${counter}`;
    }
  }

  if (counter < 10) {
    for (var i = 0; i < timer.length; i++) {
      timer[i].innerHTML = `00:0${counter}`;
    }
  }

  if (counter === 0) {
    for (var i = 0; i < timer.length; i++) {
      timer[i].innerHTML = 'TIMEOUT';
      localStorage.setItem('mostRecentScore', score);
      window.open('end.html', '_self');
    }
  }
}, 1000);

incrementScore = (num) => {
  score += num;

  for (var i = 0; i < scoreText.length; i++) {
    scoreText[i].innerText = score;
  }
};

startGame();
