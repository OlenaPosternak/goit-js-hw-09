import Notiflix from 'notiflix';

const form = document.querySelector(`form`);
const submitBtn = document.querySelector(`button`);
const formData = JSON.parse(localStorage.getItem(`form-info`)) || {};

form.addEventListener(`input`, onInputChange);
submitBtn.addEventListener(`submit`, createPromise);

function onInputChange(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(`form-info`, JSON.stringify(formData));
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  localStorage.removeItem(`form-info`);
}

let delayTime = Number(formData.delay);
for (let i = 1; i <= formData.amount; i++) {
  const promise = createPromise(i, delayTime);
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
    });

  delayTime += Number(formData.step);
}
