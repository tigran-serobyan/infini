"use strict";

window.onload = closeLibrary;
var loadBar = document.getElementById('loadBar');

function saveFile(event) {
  var load = 0;
  loadBar.style.width = '0%';
  loadBar.style.display = 'block';
  var files = event.files;

  for (var i = 0; i < files.length; i++) {
    load += 40 / files.length;
    loadBar.style.width = load + '%';
    var formData = new FormData();
    var file = files[i];
    formData.append("image", file);
    axios.post(HOME_URL + 'admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function (response) {
      load += 60 / files.length;
      loadBar.style.width = load + '%';

      if (load >= 99.8) {
        setTimeout(function () {
          loadBar.style.display = 'none';
          loadBar.style.width = '0%';
        }, 1000);
      }

      showImages(event.parentElement.parentElement.parentElement);
    });
  }
}

function showImages(event) {
  axios.get(HOME_URL + 'images/').then(function (response) {
    var nodes = event.childNodes;
    var library;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var i = _step.value;

        if (i.className == 'libraryMain') {
          var main = i.childNodes;
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = main[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var j = _step3.value;

              if (j.className == 'library') {
                library = j;
                break;
              }
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
          var image = document.createElement('span');
          image.setAttribute('style', "background-image: url(" + HOME_URL + 'lowres_images/' + url + ");");
          image.setAttribute('onclick', 'selectImage("' + url + '",this)');
          image.setAttribute('ondblclick', 'deleteImage("' + url + '",this)');

          if (event.getElementsByClassName('chosenImage')[0].src == HOME_URL + 'images/' + url) {
            image.className = "chosen";
          }

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

function openLibrary(event) {
  event.parentElement.getElementsByClassName('libraryMain')[0].style.display = 'block';
  showImages(event.parentElement);
}

function closeLibrary() {
  var libraries = document.getElementsByClassName('libraryMain');
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = libraries[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var i = _step4.value;
      i.style.display = 'none';
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}

function selectImage(url, event) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = event.parentElement.childNodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var s = _step5.value;
      s.className = "";
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  event.className = "chosen";
  var nodes = event.parentElement.parentElement.parentElement.childNodes;
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = nodes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var i = _step6.value;

      if (i.className == 'chosenImage') {
        i.setAttribute('src', HOME_URL + 'images/' + url);
        i.setAttribute('id', url);
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }
}

function deleteImage(url, event) {
  var confirm = prompt('ՈՒզում եք ջնջե՞լ, ներմուծեք (y)').toLocaleLowerCase().replace(/ /g, "");

  if (confirm == 'y') {
    axios["delete"](HOME_URL + 'admin/deleteImage/' + url).then(function (response) {
      event.remove();
    });
  }
}