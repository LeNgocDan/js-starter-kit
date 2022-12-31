const $ = require('jquery')
import { participants } from './testdata'
import seedMapping from './seedMapping';
import './scss/index.scss';
import * as setup from './uiSetup';
let participantsCopy = participants;
let PARTICIPANT_SIZE = participants.length;
const PERSON_WINNER_MAP = new Map();

// initiate slots
const RING_SLOTS = [1, 2, 3];
const SLOTS_PER_REEL = 12;
const REEL_RADIUS = 150;

function createSlots(ring) {
  var slotAngle = 360 / SLOTS_PER_REEL;

  var seed = 0;

  for (var i = 0; i < SLOTS_PER_REEL; i++) {
    var slot = document.createElement('div');
    slot.className = 'slot';
    var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';
    slot.style.transform = transform;
    $(slot).append('<p>' + ((seed + i) % 10) + '</p>');
    ring.append(slot);
  }
}

function findSeed(oldSeed, result) {
  let seedMappingCopy = seedMapping;
  for (var i = 0; i < seedMappingCopy.length; i++) {
    if (seedMappingCopy[i].seed != oldSeed && seedMappingCopy[i].result == result) {
      return seedMappingCopy[i].seed;
    }
  }
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
  console.log("ring all");
  for (var i = 1; i <= 3; i++) {
    var oldSeed = -1;
    var oldClass = $('#ring-' + i).attr('class');
    if (oldClass.length > 4) {
      oldSeed = parseInt(oldClass.slice(10));
    }
    var iSeed = findSeed(oldSeed, result[i - 1])
    if (!iSeed) {
      iSeed = 10;
      $('#ring-' + i)
        .css('animation', 'back-spin 1s, spin-' + iSeed + ' ' + 1 + 's')
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

  var oldSeed = -1;
  var oldClass = $('#ring-' + ringIndex).attr('class');
  if (oldClass.length > 4) {
    oldSeed = parseInt(oldClass.slice(10));
  }
  var iSeed = findSeed(oldSeed, result[currRingIdx]);
  $('#ring-' + ringIndex[currRingIdx])
    .css('animation', 'back-spin 1s, spin-' + iSeed + ' ' + (timer + ringIndex[currRingIdx] * 1) + 's')
    .attr('class', 'ring spin-' + iSeed);
}

function ensureNextMultiSpin() {
  setup.closingCurtain();
  setup.hideCurtain();
  setup.showVideo();
  console.log("Người đã trúng giải");
  console.log(PERSON_WINNER_MAP);
  if (PARTICIPANT_SIZE === 0) {
    alert('Tất cả mọi người đều đã trúng giải, nếu bạn muốn chơi tiếp, hãy tải lại trò chơi')
    return false;
  }
}

$(document).ready(function () {
  for (var ringIndex of RING_SLOTS) {
    createSlots($('#ring-' + ringIndex));
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
      ensureNextMultiSpin();
      let RESULT = getWinnerPersonCode();
      setup.playVideo();
      setup.disabledBtnTrigger();
      spinMultiRing(TIMER, RESULT);

      setTimeout(() => {
        setup.updateStateWhenMultiStop();
      }, (TIMER + RING_SLOTS.length + delay) * 1000);

    } else {
      setup.disabledBtnTrigger();
      if (currRingIdx == -1) {
        ensureNextMultiSpin();
        RESULT = getWinnerPersonCode();
        setup.updateStateWhenEachStart();
      }
      ++currRingIdx;
      spinEachRing(TIMER, RESULT, RING_SLOTS, currRingIdx);
      setTimeout(() => {
        setup.enabledBtnTrigger();
      }, (TIMER + 1) * 1000);

      if (currRingIdx == 2) {
        setTimeout(() => {
          setup.enabledBtnTrigger();
          setup.updateStateWhenMultiStop();
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
      setup.prepareToRolling();
    }, 2000);
  } else {
    console.log('Mở rèmmmmm');
    setup.enabledBtnTrigger();
  }
});


