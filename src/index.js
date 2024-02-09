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

function findSeed(oldSeed, result, ringIdx) {
  for (let i = 0; i < seedMapping.length; i++) {
    let sel = seedMapping[i];
    if (sel.seed != oldSeed && sel.result == result) {
      return sel.seed;
    }
  }
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
  for (let i = 1; i <= 4; i++) {
    let oldSeed = -1;
    let oldClass = $('#ring-' + i).attr('class');
    if (oldClass.length > 4) {
      oldSeed = parseInt(oldClass.slice(10));
    }
    let iSeed = findSeed(oldSeed, result[i - 1], i);
    if (typeof iSeed != 'number') {
      let notEqualSeeds = seedMapping.map(sel => sel.seed).filter(seed => seed != oldSeed);
      let fakeHackSpin = notEqualSeeds[Math.floor(Math.random() * notEqualSeeds.length)];

      $('#ring-' + i)
        .css('animation', 'back-spin 1s, spin-' + fakeHackSpin + ' ' + (timer + i * 1) + 's')
        .attr('class', 'ring spin-' + oldSeed);
    } else {
      const spin = `spin-${iSeed}`
      $('#ring-' + i)
        .css('animation', 'back-spin 1s, ' + spin + ' ' + (timer + i * 1) + 's')
        .attr('class', 'ring ' + spin);
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

  let head = $('#head');
  let stick = $('#stick');
  let hole = $('#hole');

  function slotTriggerMove() {
    TweenMax.set([head, stick, hole], { y: 0, scale: 1 });
    TweenMax.to(head, .4, { y: 70, repeat: 1, yoyo: true, ease: Sine.easeIn });
    TweenMax.to(stick, .4, { y: 14, scaleY: .3, transformOrigin: "50% 100%", repeat: 1, yoyo: true, ease: Sine.easeIn });
    TweenMax.to(hole, .4, { y: 10, scaleY: 2, repeat: 1, yoyo: true, ease: Sine.easeIn });
  }

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

  let LUCKY_NUMBER = [
    "3627", "4036", "4511", "6639", "2530", "6244",
    "5176", "4087", "2739", "6003", "4815", "9487",
    "6124", "6092", "5929", "7602", "5800", "4399",
    "9237", "0800", "5586", "9506", "5827", "0436",
    "8481", "2099", "9091", "4184", "2101", "5625",
    "1434", "2952", "1976", "5829", "5034", "9790",
    "9791", "9962", "1861", "3629", "9721", "5216",
    "8745", "5607", "8901", "7902", "3344", "8379",
    "7424", "5355", "8334", "5539", "3695", "0412",
    "7797", "9129", "7390"]

  function getRandomElement(luckyNumbers) {
    const randomIndex = Math.floor(Math.random() * luckyNumbers.length);
    let code = luckyNumbers[randomIndex];
    return code.split('');
  }

  const LUCKY_NUMBER_ALREADY = [];


  // hook start button
  $('#slot-trigger').on('click', function () {
    slotTriggerMove();
    let TIMER = award.getTimerAward();
    TIMER = 3
    let MULTI_SCROLLING = award.isMultiScrolling();
    MULTI_SCROLLING = true
    if (MULTI_SCROLLING) {
      // ensureNextMultiSpin();
      setup.playAudio();
      setup.disabledBtnTrigger();

      // let RESULT = getWinnerPersonCode();

      let RESULT = getRandomElement(LUCKY_NUMBER);
      const resultStr = RESULT.join("");
      LUCKY_NUMBER_ALREADY.push(resultStr);
      LUCKY_NUMBER = LUCKY_NUMBER.filter(item => item !== resultStr);
      console.log('-------So con trung thuong-----------');
      console.log(LUCKY_NUMBER);

      console.log('-------So da trung thuong-----------');
      console.log(LUCKY_NUMBER_ALREADY);

      spinMultiRing(TIMER, RESULT);
      setTimeout(() => {
        setup.enabledBtnTrigger();
        setup.stopAudio();
      }, (TIMER + 3) * 1000);

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


