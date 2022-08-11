import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const inputTimerId = document.querySelector(`#datetime-picker`);
const startBtn = document.querySelector(`[data-start]`);
const dataDays = document.querySelector(`[data-days]`);
const dataHours = document.querySelector(`[data-hours]`);
const dataMinutes = document.querySelector(`[data-minutes]`);
const dataSeconds = document.querySelector(`[data-seconds]`);

startBtn.disabled = true;
startBtn.addEventListener(`click`, onTimerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let timeDifferece = selectedDates[0].getTime() - new Date().getTime();
    if (timeDifferece > 0) {
      startBtn.disabled = false;
      Notiflix.Notify.success('Please press the Start button');


    } else {
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
};

let chooseDate = flatpickr(inputTimerId, options);

function pad(value) {
  return String(value).padStart(2, `0`);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function onTimerStart() {
  startBtn.disabled = true;

  let deltaTime = null;
  const intervalTimerId = setInterval(() => {
    deltaTime = chooseDate.selectedDates[0].getTime() - new Date().getTime();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    console.log(`${days} x ${hours}x ${minutes}x ${seconds}`);
    if (deltaTime <= 0) {
      clearInterval(intervalTimerId);
    } else {
      dataDays.innerHTML = days;
      dataHours.innerHTML = hours;
      dataMinutes.innerHTML = minutes;
      dataSeconds.innerHTML = seconds;
    }
  }, 1000);
}
