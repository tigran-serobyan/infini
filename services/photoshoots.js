const fs = require('fs-extra');
var json = JSON.parse(fs.readFileSync('./photoshoots.json').toString('utf-8'));

function findPhotoshoots() {
    return json;
}

function findPhotoshoot(code) {
    for (let i in json) {
        if (json[i].code == code) {
            return json[i];
        }
    }
}
function findPhotoshootByID(id) {
    for (let i in json) {
        if (json[i]._id == id) {
            return json[i];
        }
    }
}

function addPhotoshoot(obj) {
    obj.code = obj.code.toLocaleLowerCase().replace(/ /g, "");
    obj._id = json.length ? json.sort(function (a, b) { return a._id - b._id })[json.length - 1]._id - 0 + 1 : 1;
    json.push(obj);
    return updatePhotoshootsJson();
}

function updatePhotoshoot(id, obj) {
    obj.code = obj.code.toLocaleLowerCase().replace(/ /g, "");
    for (let i in json) {
        if (json[i]._id == id) {
            json[i] = obj;
            break;
        }
    }
    return updatePhotoshootsJson();
}

function deletePhotoshoot(id) {
    for (let i in json) {
        if (json[i]._id == id) {
            json.splice(i, 1);
            break;
        }
    }
    return updatePhotoshootsJson();
}

module.exports = { findPhotoshoots, findPhotoshoot, findPhotoshootByID, addPhotoshoot, updatePhotoshoot, deletePhotoshoot }

function updatePhotoshootsJson() {
    return fs.writeFile('photoshoots.json', JSON.stringify(json), function (data, err) {
        return err ? err : data
    });
}