const $ = require('jquery')
import { participants } from './data'
import seedMapping from './seedMapping';
import seedMap2 from './seedMapping2';
import './scss/index.scss';
import * as setup from './uiSetup';
let participantsCopy = participants;
let PARTICIPANT_SIZE = participants.length;
const PERSON_WINNER_MAP = new Map();

// initiate slots
const RING_SLOTS = [1, 2, 3];
const SLOTS_PER_REEL = 12;
const REEL_RADIUS = 150;

function createSlots(ringEle, ringIdx) {
  var slotAngle = 360 / SLOTS_PER_REEL;
  var seed = 0;
  for (var i = 0; i < SLOTS_PER_REEL; i++) {
    var slot = document.createElement('div');
    slot.className = 'slot';
    var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';
    slot.style.transform = transform;
    let className = `ring-${ringIdx}-slot-number`;
    $(slot).append('<p class="' + className + '">' + ((seed + i) % 10) + '</p>');
    ringEle.append(slot);
  }
}

function findSeed2(oldSeed, result) {
  let newSeed = null;
  for (var i = 0; i < seedMap2.length; i++) {
    if (seedMap2[i].seed != oldSeed && seedMap2[i].result == result) {
      newSeed = seedMap2[i].seed;
    }
  }
  return newSeed;
}

function findSeed(oldSeed, result, ringIdx) {
  let newSeed = null;
  for (var i = 0; i < seedMapping.length; i++) {
    if (seedMapping[i].seed != oldSeed && seedMapping[i].result == result) {
      newSeed = seedMapping[i].seed;
    }
  }
  // if (!newSeed) {
  //   for (var i = 0; i < $(`.ring-${ringIdx}-slot-number`).length; i++) {
  //     let text = (seedMap2[i].seed + i) % 10;
  //     $(`.ring-${ringIdx}-slot-number`)[i].innerHTML = seedMap2[i].result;
  //     $(`.ring-${ringIdx}-slot-number`)[i].innerText = seedMap2[i].result;
  //   }
  //   console.log('\n call seed map 2 at ring ' + ringIdx);
  //   newSeed = findSeed2(oldSeed, result);
  // }
  return newSeed;
}

function getWinnerPersonCode() {
  console.log(PARTICIPANT_SIZE);
  console.log(participantsCopy);
  let randomPersonIdx = Math.floor(Math.random() * PARTICIPANT_SIZE);
  const winnerPersons = participantsCopy.splice(randomPersonIdx, 1);
  let winnerPerson = winnerPersons[0];
  PERSON_WINNER_MAP.set(winnerPerson['Code'], winnerPerson);
  PARTICIPANT_SIZE--;
  setup.showWinnerPerson(winnerPerson);
  return winnerPerson["Code"].split('');
}

function spinMultiRing(timer, result) {
  for (var i = 1; i <= 3; i++) {
    var oldSeed = -1;
    var oldClass = $('#ring-' + i).attr('class');
    if (oldClass.length > 4) {
      oldSeed = parseInt(oldClass.slice(10));
    }
    var iSeed = findSeed(oldSeed, result[i - 1], i);
    console.log('Old Seed ' + oldSeed + 'New Seed ' + iSeed);
    console.log("---------------------------------------------");
    if (!iSeed) {
      iSeed = oldSeed;
      let fakeHackSpin = 0;
      if (oldSeed == 0) fakeHackSpin = 11;

      $('#ring-' + i)
        .css('animation', 'back-spin 1s, spin-' + fakeHackSpin + ' ' + 1 + 's')
        .attr('class', 'ring spin-' + iSeed);
    } else {
      $('#ring-' + i)
        .css('animation', 'back-spin 1s, spin-' + iSeed + ' ' + (timer + i * 1) + 's')
        .attr('class', 'ring spin-' + iSeed);
    }
  }


}

