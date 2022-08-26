const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const prgoressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0;
let availableQuestions = []

let questions =[
    {
        question: 'Which of these is a prime number?',
        choice1:'17',
        choice2:'27',
        choice3:'15',
        choice4:'81',
        answer: 1,
    },

    {
        question: 'Which of these is not a vowel?',
        choice1:'i',
        choice2:'o',
        choice3:'y',
        choice4:'a',
        answer: 3,
    },
    
    {
        question: 'Which of these is not a mammal?',
        choice1:'Bat',
        choice2:'Platypus',
        choice3:'Dolphin',
        choice4:'Ostrich',
        answer: 4,
    },
    
    {
        question: 'What is the chemical formula for water?',
        choice1:'H202',
        choice2:'CH4',
        choice3:'H20',
        choice4:'C02',
        answer: 3,
    },

    {
        question: 'What does the C in our ABC values stand for?',
        choice1:'Creative',
        choice2:'Collaborative',
        choice3:'Confident',
        choice4:'Consistent',
        answer: 2,
    },

        {
        question: 'Which of these is a prime number?',
        choice1:'17',
        choice2:'27',
        choice3:'15',
        choice4:'81',
        answer: 1,
    },

    {
        question: 'What are the last three letters of the alphabet?',
        choice1:'abc',
        choice2:'xyz',
        choice3:'hij',
        choice4:'lmn',
        answer: 2,
    },
    
    {
        question: 'Whats the name of a latin-based keyboard?',
        choice1:'PABLO',
        choice2:'JEANLUC',
        choice3:'STELLA',
        choice4:'QWERTY',
        answer: 4,
    },
    
    {
        question: 'What famous tech company did Bill Gates founded?',
        choice1:'Microsoft',
        choice2:'Apple',
        choice3:'Samsung',
        choice4:'Creative',
        answer: 1,
    },

    {
        question: 'What is Facebook parent company now?',
        choice1:'Meta',
        choice2:'Zuckerberg Corp.',
        choice3:'Marks-mania',
        choice4:'TikTok',
        answer: 1,
    },
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    // if available questions is equals to zero
    // or if the questions counter is more than the max questions
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        // keeps track of score
        return window.location.assign('/end.html')
    }

    // notes question x of max qn, and it increments by one each time
    questionCounter++
    prgoressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` 

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']
        console.log(selectedChoice.dataset['number'])

        let classToApply  = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        blackOut()

        selectedChoice.parentElement.classList.add(classToApply)


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

//Keyboard listeners
var choiceList = document.querySelector(".choice-list");

function setUpActions() {
	let btns = document.querySelectorAll("#vip");
	
	btns.forEach((btn, idx) => {
		btn.setAttribute("role", "button");
		btn.setAttribute("aria-pressed", "false");
		btn.setAttribute("tabindex", "0");
	});

	choiceList.addEventListener("keydown", e => {
        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
            toggleBtn(e.target);

            if(!acceptingAnswers) return

            acceptingAnswers = false
            const selectedChoice = e.target    

            const selectedAnswer = selectedChoice.dataset['number']

            let classToApply  = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

            if(classToApply === 'correct') {
                incrementScore(SCORE_POINTS)
            }

            selectedChoice.classList.add(classToApply)

            setTimeout(() => {
                selectedChoice.classList.remove(classToApply)

                getNewQuestion()
            
                // reset aria-pressed to false after next question loads.
                e.target.setAttribute("aria-pressed", e.target.getAttribute("aria-pressed") === "false")
            }, 1000)
        }
	});
}

function toggleBtn(ele) {
	ele.setAttribute(
		"aria-pressed",
		ele.getAttribute("aria-pressed") === "true" ? "false" : "true"
	);
}

function blackOut() {
    if (score > 300) {
        
        var noOfChoicBtns = document.querySelectorAll('.choice-container').length;

        for (i = 0; i < noOfChoicBtns; i++){
            document.querySelectorAll('.choice-container')[i].setAttribute("style", "pointer-events: none")
        }
    }
}

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()