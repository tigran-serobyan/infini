"use strict";

var fs = require('fs-extra');

var json = JSON.parse(fs.readFileSync('./loginInfo.json').toString('utf-8'));

function haveAccess(cookie) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = json.accessList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      if (i == cookie) {
        return true;
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

  return false;
}

function changeUsername(cookie, username, password, newUsername) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = json.accessList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var i = _step2.value;

      if (i == cookie) {
        if (username == json.username && password == json.password) {
          json.accessList = [];
          json.accessList.push(cookie);
          json.username = newUsername;
          return updateLoginInfoJson();
        }

        return 'false';
      }
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

  return 'false';
}

function changePassword(cookie, username, password, newPassword) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = json.accessList[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var i = _step3.value;

      if (i == cookie) {
        if (username == json.username && password == json.password) {
          json.accessList = [];
          json.accessList.push(cookie);
          json.password = newPassword;
          return updateLoginInfoJson();
        }

        return 'false';
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

  return 'false';
}

function newAccess(username, password) {
  if (username == json.username && password == json.password) {
    var access = new Date().getTime();
    json.accessList.push(access);
    updateLoginInfoJson();
    return access;
  } else {
    return 'wuop';
  }
}

module.exports = {
  haveAccess: haveAccess,
  newAccess: newAccess,
  changeUsername: changeUsername,
  changePassword: changePassword
};

function updateLoginInfoJson() {
  return fs.writeFile('loginInfo.json', JSON.stringify(json), function (data, err) {
    return err ? err : data;
  });
}