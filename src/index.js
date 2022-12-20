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

  // var audio = new Audio('https://youtu.be/zAoroV6Dgdc');
  // audio.play();

  setTimeout(function () {
    imgAwardEle.style = "";
    gifEle.style = "display: none";
    const textNumbers = document.getElementsByClassName('card-text');
    for (let i = 0; i < textNumbers.length; i++) {
      const number = Math.floor(Math.random() * 10);
      textNumbers[i].innerHTML = number;
    }
  }, 5000);
}

