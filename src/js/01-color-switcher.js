function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const bodyEl = document.body;
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let colorSwitcherTimerId = null;

const onColorSwitcher = () => {
  if (onColorSwitcher) {
    btnStart.disabled = true;
    btnStart.style.color = '#2c8f69';
    btnStop.disabled = false;
    btnStop.style.color = '#fff';
  }
  colorSwitcherTimerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const offColorSwitcher = () => {
  clearInterval(colorSwitcherTimerId);
  btnStart.disabled = false;
  btnStart.style.color = '#fff';
  btnStop.disabled = true;
  btnStop.style.color = '#ba80a7';
};

btnStart.addEventListener('click', onColorSwitcher);
btnStop.addEventListener('click', offColorSwitcher);
