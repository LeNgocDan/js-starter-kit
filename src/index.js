const $ = require('jquery')
import seedMapping from './seedMapping';
import './scss/index.scss';
import audio from './assets/music.mp3';
import video from './assets/roll.mp4'

// scroll type
const isMultiScrolling = true;

// initiate slots
const initRingIndex = [1, 2, 3];

const initResult = ![7, 2, 8];

function findSeed(result) {
  return seedMapping.find((s) => s.result === result).seed;
}


const audioEle = document.getElementById('audio');
const videoEle = document.getElementById('video');
const curtainContainerEle = document.getElementById('curtain-container');

audioEle.src = audio;
videoEle.src = video;

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

function getSeed() {
  // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
  return Math.floor(Math.random() * (SLOTS_PER_REEL));
}

function getSeed2() {
  // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
  return Math.floor(Math.random() * (5) + 6);
}

function spinAllRing(timer) {
  var result = "";
  for (var i = 1; i <= 3; i++) {
    var oldSeed = -1;
    var oldClass = $('#ring-' + i).attr('class');
    if (oldClass.length > 4) {
      oldSeed = parseInt(oldClass.slice(10));
    }
    if (!initResult) {
      var seed = getSeed();
      if (i == 2) {
        seed = getSeed2();
      }
      while (oldSeed == seed) {
        if (i == 2) {
          seed = getSeed2();
        } else {
          seed = getSeed();
        }
      }
      console.log("seed: " + seed);
      result += (seed + 4) % SLOTS_PER_REEL % 10;

      $('#ring-' + i)
      .css('animation', 'back-spin 1s, spin-' + seed + ' ' + (timer + i * 1) + 's')
      .attr('class', 'ring spin-' + seed);
      console.log(result);
    } else {
      var iSeed = findSeed(initResult[i - 1])
      $('#ring-' + i)
      .css('animation', 'back-spin 1s, spin-' + iSeed + ' ' + (timer + i * 1) + 's')
      .attr('class', 'ring spin-' + iSeed);
    }
    console.log("result: " + result);
  }
}

let currentRingIndex = 0;
var resultAfterEachSpin = "";
function spinEachRing(timer, ringIndex) {
  if (!initResult) {
    var oldSeed = -1;
    var oldClass = $('#ring-' + ringIndex).attr('class');
    if (oldClass.length > 4) {
      oldSeed = parseInt(oldClass.slice(10));
    }
    var seed = getSeed();
    if (ringIndex[currentRingIndex] == 2) {
      seed = getSeed2();
    }
    while (oldSeed == seed) {
      if (ringIndex[currentRingIndex] == 2) {
        seed = getSeed2();
      } else {
        seed = getSeed();
      }
    }
    resultAfterEachSpin += (seed + 4) % SLOTS_PER_REEL % 10;

    $('#ring-' + ringIndex[currentRingIndex])
      .css('animation', 'back-spin 1s, spin-' + seed + ' ' + (timer + ringIndex[currentRingIndex] * 1) + 's')
      .attr('class', 'ring spin-' + seed);
  } else {
    var iSeed = findSeed(initResult[currentRingIndex]);
    $('#ring-' + ringIndex[currentRingIndex])
      .css('animation', 'back-spin 1s, spin-' + iSeed + ' ' + (timer + ringIndex[currentRingIndex] * 1) + 's')
      .attr('class', 'ring spin-' + iSeed);
  }
  if (currentRingIndex < ringIndex.length) {
    currentRingIndex++;
  }
  if (currentRingIndex == 3) {
    console.log(resultAfterEachSpin);
    resultAfterEachSpin = "";
    currentRingIndex = 0;
  }
}

$(document).ready(function () {

  for (var ringIndex of initRingIndex) {
    createSlots($('#ring-' + ringIndex));
  }

  // hook start button
  $('.go').on('click', function () {
    var timer = 2;
    var delay = 1;
    curtainContainerEle.style.display = 'none';
    videoEle.play();
    audioEle.play();
    if (isMultiScrolling) {
      spinAllRing(timer);
      setTimeout(() => {
        videoEle.pause();
        audioEle.pause();
        curtainContainerEle.style.display = 'block';
        videoEle.style.display = 'none';
      }, (timer + initRingIndex.length + delay) * 1000);
    } else {
      spinEachRing(timer, initRingIndex);
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

// // // fake call api for testing

$(document).ready(function () {
  var btnSpin = $('#slot-trigger'),
    head = $('#head'),
    stick = $('#stick'),
    hole = $('#hole');

  function slotTriggerMove() {
    global.TweenMax.set([head, stick, hole], { y: 0, scale: 1 });
    global.TweenMax.to(head, .4, { y: 70, repeat: 1, yoyo: true, ease: global.Sine.easeIn });
    global.TweenMax.to(stick, .4, { y: 14, scaleY: .3, transformOrigin: "50% 100%", repeat: 1, yoyo: true, ease: global.Sine.easeIn });
    global.TweenMax.to(hole, .4, { y: 10, scaleY: 2, repeat: 1, yoyo: true, ease: global.Sine.easeIn });
  }

  btnSpin.click(function () {
    slotTriggerMove();
  })
});
