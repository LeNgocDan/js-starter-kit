const $ = require('jquery')
import { config } from './vendor';
import { data } from './data'
import { awards } from './award'

import seedMapping from './seedMapping';
import './scss/index.scss';
import audio from './assets/music.mp3';
import video from './assets/roll.mp4'

console.log(data);
console.log(awards);

// scroll type
let currentAwardIndex = 0;
let isMultiScrolling = awards[currentAwardIndex]["MultiScroll"];
let winnerPersons = [];

// initiate slots
const initRingIndex = [1, 2, 3];

let initResult = false;

function getWinnerPerson(index) {
  return data[index];
}

function getRandomPersonIndex() {
  return Math.floor(Math.random() * data.length);
}

const carouselContainerEle = document.getElementById("m-carousel");
const curtainContainerEle = document.getElementById("curtain-container");
const awardViewContainerEle = document.getElementById("award-container");
const audioEle = document.getElementById('audio');
const videoEle = document.getElementById('video');

awardViewContainerEle.style.display = 'none';

audioEle.src = audio;
videoEle.src = video;
global.tsParticles.load("tsparticles", config)

// Render carousel
for (const [index, award] of awards.entries()) {
  const carousel = `<div class="carousel-item">
            <div class="carousel-item__image"></div>
            <div class="carousel-item__info">
              <div class="carousel-item__container" id="award-info-${index - 1}">
                <h1 class="carousel-item__title">${award["Name"]}</h1>
                <h3 class="carousel-item__description">Mã số: ${award["Description"]}</h3>
                <h5 class="carousel-item__description">Tên: Lương Văn Đạt</h5>
                <h5 class="carousel-item__description">Chi nhánh: S. BEE - Thanh Hóa</h5>
                <h5 class="carousel-item__description">Phòng ban: Giao Nhận BEETH</h5>
              </div>
            </div>
          </div>`
  carouselContainerEle.innerHTML += carousel;
}

$(function () {
  $('.carousel-item').eq(0).addClass('active');
  var total = $('.carousel-item').length;
  var current = 0;
  $('#moveRight').on('click', function () {
    var next = current;
    current = current + 1;
    if (currentAwardIndex == awards.length) {
      currentAwardIndex++;
      isMultiScrolling = awards[currentAwardIndex]["MultiScroll"];
    }
    setSlide(next, current);
  });
  $('#moveLeft').on('click', function () {
    var prev = current;
    current = current - 1;
    if (currentAwardIndex > 0) {
      currentAwardIndex--;
      isMultiScrolling = awards[currentAwardIndex]["MultiScroll"];
    }
    setSlide(prev, current);
  });
  function setSlide(prev, next) {
    var slide = current;
    if (next > total - 1) {
      slide = 0;
      current = 0;
    }
    if (next < 0) {
      slide = total - 1;
      current = total - 1;
    }
    $('.carousel-item').eq(prev).removeClass('active');
    $('.carousel-item').eq(slide).addClass('active');
    setTimeout(function () {

    }, 800);

    console.log('current ' + current);
    console.log('prev ' + prev);
  }
});

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

function findSeed(result) {
  return seedMapping.find((s) => s.result == result).seed;
}

function spinAllRing(timer) {
  var result = "";
  for (var i = 1; i <= 3; i++) {
    var iSeed = findSeed(initResult[i - 1])
    $('#ring-' + i)
      .css('animation', 'back-spin 1s, spin-' + iSeed + ' ' + (timer + i * 1) + 's')
      .attr('class', 'ring spin-' + iSeed);
    console.log("result: " + result);
  }
}

let currentRingIndex = 0;
var resultAfterEachSpin = "";
function spinEachRing(timer, ringIndex) {
  var iSeed = findSeed(initResult[currentRingIndex]);
  $('#ring-' + ringIndex[currentRingIndex])
    .css('animation', 'back-spin 1s, spin-' + iSeed + ' ' + (timer + ringIndex[currentRingIndex] * 1) + 's')
    .attr('class', 'ring spin-' + iSeed);

  if (currentRingIndex < ringIndex.length) {
    currentRingIndex++;
  }
  if (currentRingIndex == 3) {
    console.log(resultAfterEachSpin);
    resultAfterEachSpin = "";
    currentRingIndex = 0;
    setTimeout(() => {
      videoEle.pause();
      audioEle.pause();
      curtainContainerEle.style.display = 'block';
      videoEle.style.display = 'none';
    }, (timer + ringIndex[currentRingIndex] + 4) * 1000);
  }
}

$(document).ready(function () {

  for (var ringIndex of initRingIndex) {
    createSlots($('#ring-' + ringIndex));
  }

  // hook start button
  $('.go').on('click', function () {
    if (!awards[currentAwardIndex]["WinnerCode"]) {
      const winnerPersons = getWinnerPerson(getRandomPersonIndex());
      awards[currentAwardIndex]["WinnerCode"] = winnerPersons["Code"];
      console.log(winnerPersons);
      initResult = winnerPersons["Code"].split('');
    }
    var timer = 8;
    var delay = 1;
    curtainContainerEle.style.display = 'none';
    carouselContainerEle.style.display = 'none';
    awardViewContainerEle.style.display = 'flex';
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