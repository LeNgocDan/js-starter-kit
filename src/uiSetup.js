import audio from './assets/music.mp3';
import video from './assets/roll.mp4'
import { config } from './vendor';
import { awards } from './award'

const curtainEle = document.getElementById("curtain");
const curtainCheckedEle = document.getElementById("curtain-trigger");
const videoEle = document.getElementById('video');
const btnTrigger = document.getElementById("slot-trigger");
const audioEle = document.getElementById('audio');

const nameAwardEle = document.getElementById('award-name');

audioEle.src = audio;
videoEle.src = video;
showVideo();
hideCurtain();
// show ten giai thuong
let currAwardIdx = 0;
showAward();

export function showWinnerPerson(winner) {
  if (!winner) return;
  const winnerName = document.getElementById("winner-name");
  const winnerBranch = document.getElementById("winner-branch");
  const winnerDept = document.getElementById("winner-dept");
  winnerName.innerHTML = `${winner.Name}`
  winnerBranch.innerHTML = `Chi nhánh: ${winner.Branch}`
  winnerDept.innerHTML = `Phòng ban: ${winner.Dept}`
}

export function showAward() {
  let award = awards[currAwardIdx];
  if (!award) {
    alert('Please select a award');
    return;
  }
  nameAwardEle.innerHTML = award['Name'];
}

export function nextAward() {
  ++currAwardIdx;
  if (currAwardIdx > awards.length - 1) currAwardIdx = 0;
  showAward();
}

export function previousAward() {
  --currAwardIdx;
  if (currAwardIdx < 0) currAwardIdx = awards.length - 1;
  showAward();
}

export function getTimerAward() {
  let award = awards[currAwardIdx];
  if (!award) {
    alert('Please select a award');
    return;
  }
  if (award['Timer'] && award['Timer'] > 0) return award['Timer'];
  return 8;
}

export function isMultiScrolling() {
  let award = awards[currAwardIdx];
  if (!award) {
    alert('Please select a award');
    return;
  }
  return award['MultiScroll'];
}

export function showVideo() {
  videoEle.style.display = 'flex';
  hideCurtain();
}

export function playVideo() {
  videoEle.play();
  audioEle.play();
}

export function hideVideo() {
  videoEle.style.display = 'none';
  showCurtain();
}

export function stopVideo() {
  videoEle.pause();
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

export function updateStateWhenMultiStart() {
  showVideo();
  enabledBtnTrigger();
}

export function updateStateWhenMultiStop() {
  stopVideo();
  hideVideo();
  showCurtain();
}

export function updateStateWhenEachStart() {
  showVideo();
  hideCurtain();
  videoEle.play();
  audioEle.play();
}

export function updateStateWhenEachRingStop() {

}

export function prepareToRolling() {
  enabledBtnTrigger();
  showVideo();
}

export function isCurtainClosing() {
  return !curtainCheckedEle.checked; // false => mo rem , true => dong rem
}

export function closingCurtain() {
  curtainCheckedEle.checked = true;
}

// -------------------for UI only
global.tsParticles.load("tsparticles", config)

