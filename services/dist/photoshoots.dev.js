"use strict";

var fs = require('fs-extra');

var json = JSON.parse(fs.readFileSync('./photoshoots.json').toString('utf-8'));

function findPhotoshoots() {
  return json;
}

function findPhotoshoot(code) {
  for (var i in json) {
    if (json[i].code == code) {
      return json[i];
    }
  }
}

function findPhotoshootByID(id) {
  for (var i in json) {
    if (json[i]._id == id) {
      return json[i];
    }
  }
}

function addPhotoshoot(obj) {
  obj.code = obj.code.toLocaleLowerCase().replace(/ /g, "");
  obj._id = json.length ? json.sort(function (a, b) {
    return a._id - b._id;
  })[json.length - 1]._id - 0 + 1 : 1;
  json.push(obj);
  return updatePhotoshootsJson();
}

function updatePhotoshoot(id, obj) {
  obj.code = obj.code.toLocaleLowerCase().replace(/ /g, "");

  for (var i in json) {
    if (json[i]._id == id) {
      json[i] = obj;
      break;
    }
  }

  return updatePhotoshootsJson();
}

function deletePhotoshoot(id) {
  for (var i in json) {
    if (json[i]._id == id) {
      json.splice(i, 1);
      break;
    }
  }

  return updatePhotoshootsJson();
}

module.exports = {
  findPhotoshoots: findPhotoshoots,
  findPhotoshoot: findPhotoshoot,
  findPhotoshootByID: findPhotoshootByID,
  addPhotoshoot: addPhotoshoot,
  updatePhotoshoot: updatePhotoshoot,
  deletePhotoshoot: deletePhotoshoot
};

function updatePhotoshootsJson() {
  return fs.writeFile('photoshoots.json', JSON.stringify(json), function (data, err) {
    return err ? err : data;
  });
}