"use strict";

var dispositionInputEN = document.getElementById('dispositionInputEN');
var dispositionDivEN = document.getElementById('dispositionEN');
var dispositionLibraryMainEN = document.getElementById('dispositionLibraryMainEN');
var activeImage = '';
var bodiesEN = [];

function choseImageForBlockEN(event) {
  activeImage = event;
  dispositionLibraryMainEN.style.display = 'block';
  showBlockImagesEN();
}

function showBlockImagesEN() {
  axios.get(HOME_URL + 'images/').then(function (response) {
    var nodes = dispositionLibraryMainEN.childNodes;
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
          image.setAttribute('src', HOME_URL + 'images/' + url);
          image.setAttribute('onclick', 'selectBlockImageEN("' + url + '", this)');
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

function selectBlockImageEN(url, event) {
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
  activeImage.setAttribute('src', HOME_URL + 'images/' + url);
  activeImage.setAttribute('id', url);
}

function closeDispositionLibraryEN() {
  dispositionLibraryMainEN.style.display = 'none';
  activeImage = '';
}

function addAboutEN() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var div = document.createElement('div');
  div.setAttribute('class', 'aboutBlock');
  var id = 'body' + Math.round(Math.random() * 100000);
  div.setAttribute('id', id);
  div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Title"><img src="' + HOME_URL + 'images/' + image + '" id="' + image + '" onclick="choseImageForBlockEN(this)"><div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
  dispositionDivEN.appendChild(div);
  var body_ = new Quill('#' + id + '_', {
    theme: 'snow',
    modules: {
      toolbar: [[{
        'size': ['small', false, 'large', 'huge']
      }], [{
        'header': [1, 2, 3, 4, 5, 6, false]
      }], [{
        'font': []
      }], ['bold', 'italic', 'underline', 'strike'], [{
        'script': 'sub'
      }, {
        'script': 'super'
      }], [{
        'indent': '-1'
      }, {
        'indent': '+1'
      }], [{
        'list': 'ordered'
      }, {
        'list': 'bullet'
      }], ['blockquote', 'code-block'], [{
        'color': []
      }, {
        'background': []
      }], [{
        'align': []
      }], ['link'], ['clean']]
    }
  });
  bodiesEN.push(body_);
}

function addContactEN() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var div = document.createElement('div');
  div.setAttribute('class', 'contactBlock');
  var id = 'body' + Math.round(Math.random() * 100000);
  div.setAttribute('id', id);
  div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Title"><input type="text" class="map" value="' + map + '" placeholder="Google map url"><div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
  dispositionDivEN.appendChild(div);
  var body_ = new Quill('#' + id + '_', {
    theme: 'snow',
    modules: {
      toolbar: [[{
        'size': ['small', false, 'large', 'huge']
      }], [{
        'header': [1, 2, 3, 4, 5, 6, false]
      }], [{
        'font': []
      }], ['bold', 'italic', 'underline', 'strike'], [{
        'script': 'sub'
      }, {
        'script': 'super'
      }], [{
        'indent': '-1'
      }, {
        'indent': '+1'
      }], [{
        'list': 'ordered'
      }, {
        'list': 'bullet'
      }], ['blockquote', 'code-block'], [{
        'color': []
      }, {
        'background': []
      }], [{
        'align': []
      }], ['link'], ['clean']]
    }
  });
  bodiesEN.push(body_);
}

function addVerticalSplitEN() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var div = document.createElement('div');
  div.setAttribute('class', 'verticalSplitBlock');
  var id = 'body' + Math.round(Math.random() * 100000);
  div.setAttribute('id', id);
  div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Title"><img src="' + HOME_URL + 'images/' + image + '" id="' + image + '" onclick="choseImageForBlockEN(this)"><div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
  dispositionDivEN.appendChild(div);
  var body_ = new Quill('#' + id + '_', {
    theme: 'snow',
    modules: {
      toolbar: [[{
        'size': ['small', false, 'large', 'huge']
      }], [{
        'header': [1, 2, 3, 4, 5, 6, false]
      }], [{
        'font': []
      }], ['bold', 'italic', 'underline', 'strike'], [{
        'script': 'sub'
      }, {
        'script': 'super'
      }], [{
        'indent': '-1'
      }, {
        'indent': '+1'
      }], [{
        'list': 'ordered'
      }, {
        'list': 'bullet'
      }], ['blockquote', 'code-block'], [{
        'color': []
      }, {
        'background': []
      }], [{
        'align': []
      }], ['link'], ['clean']]
    }
  });
  bodiesEN.push(body_);
}

