import './scss/index.scss';
import audio from './assets/music.mp3';
console.log('call index.js!');

var odometer = document.getElementsByClassName("odometer");

// const users = [{ id: '00001', name: "Le Ngoc Dan" }, { id: '12340', name: "Luong Van Dat" }];

const playBtn = document.getElementById('spin');
const audioEle = document.getElementById('audio');

const curtainAwardEle = document.getElementById('curtain-award');
curtainAwardEle.style = "display: block";


const isMultiScrolling = true;

let currentScrollingIndex = 0;
const gifEle = document.getElementById('gif');

audioEle.src = audio;
playBtn.onclick = () => {
  playBtn.disabled = "disabled";
  audioEle.play();
  if (!isMultiScrolling) {
    if (!odometer[currentScrollingIndex].classList.contains("scroll-done")) {
      scroll(odometer[currentScrollingIndex]);
    } else {
      currentScrollingIndex++;
      scroll(odometer[currentScrollingIndex]);
    }
  }
  else {
    for (var i = 0; i < odometer.length; i++) {
      odometer[i].innerHTML = 0;
      scroll(odometer[i]);
    }
  }
}

function scroll(odometerEle) {
  const od = new global.Odometer({
    el: odometerEle,
    format: 'd',
    theme: 'default'
  });
  od.update(getRandomNumber())
  curtainAwardEle.style = "display: none";
  gifEle.style = "display: flex";
  setTimeout(() => {
    audioEle.pause();
    if (currentScrollingIndex + 2 > odometer.length) {
      playBtn.disabled = "disabled";
    } else {
      playBtn.disabled = "";
    }
    odometerEle.classList.add("scroll-done");
    gifEle.style = "display: none";
    curtainAwardEle.style = "display: block";
  }, 3000)
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

// fake call api for testing
