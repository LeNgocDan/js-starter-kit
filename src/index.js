import './scss/index.scss';
console.log('call index.js!');

function play() {
  console.log('call here');
}

const playBtn = document.getElementById('spin');
playBtn.onclick = function () {
  const imgAwardEle = document.getElementById('img-award');
  imgAwardEle.style = "display: none";
  const gifEle = document.getElementById('gif');
  gifEle.style = "display: flex";
  var audio = new Audio('./assets/music.mp3');
  audio.play();
}

