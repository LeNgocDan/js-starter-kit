import './scss/index.scss';
console.log('call index.js!');


const users = [{ id: '00001', name: "Le Ngoc Dan" }, { id: '12340', name: "Luong Van Dat" }];

const playBtn = document.getElementById('spin');
playBtn.onclick = function () {
  const imgAwardEle = document.getElementById('img-award');
  imgAwardEle.style = "display: none";
  const gifEle = document.getElementById('gif');
  gifEle.style = "display: flex";
  const textNumbers = document.getElementsByClassName('card-text')

  // var audio = new Audio('https://youtu.be/zAoroV6Dgdc');
  // audio.play();

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
  }, 3000);
}

