const $ = require('jquery')
// import { tsParticles } from "tsparticles-engine";

import seedMapping from './seedMapping';
import './scss/index.scss';
import audio from './assets/music.mp3';
import video from './assets/roll.mp4'

const config = {
  "autoPlay": true,
  "background": {
    "color": {
      "value": "#000000"
    },
    "image": "",
    "position": "50% 50%",
    "repeat": "no-repeat",
    "size": "cover",
    "opacity": 0.8
  },
  "backgroundMask": {
    "composite": "destination-out",
    "cover": {
      "color": {
        "value": "#fff"
      },
      "opacity": 1
    },
    "enable": false
  },
  "defaultThemes": {},
  "delay": 0,
  "fullScreen": {
    "enable": true,
    "zIndex": -1
  },
  "detectRetina": true,
  "duration": 0,
  "fpsLimit": 120,
  "interactivity": {
    "detectsOn": "window",
    "events": {
      "onClick": {
        "enable": true,
        "mode": "push"
      },
      "onDiv": {
        "selectors": "#repulse-div",
        "enable": false,
        "mode": "repulse",
        "type": "circle"
      },
      "onHover": {
        "enable": true,
        "mode": "connect",
        "parallax": {
          "enable": false,
          "force": 60,
          "smooth": 10
        }
      },
      "resize": {
        "delay": 0.5,
        "enable": true
      }
    },
    "modes": {
      "attract": {
        "distance": 200,
        "duration": 0.4,
        "easing": "ease-out-quad",
        "factor": 1,
        "maxSpeed": 50,
        "speed": 1
      },
      "bounce": {
        "distance": 200
      },
      "bubble": {
        "distance": 400,
        "duration": 2,
        "mix": false,
        "opacity": 0.8,
        "size": 40,
        "divs": {
          "distance": 200,
          "duration": 0.4,
          "mix": false,
          "selectors": []
        }
      },
      "connect": {
        "distance": 80,
        "links": {
          "opacity": 0.5
        },
        "radius": 60
      },
      "grab": {
        "distance": 400,
        "links": {
          "blink": false,
          "consent": false,
          "opacity": 1
        }
      },
      "push": {
        "default": true,
        "groups": [],
        "quantity": 4
      },
      "remove": {
        "quantity": 2
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4,
        "factor": 100,
        "speed": 1,
        "maxSpeed": 50,
        "easing": "ease-out-quad",
        "divs": {
          "distance": 200,
          "duration": 0.4,
          "factor": 100,
          "speed": 1,
          "maxSpeed": 50,
          "easing": "ease-out-quad",
          "selectors": []
        }
      },
      "slow": {
        "factor": 3,
        "radius": 200
      },
      "trail": {
        "delay": 1,
        "pauseOnStop": false,
        "quantity": 1
      },
      "light": {
        "area": {
          "gradient": {
            "start": {
              "value": "#ffffff"
            },
            "stop": {
              "value": "#000000"
            }
          },
          "radius": 1000
        },
        "shadow": {
          "color": {
            "value": "#000000"
          },
          "length": 2000
        }
      }
    }
  },
  "manualParticles": [],
  "particles": {
    "bounce": {
      "horizontal": {
        "random": {
          "enable": false,
          "minimumValue": 0.1
        },
        "value": 1
      },
      "vertical": {
        "random": {
          "enable": false,
          "minimumValue": 0.1
        },
        "value": 1
      }
    },
    "collisions": {
      "absorb": {
        "speed": 2
      },
      "bounce": {
        "horizontal": {
          "random": {
            "enable": false,
            "minimumValue": 0.1
          },
          "value": 1
        },
        "vertical": {
          "random": {
            "enable": false,
            "minimumValue": 0.1
          },
          "value": 1
        }
      },
      "enable": false,
      "mode": "bounce",
      "overlap": {
        "enable": true,
        "retries": 0
      }
    },
    "color": {
      "value": "random",
      "animation": {
        "h": {
          "count": 0,
          "enable": false,
          "offset": 0,
          "speed": 1,
          "decay": 0,
          "sync": true
        },
        "s": {
          "count": 0,
          "enable": false,
          "offset": 0,
          "speed": 1,
          "decay": 0,
          "sync": true
        },
        "l": {
          "count": 0,
          "enable": false,
          "offset": 0,
          "speed": 1,
          "decay": 0,
          "sync": true
        }
      }
    },
    "groups": {},
    "move": {
      "angle": {
        "offset": 0,
        "value": 90
      },
      "attract": {
        "distance": 200,
        "enable": false,
        "rotate": {
          "x": 600,
          "y": 1200
        }
      },
      "center": {
        "x": 50,
        "y": 50,
        "mode": "percent",
        "radius": 0
      },
      "decay": 0,
      "distance": {},
      "direction": "none",
      "drift": 0,
      "enable": true,
      "gravity": {
        "acceleration": 9.81,
        "enable": false,
        "inverse": false,
        "maxSpeed": 50
      },
      "path": {
        "clamp": true,
        "delay": {
          "random": {
            "enable": false,
            "minimumValue": 0
          },
          "value": 0
        },
        "enable": false,
        "options": {}
      },
      "outModes": {
        "default": "out",
        "bottom": "out",
        "left": "out",
        "right": "out",
        "top": "out"
      },
      "random": false,
      "size": false,
      "speed": 6,
      "spin": {
        "acceleration": 0,
        "enable": false
      },
      "straight": false,
      "trail": {
        "enable": false,
        "length": 10,
        "fillColor": {
          "value": "#000000"
        }
      },
      "vibrate": false,
      "warp": false
    },
    "number": {
      "density": {
        "enable": true,
        "area": 800,
        "factor": 1000
      },
      "limit": 500,
      "value": 300
    },
    "opacity": {
      "random": {
        "enable": false,
        "minimumValue": 0.1
      },
      "value": 0.5,
      "animation": {
        "count": 0,
        "enable": false,
        "speed": 1,
        "decay": 0,
        "sync": false,
        "destroy": "none",
        "startValue": "random",
        "minimumValue": 0.1
      }
    },
    "reduceDuplicates": false,
    "shadow": {
      "blur": 0,
      "color": {
        "value": "#000"
      },
      "enable": false,
      "offset": {
        "x": 0,
        "y": 0
      }
    },
    "shape": {
      "options": {},
      "type": "circle"
    },
    "size": {
      "random": {
        "enable": true,
        "minimumValue": 1
      },
      "value": {
        "min": 1,
        "max": 5
      },
      "animation": {
        "count": 0,
        "enable": false,
        "speed": 40,
        "decay": 0,
        "sync": false,
        "destroy": "none",
        "startValue": "random",
        "minimumValue": 0.1
      }
    },
    "stroke": {
      "width": 0
    },
    "zIndex": {
      "random": {
        "enable": false,
        "minimumValue": 0
      },
      "value": 0,
      "opacityRate": 1,
      "sizeRate": 1,
      "velocityRate": 1
    },
    "life": {
      "count": 0,
      "delay": {
        "random": {
          "enable": false,
          "minimumValue": 0
        },
        "value": 0,
        "sync": false
      },
      "duration": {
        "random": {
          "enable": false,
          "minimumValue": 0.0001
        },
        "value": 0,
        "sync": false
      }
    },
    "rotate": {
      "random": {
        "enable": false,
        "minimumValue": 0
      },
      "value": 0,
      "animation": {
        "enable": false,
        "speed": 0,
        "decay": 0,
        "sync": false
      },
      "direction": "clockwise",
      "path": false
    },
    "destroy": {
      "bounds": {},
      "mode": "none",
      "split": {
        "count": 1,
        "factor": {
          "random": {
            "enable": false,
            "minimumValue": 0
          },
          "value": 3
        },
        "rate": {
          "random": {
            "enable": false,
            "minimumValue": 0
          },
          "value": {
            "min": 4,
            "max": 9
          }
        },
        "sizeOffset": true,
        "particles": {}
      }
    },
    "roll": {
      "darken": {
        "enable": false,
        "value": 0
      },
      "enable": false,
      "enlighten": {
        "enable": false,
        "value": 0
      },
      "mode": "vertical",
      "speed": 25
    },
    "tilt": {
      "random": {
        "enable": false,
        "minimumValue": 0
      },
      "value": 0,
      "animation": {
        "enable": false,
        "speed": 0,
        "decay": 0,
        "sync": false
      },
      "direction": "clockwise",
      "enable": false
    },
    "twinkle": {
      "lines": {
        "enable": false,
        "frequency": 0.05,
        "opacity": 1
      },
      "particles": {
        "enable": false,
        "frequency": 0.05,
        "opacity": 1
      }
    },
    "wobble": {
      "distance": 5,
      "enable": false,
      "speed": {
        "angle": 50,
        "move": 10
      }
    },
    "orbit": {
      "animation": {
        "count": 0,
        "enable": false,
        "speed": 1,
        "decay": 0,
        "sync": false
      },
      "enable": false,
      "opacity": 1,
      "rotation": {
        "random": {
          "enable": false,
          "minimumValue": 0
        },
        "value": 45
      },
      "width": 1
    },
    "links": {
      "blink": false,
      "color": {
        "value": "#ffffff"
      },
      "consent": false,
      "distance": 150,
      "enable": false,
      "frequency": 1,
      "opacity": 0.4,
      "shadow": {
        "blur": 5,
        "color": {
          "value": "#000"
        },
        "enable": false
      },
      "triangles": {
        "enable": false,
        "frequency": 1
      },
      "width": 1,
      "warp": false
    },
    "repulse": {
      "random": {
        "enable": false,
        "minimumValue": 0
      },
      "value": 0,
      "enabled": false,
      "distance": 1,
      "duration": 1,
      "factor": 1,
      "speed": 1
    }
  },
  "pauseOnBlur": true,
  "pauseOnOutsideViewport": true,
  "responsive": [],
  "smooth": false,
  "style": {},
  "themes": [],
  "zLayers": 100
}

tsParticles.load("tsparticles", config)
// tsParticles.load("tsparticles", {
//   particles: {
//     // background: {
//     //   color: "#000 !important"
//     // },
//     interactivity: {
//       events: {
//         onClick: {
//           enable: true,
//           mode: "push"
//         }
//       }
//     },
//     opacity: {
//       value: { min: 0.5, max: 1 }
//     },
//     move: {
//       enable: true,
//       speed: { min: 1, max: 3 }
//     }
//   }
// });


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
    var timer = 17;
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

