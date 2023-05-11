const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const playerscore = document.querySelector('#playerscore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

var scoreInput = document.querySelector('input[id="playerscore"]');
scoreInput.value = finalScore.innerText;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
});

// set the target on the form to point to a hidden iframe
// some browsers need the target set via JavaScript, no idea why...
document.getElementById('quiz_score').target = 'my-response-iframe';
// detect when the iframe reloads
var iframe = document.getElementById('my-response-iframe');

if (iframe) {
  iframe.onload = function () {
    // now you can do stuff, such as displaying a message or redirecting to a new page.
    window.open('submitted.html', '_self');
  }
}
