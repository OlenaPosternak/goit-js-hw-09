function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let changeColorId=null;

const bodyEl = document.querySelector(`body`);
const startBtn = document.querySelector(`[data-start]`);
const stopBtn = document.querySelector(`[data-stop]`);

startBtn.addEventListener(`click`, onStartBtnClick);
stopBtn.addEventListener(`click`, onStopBtnClick);

stopBtn.disabled = true;

function onStartBtnClick() {
    changeColorId = setInterval(() => {
    bodyEl.style.setProperty(`background-color`, getRandomHexColor());
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  

}

function onStopBtnClick() {
    clearInterval(changeColorId);
    console.log(`-`);
    startBtn.disabled=false;
    stopBtn.disabled= true;
}
