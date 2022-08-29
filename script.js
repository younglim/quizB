function websiteVisits(response) {
  document.querySelector('#visitNo').textContent = response.value;

  response.value % 2 == 0
    ? (document.getElementById('play').href = 'game.html')
    : (document.getElementById('play').href = 'gameB.html');
}