function spinEachRing(timer, result, ringIndex, currRingIdx) {
  console.log("each");
  console.log("Current Ring Index " + currRingIdx);
  console.log(ringIndex);
  console.log(currRingIdx);
  var oldSeed = -1;
  var oldClass = $('#ring-' + ringIndex[currRingIdx]).attr('class');
  if (oldClass.length > 4) {
    oldSeed = parseInt(oldClass.slice(10));
  }
  var iSeed = findSeed(oldSeed, result[currRingIdx], currRingIdx);
  if (!iSeed) {
    iSeed = oldSeed;
    let fakeHackSpin = 5;
    if (oldSeed == 5) fakeHackSpin = 10;
    $('#ring-' + ringIndex[currRingIdx])
      .css('animation', 'back-spin 1s, spin-' + fakeHackSpin + ' ' + 1 + 's')
      .attr('class', 'ring spin-' + iSeed);
  } else {
    $('#ring-' + ringIndex[currRingIdx])
      .css('animation', 'back-spin 1s, spin-' + iSeed + ' ' + (timer + ringIndex[currRingIdx] * 1) + 's')
      .attr('class', 'ring spin-' + iSeed);
  }
}

function ensureNextMultiSpin() {
  setup.closingCurtain();
  console.log("Người đã trúng giải");
  console.log(PERSON_WINNER_MAP);
  if (PARTICIPANT_SIZE === 0) {
    alert('Tất cả mọi người đều đã trúng giải, nếu bạn muốn chơi tiếp, hãy tải lại trò chơi')
    return false;
  }
}

$(document).ready(function () {
  for (var ringIndex of RING_SLOTS) {
    createSlots($('#ring-' + ringIndex), ringIndex);
  }

  $('#btn-arrow-left').on('click', function () {
    setup.previousAward();
  });
  $('#btn-arrow-right').on('click', function () {
    setup.nextAward();
  });

  // -------------------- Spin Logic ------------------------------
  // Track when rolling each ring
  let currRingIdx = -1;
  let RESULT;

  // hook start button
  $('#slot-trigger').on('click', function () {
    let TIMER = setup.getTimerAward();
    var delay = 0.5;

    if (setup.isMultiScrolling()) {
      let closingCurtain = setup.isCurtainClosing();
      ensureNextMultiSpin();

      if (closingCurtain) {
        setTimeout(function () {
          setup.playAudio();
          setup.disabledBtnTrigger();
          let RESULT = getWinnerPersonCode();
          spinMultiRing(TIMER, RESULT);
        }, 1000)
      } else {
        setup.playAudio();
        setup.disabledBtnTrigger();
        let RESULT = getWinnerPersonCode();
        spinMultiRing(TIMER, RESULT);
      }
      setTimeout(() => {
        setup.stopAudio();
      }, (TIMER + RING_SLOTS.length + delay) * 1000);
    } else {
      setup.disabledBtnTrigger();
      if (currRingIdx == -1) {
        let closingCurtain = setup.isCurtainClosing();
        ensureNextMultiSpin();
        if (closingCurtain) {
          setTimeout(() => {
            setup.playAudio();
            RESULT = getWinnerPersonCode();
          }, 1000)
        } else {
          setup.playAudio();
          RESULT = getWinnerPersonCode();
        }
      }
      ++currRingIdx;
      spinEachRing(TIMER, RESULT, RING_SLOTS, currRingIdx);
      setTimeout(() => {
        setup.enabledBtnTrigger();
      }, (TIMER + 1) * 1000);

      if (currRingIdx == 2) {
        setTimeout(() => {
          setup.enabledBtnTrigger();
          setup.stopAudio();
        }, (TIMER + 4) * 1000);
        currRingIdx = -1;
      }
    }
  })

  // hook xray checkbox
  $('#xray').on('click', function () {
    //var isChecked = $('#xray:checked');
    var tilt = 'tiltout';

    if ($(this).is(':checked')) {
      tilt = 'tiltin';
      $('.slot').addClass('backface-on');
      $('#rotate').css('animation', tilt + ' 2s 1');

      setTimeout(function () {
        $('#rotate').toggleClass('tilted');
      }, 2000);
    } else {
      tilt = 'tiltout';
      $('#rotate').css({ 'animation': tilt + ' 2s 1' });

      setTimeout(function () {
        $('#rotate').toggleClass('tilted');
        $('.slot').removeClass('backface-on');
      }, 1900);
    }
  })

  // hook perspective
  $('#perspective').on('click', function () {
    $('#stage').toggleClass('perspective-on perspective-off');
  })
});

$('#curtain-trigger').change(function () {
  if (!setup.isCurtainClosing()) {
    console.log('Đóng rèmmmmm');
    setup.disabledBtnTrigger();
    setTimeout(() => {
      setup.enabledBtnTrigger();
    }, 2000);
  } else {
    console.log('Mở rèmmmmm');
    setup.enabledBtnTrigger();
  }
});


