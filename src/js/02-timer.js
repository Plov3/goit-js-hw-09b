import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
let selectDate = 0;
const secondsEl = document.querySelector('span[data-seconds]');
const minutesEl = document.querySelector('span[data-minutes]');
const hoursEl = document.querySelector('span[data-hours]');
const daysEl = document.querySelector('span[data-days]');
const numbers = document.querySelectorAll('.value');
const labels = document.querySelectorAll('.label');

btnStart.disabled = true;
btnStart.style.color = '#212121';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      btnStart.style.color = '#fff';
      selectDate = selectedDates[0];
    }
  },
};

flatpickr(input, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function countDownTimer() {
  let timer = setInterval(() => {
    btnStart.disabled = true;
    let delta = selectDate - new Date();
    if (delta >= 0) {
      numbers.forEach(number => {
        number.style.color = '#234743';
      });

      let time = convertMs(delta);
      secondsEl.textContent = addLeadingZero(time.seconds);
      minutesEl.textContent = addLeadingZero(time.minutes);
      hoursEl.textContent = addLeadingZero(time.hours);
      daysEl.textContent = addLeadingZero(time.days);
      if (delta <= 16000) {
        numbers.forEach(number => {
          number.style.color = '#cc003d';
        });
        labels.forEach(label => {
          label.style.color = '#cc003d';
        });
      }
    } else {
      Notiflix.Notify.success('Finish!');
      clearInterval(timer);
      btnStart.style.color = '#212121';
      numbers.forEach(number => {
        number.style.color = '#fff';
      });
      labels.forEach(label => {
        label.style.color = '#212121';
      });
    }
  }, 1000);
}
btnStart.addEventListener('click', countDownTimer);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}