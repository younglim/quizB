const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const playerscore = document.querySelector('#playerscore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

var scoreInput = document.querySelector('input[name="data[score]"]');
scoreInput.value = finalScore.innerText;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
});

function submitScore() {
  var form = document.getElementById('quiz_score');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(form.action, {
      method: 'POST',
      body: new FormData(document.getElementById('quiz_score')),
    })
      .then((response) => response.json())
      .then((html) => {
        window.open('submitted.html', '_self');
      });
  });
}
