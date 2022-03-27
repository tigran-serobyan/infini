"use strict";

var activeImage = 0;
var maxCount = 0;
var xDown = null;
var yDown = null;

function openImage(event) {
  var save = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var like = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var slider = document.createElement('div');
  slider.setAttribute('class', 'imageSlider');
  slider.style.left = 0;
  var images = document.getElementsByClassName('sliderImages');
  maxCount = images.length;
  var left = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      var image = document.createElement('div');

      if (i == event) {
        activeImage = left;
        slider.style.left = -100 * left + 'vw';
        image.innerHTML = "<span style='background-image: url(" + i.style.backgroundImage.slice(5, -2) + ")' class='activeImage img'></span>";
      } else {
        image.innerHTML = "<span style='background-image: url(" + i.style.backgroundImage.slice(5, -2) + ")' class='img'></span>";
      }

      if (like) {
        image.innerHTML += "<span onclick='chooseImage_(this, \"" + i.id + "\")' class='" + i.nextElementSibling.className + "'></span>";
      }

      if (save) {
        image.innerHTML += "<a href='/images/" + i.id + "' download class='downloadImage'></a>";
      }

      left++;
      image.setAttribute('ontouchstart', 'handleTouchStart(event)');
      image.setAttribute('ontouchmove', 'handleTouchMove(event)');
      slider.appendChild(image);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  document.getElementsByTagName('body')[0].appendChild(slider);
  document.getElementsByTagName('body')[0].innerHTML += '<span class="leftArrow" onclick="slideLeft()"></span><span class="rightArrow" onclick="slideRight()"></span> <span class="closeSlider" onclick="closeSlider()"></span>';

  if (activeImage == 0) {
    document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow disabled');
  } else {
    document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow');
  }

  if (activeImage == maxCount - 1) {
    document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow disabled');
  } else {
    document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow');
  }
}

function slideLeft() {
  var slider = document.getElementsByClassName('imageSlider')[0];

  if (activeImage > 0) {
    activeImage--;
    slider.style.left = -100 * activeImage + 'vw';
  }

  if (activeImage == 0) {
    document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow disabled');
  } else {
    document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow');
  }

  if (activeImage == maxCount - 1) {
    document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow disabled');
  } else {
    document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow');
  }
}

function slideRight() {
  var slider = document.getElementsByClassName('imageSlider')[0];

  if (activeImage < maxCount - 1) {
    activeImage++;
    slider.style.left = -100 * activeImage + 'vw';
  }

  if (activeImage == 0) {
    document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow disabled');
  } else {
    document.getElementsByClassName('leftArrow')[0].setAttribute('class', 'leftArrow');
  }

  if (activeImage == maxCount - 1) {
    document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow disabled');
  } else {
    document.getElementsByClassName('rightArrow')[0].setAttribute('class', 'rightArrow');
  }
}

function getTouches(evt) {
  return evt.touches[0];
}

function handleTouchStart(evt) {
  var firstTouch = getTouches(evt);
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

;

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = getTouches(evt).clientX;
  var yUp = getTouches(evt).clientY;
  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      slideRight();
    } else {
      slideLeft();
    }
  }

  xDown = null;
  yDown = null;
}

;

function closeSlider() {
  document.getElementsByClassName('leftArrow')[0].remove();
  document.getElementsByClassName('rightArrow')[0].remove();
  document.getElementsByClassName('closeSlider')[0].remove();
  document.getElementsByClassName('imageSlider')[0].remove();
  activeImage = 0;
  maxCount = 0;
  xDown = null;
  yDown = null;
}