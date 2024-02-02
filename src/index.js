const $ = require('jquery')
import { participants } from './testdata'
import seedMapping from './seedMapping';
import './scss/index.scss';
import * as setup from './uiSetup';
import { config } from './vendor';
import { rest, restTest } from './api/apiUtils';

let participantsCopy = participants;
let PARTICIPANT_SIZE = participants.length;
const PERSON_WINNER_MAP = new Map();


// initiate slots
const RING_SLOTS = [1, 2, 3, 4];
const SLOTS_PER_REEL = 12;
const REEL_RADIUS = 150;

restTest.get("users", {}, res => {
  console.log('fetch from glitch');
  console.log(res);
})

// -------------------for UI only, fireworks
global.tsParticles.load("tsparticles", config)

let award = new setup.Award([]);

rest.get("users", {}, (result) => {
  console.log('----------------Load Participant ------------------');
  if (result) {
    participantsCopy = result;
    PARTICIPANT_SIZE = participantsCopy.length;
  }
});

rest.get("awards", {}, (result) => {
  if (result) {
    console.log('----------------Load Awards ------------------');
    award = new setup.Award(result);
  }
})

award.showAward();
setup.hideGif();


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

function findSeed(oldSeed, result, _ringIdx) {
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
  let randomPersonIdx = Math.floor(Math.random() * PARTICIPANT_SIZE);
  const winnerPersons = participantsCopy.splice(randomPersonIdx, 1);
  let winnerPerson = winnerPersons[0];
  let id = winnerPerson['id'];
  let code = winnerPerson['Code'];
  rest.delete(`users/${id}`, {}, (result) => {
    console.log('delete winner person from database');
    console.log(result);
  })
  rest.post(`winners`, winnerPerson, (_result) => {
    console.log('add winner user to list winners');
  })

  PARTICIPANT_SIZE--;
  setup.showWinnerPerson(winnerPerson);
  return code.split('');
}

function spinMultiRing(timer, result) {
  for (var i = 1; i <= 4; i++) {

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
    award.previousAward();
  });
  $('#btn-arrow-right').on('click', function () {
    award.nextAward();
  });

  // -------------------- Spin Logic ------------------------------
  // Track when rolling each ring
  let currRingIdx = -1;
  let RESULT;

  // hook start button
  $('#slot-trigger').on('click', function () {
    let TIMER = award.getTimerAward();
    var delay = 0.5;
    let MULTI_SCROLLING = award.isMultiScrolling();
    MULTI_SCROLLING = true
    if (MULTI_SCROLLING) {
      // ensureNextMultiSpin();
      // setup.playAudio();
      setup.disabledBtnTrigger();
      // let RESULT = getWinnerPersonCode();
      const RESULT = [1, 1, 1, 1]
      console.log("RESULT " + RESULT);

      spinMultiRing(TIMER, RESULT);
      setup.enabledBtnTrigger();
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


