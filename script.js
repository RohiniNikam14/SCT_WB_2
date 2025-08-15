const playBtn = document.getElementsByClassName("play")[0];
const lapBtn = document.getElementsByClassName("lap")[0];
const resetBtn = document.getElementsByClassName("reset")[0];
const clearBtn = document.getElementsByClassName("lap-clear-btn")[0];
const second = document.getElementsByClassName("sec")[0];
const minute = document.getElementsByClassName("minute")[0];
const centiSecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isPlay = false;
let secCounter = 0;
let sec;
let min;
let centiCounter = 0;
let minCounter = 0;
let centiSec;
let isReset = false;
let lapItems = 0;

const toggleBtn = () => {
  lapBtn.classList.remove("hidden");
  resetBtn.classList.remove("hidden");
};


const play = () => {
  if (!isPlay && !isReset) {
    toggleBtn();
    playBtn.innerHTML = `Pause`;
    bg.classList.add("animation-bg");

     min = setInterval(() => {
      
      minute.innerText = `${++minCounter} : `;
    }, 60*1000);
    sec = setInterval(() => {
      if (secCounter === 60) {
        secCounter = 0;
      }
      second.innerText = `${++secCounter} : `;
    }, 1000);
    centiSec = setInterval(() => { 
      if (centiCounter === 100) {
        centiCounter = 0;
      }
      centiSecond.innerText = `${++centiCounter}`;
    }, 10);
    isPlay = true;
    isReset = true;
  } else {
    
    playBtn.innerHTML = `Play`;
    clearInterval(min);
    clearInterval(sec);
    clearInterval(centiSec);
    isPlay = false;
    isReset = false;
    bg.classList.remove("animation-bg");
  }
};

const reset = () => {
  isReset = true;

  play();
  lapBtn.classList.add("hidden");
  resetBtn.classList.add("hidden");
  second.innerHTML = '0 :';
  centiSecond.innerHTML = '0';
  minute.innerHTML = '0 :';
};

const lap = () =>{
  const li = document.createElement("li");
  const number = document.createElement("span");
  const timeStamp = document.createElement("span");

  li.setAttribute("class", "lap-items");
  number.setAttribute("class", "number");
  timeStamp.setAttribute("class", "time-stamp");

  number.innerText = `${++lapItems}.  `;
  timeStamp.innerHTML = `${minute.innerText} : ${second.innerText} : ${centiSecond.innerText}`;

  li.append(number , timeStamp);
  laps.append(li);
  
  clearBtn.classList.remove("hidden");
}

const clearAll = () =>{
  laps.innerHTML = '';
  laps.append(clearBtn);
  clearBtn.classList.add("hidden");
}
playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
clearBtn.addEventListener("click", clearAll);