import Notiflix from 'notiflix';

const btnCreatePromises = document.querySelector('button[type="submit"]');
const amountEl = document.querySelector('input[name="amount"]');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function promiseCreator(event) {
  event.preventDefault();
  const delay = Number(delayEl.value);
  const stepDelay = Number(stepEl.value);
  const amount = Number(amountEl.value);
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + stepDelay * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

btnCreatePromises.addEventListener('click', promiseCreator);