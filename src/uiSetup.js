import audio from './assets/music.mp3';
import gif from './assets/peterparker.gif'

import { awards } from './award'

const curtainEle = document.getElementById("curtain");
const curtainCheckedEle = document.getElementById("curtain-trigger");
const btnTrigger = document.getElementById("slot-trigger");
const audioEle = document.getElementById('audio');
const gifEle = document.getElementById('gif');


audioEle.src = audio;
gifEle.src = gif;

export class Award {
  awards = [];
  currAwardIdx = 0;

  constructor(awards) {
    currAwardIdx = 0;
    this.awards = awards;
  }

  showAward = () => {
    let award = awards[currAwardIdx];
    if (!award) {
      alert('Please select a award');
      return;
    }
    const nameAwardEle = document.getElementById('award-name');
    nameAwardEle.innerHTML = award['Name'];
  }

  getAwardName = () => {
    let award = awards[currAwardIdx];
    if (!award) {
      alert('Please select a award');
      return;
    }
    return award['Name'];
  }

  nextAward = () => {
    this.cleanWinnerPerson();
    ++currAwardIdx;
    if (currAwardIdx > awards.length - 1) currAwardIdx = 0;
    this.showAward();
  }

  previousAward = () => {
    this.cleanWinnerPerson();
    --currAwardIdx;
    if (currAwardIdx < 0) currAwardIdx = awards.length - 1;
    this.showAward();
  }

  getTimerAward = () => {
    let award = awards[currAwardIdx];
    if (!award) {
      alert('Please select a award');
      return;
    }
    if (award['Timer'] && award['Timer'] > 0) return award['Timer'];
    return 8;
  }

  isMultiScrolling = () => {
    let award = awards[currAwardIdx];
    if (!award) {
      alert('Please select a award');
      return;
    }
    return award['MultiScroll'];
  }

  showWinnerPerson = (winner) => {
    if (!winner) return;
    const winnerName = document.getElementById("winner-name");
    const winnerBranch = document.getElementById("winner-branch");
    const winnerDept = document.getElementById("winner-dept");
    winnerName.innerHTML = `${winner.Name}`
    winnerBranch.innerHTML = `Chi nhánh: ${winner.Branch}`
    winnerDept.innerHTML = `Phòng ban: ${winner.Dept}`
  }

  cleanWinnerPerson = () => {
    const winnerName = document.getElementById("winner-name");
    const winnerBranch = document.getElementById("winner-branch");
    const winnerDept = document.getElementById("winner-dept");
    winnerName.innerHTML = `Tên`
    winnerBranch.innerHTML = `Chi nhánh`
    winnerDept.innerHTML = `Phòng ban:`
  }
}

// show ten giai thuong
let currAwardIdx = 0;

export function showWinnerPerson(winner) {
  if (!winner) return;
  const winnerName = document.getElementById("winner-name");
  const winnerBranch = document.getElementById("winner-branch");
  const winnerDept = document.getElementById("winner-dept");
  winnerName.innerHTML = `${winner.Name}`
  winnerBranch.innerHTML = `Chi nhánh: ${winner.Branch}`
  winnerDept.innerHTML = `Phòng ban: ${winner.Dept}`
}

export function cleanWinnerPerson() {
  const winnerName = document.getElementById("winner-name");
  const winnerBranch = document.getElementById("winner-branch");
  const winnerDept = document.getElementById("winner-dept");
  winnerName.innerHTML = `Tên`
  winnerBranch.innerHTML = `Chi nhánh`
  winnerDept.innerHTML = `Phòng ban:`
}

export function showGif() {
  gifEle.style.display = 'flex';
}

export function hideGif() {
  gifEle.style.display = 'none';
}

export function playAudio() {
  showGif();
  audioEle.play();
}


export function stopAudio() {
  hideGif();
  audioEle.pause();
}

export function showCurtain() {
  curtainEle.style.display = 'flex'
}

export function hideCurtain() {
  curtainEle.style.display = 'none'
}

export function disabledBtnTrigger() {
  btnTrigger.disabled = true;
}

export function enabledBtnTrigger() {
  btnTrigger.disabled = false;
}

export function isCurtainClosing() {
  return !curtainCheckedEle.checked; // false => mo rem , true => dong rem
}

export function closingCurtain() {
  curtainCheckedEle.checked = true;
}