function addVerticalSplitFlippedEN() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var image = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var div = document.createElement('div');
  div.setAttribute('class', 'verticalSplitBlockFlipped');
  var id = 'body' + Math.round(Math.random() * 100000);
  div.setAttribute('id', id);
  div.innerHTML = '<input type="text" class="title" value="' + title + '" placeholder="Title"><div id="' + id + '_">' + body + '</div><img src="' + HOME_URL + 'images/' + image + '" id="' + image + '" onclick="choseImageForBlockEN(this)"><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
  dispositionDivEN.appendChild(div);
  var body_ = new Quill('#' + id + '_', {
    theme: 'snow',
    modules: {
      toolbar: [[{
        'size': ['small', false, 'large', 'huge']
      }], [{
        'header': [1, 2, 3, 4, 5, 6, false]
      }], [{
        'font': []
      }], ['bold', 'italic', 'underline', 'strike'], [{
        'script': 'sub'
      }, {
        'script': 'super'
      }], [{
        'indent': '-1'
      }, {
        'indent': '+1'
      }], [{
        'list': 'ordered'
      }, {
        'list': 'bullet'
      }], ['blockquote', 'code-block'], [{
        'color': []
      }, {
        'background': []
      }], [{
        'align': []
      }], ['link'], ['clean']]
    }
  });
  bodiesEN.push(body_);
}

function addColumnSplitEN() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var div = document.createElement('div');
  div.setAttribute('class', 'columnSplitBlock');
  div.innerHTML += '<input type="text" class="title" value="' + title + '" placeholder="Title"><p>Decorations (Orderd by status & recency)</p>';
  div.innerHTML += '<span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
  dispositionDivEN.appendChild(div);
}

function addGridViewEN() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var div = document.createElement('div');
  div.setAttribute('class', 'gridViewBlock');
  div.innerHTML += '<input type="text" class="title" value="' + title + '" placeholder="Title"><p>Works (Orderd by recency)</p>';
  div.innerHTML += '<span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
  dispositionDivEN.appendChild(div);
}

function addTextEN() {
  var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var div = document.createElement('div');
  div.setAttribute('class', 'textBlock');
  var id = 'body' + Math.round(Math.random() * 100000);
  div.setAttribute('id', id);
  div.innerHTML = '<div id="' + id + '_">' + body + '</div><span class="actions"><span class="button" onclick="divUp(this)">&uarr;</span><span class="button" onclick="divDown(this)">&darr;</span><span class="button" onclick="divDelete(this)">&#9003;</span></span>';
  dispositionDivEN.appendChild(div);
  var body_ = new Quill('#' + id + '_', {
    theme: 'snow',
    modules: {
      toolbar: [[{
        'size': ['small', false, 'large', 'huge']
      }], [{
        'header': [1, 2, 3, 4, 5, 6, false]
      }], [{
        'font': []
      }], ['bold', 'italic', 'underline', 'strike'], [{
        'script': 'sub'
      }, {
        'script': 'super'
      }], [{
        'indent': '-1'
      }, {
        'indent': '+1'
      }], [{
        'list': 'ordered'
      }, {
        'list': 'bullet'
      }], ['blockquote', 'code-block'], [{
        'color': []
      }, {
        'background': []
      }], [{
        'align': []
      }], ['link'], ['clean']]
    }
  });
  bodiesEN.push(body_);
}