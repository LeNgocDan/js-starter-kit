import './scss/index.scss';
import audio from './assets/music.mp3';
console.log('call index.js!');

console.log(audio);

const users = [{ id: '00001', name: "Le Ngoc Dan" }, { id: '12340', name: "Luong Van Dat" }];

const playBtn = document.getElementById('spin');
const audioEle = document.getElementById('audio');

playBtn.onclick = function () {
  playBtn.disabled = "disabled";
  audioEle.src = audio;
  //var audio = new Audio(audio);
  audioEle.play();

  const imgAwardEle = document.getElementById('img-award');
  imgAwardEle.style = "display: none";
  const gifEle = document.getElementById('gif');
  gifEle.style = "display: flex";
  const textNumbers = document.getElementsByClassName('card-text')

  setTimeout(function () {
    let result = "";
    imgAwardEle.style = "";
    gifEle.style = "display: none";
    for (let i = 0; i < textNumbers.length; i++) {
      const number = Math.floor(Math.random() * 10);
      textNumbers[i].innerHTML = number;
      result = result + number;
    }
    const winner = users.find(sel => sel.id == result);
    if (winner) {
      console.log(winner.name);
    }
    audioEle.pause();
    audioEle.load();
    playBtn.disabled = "";
  }, 6000);
}

