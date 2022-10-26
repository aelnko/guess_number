const form = document.querySelector('form');
const messageText = document.querySelector('.main__message');

const value = Math.floor(Math.random * 100);

const messages = {
  win: 'You got it! Great!',
  tooLow: 'Try high.',
  tooHigh: 'Try low.',
  lose: 'Sorry. You lose the game :('
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const answer = Number(e.target.value);
  let i = 0;
  while (i <= 10) {
    if (answer === value) {
      messageText.textContent = messages[win];
    } else if (answer < value) {
      messageText.textContent = messages[tooLow]
    } else if (answer > value) {
      messageText.textContent = messages[tooHigh];
    }
  }
  messageText.textContent = messages[lose];
})