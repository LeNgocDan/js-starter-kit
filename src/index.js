import './scss/index.scss';
import audio from './assets/music.mp3';
console.log('call index.js!');

var odometer = document.getElementsByClassName("odometer");

// const users = [{ id: '00001', name: "Le Ngoc Dan" }, { id: '12340', name: "Luong Van Dat" }];

const playBtn = document.getElementById('spin');
const audioEle = document.getElementById('audio');

const curtainAwardEle = document.getElementById('curtain-award');
curtainAwardEle.style = "display: none";


const isMultiScrolling = true;

let currentScrollingIndex = 0;

audioEle.src = audio;
playBtn.onclick = () => {
  playBtn.disabled = "disabled";
  audioEle.play();
  // const gifEle = document.getElementById('gif');
  if (!isMultiScrolling) {
    if (!odometer[currentScrollingIndex].classList.contains("scroll-done")) {
      scroll(odometer[currentScrollingIndex]);
    } else {
      currentScrollingIndex++;
      scroll(odometer[currentScrollingIndex]);
    }
  }
  else {
    for(var i = 0; i < odometer.length; i++) {
      odometer[i].innerHTML = 0;
      scroll(odometer[i]);
    }
  }
}

function scroll(odometerEle) {
  const od = new global.Odometer({
    el: odometerEle,
    value: 0,
    format: '',
    theme: 'digital'
  });
  od.update(getRandomNumber())

  setTimeout(() => {
    audioEle.pause();
    console.log(odometer.length);
    if (currentScrollingIndex + 2 > odometer.length) {
      playBtn.disabled = "disabled";
    } else {
      playBtn.disabled = "";
    }
    odometerEle.classList.add("scroll-done");
  }, 3000)
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

