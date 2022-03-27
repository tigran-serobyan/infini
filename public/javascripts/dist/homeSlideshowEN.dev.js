"use strict";

var slideInputEN = document.getElementById('slidesEN');
var slideTableEN = document.getElementById('tableSlidesEN');
var slideshowLibraryMainEN = document.getElementById('slideshowLibraryMainEN');

function addSlideEN() {
  var tr = document.createElement('tr');
  tr.innerHTML = '<td contenteditable></td><td contenteditable></td><td contenteditable></td><td><img src="" onclick="choseImageForSlideEN(this)"></td><td><span class="button" onclick="up(this)">&uarr;</span><span class="button" onclick="down(this)">&darr;</span><span class="button" onclick="delete_(this)">&#9003;</span></td>';
  slideTableEN.appendChild(tr);
}

function choseImageForSlideEN(event) {
  activeSlide = event;
  slideshowLibraryMainEN.style.display = 'block';
  showSlideshowImagesEN();
}

function showSlideshowImagesEN() {
  axios.get(HOME_URL + 'images/').then(function (response) {
    var nodes = slideshowLibraryMainEN.childNodes;
    var library;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;

        if (i.className == 'library') {
          library = i;
          break;
        }
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

    if (library) {
      library.innerHTML = '';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = response.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var url = _step2.value;
          var image = document.createElement('img');
          image.setAttribute('src', HOME_URL + 'lowres_images/' + url);
          image.setAttribute('onclick', 'selectSlideshowImageEN("' + url + '", this)');
          image.setAttribute('ondblclick', 'deleteImage("' + url + '", this)');
          library.appendChild(image);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } else {
      notification('Something went wrong', 400);
    }
  });
}

function selectSlideshowImageEN(url, event) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = event.parentElement.childNodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var s = _step3.value;
      s.className = "";
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  event.className = "chosen";
  activeSlide.setAttribute('src', HOME_URL + 'lowres_images/' + url);
  activeSlide.setAttribute('id', url);
}

function closeSlideshowLibraryEN() {
  slideshowLibraryMainEN.style.display = 'none';
  activeSlide = '';
}