// Assigns visitors to gameA(with disable clicks) or gameB based on whether they're even or odd
function nextPage() {
  const randomNumber = Math.random();

  if (randomNumber < 0.8) {
    window.location.replace("gameA.html");
  } else {
    window.location.replace("gameB.html");
  }
}
