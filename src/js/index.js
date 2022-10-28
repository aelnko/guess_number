const form = document.querySelector('form');
const input = document.querySelector('input');

let value = Math.floor(Math.random() * 100);

let i = 0;

const checkHandler = (value, answer, i) => {
  if (i === 9 && Number(answer) !== value) {
    i = 0;
    return 'Game over :( Try again?';
  }
  if (Number(answer) === value) {
    return 'Great! You are right!!!';
  }
  if (Number(answer) > value) {
    return 'Try lower...';
  }
  if (Number(answer) < value) {
    return 'Try higher...';
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(value);
  const messageText = document.querySelector('.main__message');
  const answer = input.value;
  messageText.innerHTML = checkHandler(value, answer, i);
  i += 1;
  e.target.reset();
};

form.addEventListener('submit', handleSubmit);

