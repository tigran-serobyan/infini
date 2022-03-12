const fs = require('fs-extra');
var json = JSON.parse(fs.readFileSync('./decorations.json').toString('utf-8'));

function findDecorations() {
    return json;
}

function findDecoration(url) {
    for (let i in json) {
        if (json[i].url == url) {
            return json[i];
        }
    }
}
function findDecorationByID(id) {
    for (let i in json) {
        if (json[i]._id == id) {
            return json[i];
        }
    }
}

function addDecoration(obj) {
    obj._id = json.length ? json.sort(function (a, b) { return a._id - b._id })[json.length - 1]._id - 0 + 1 : 1;
    json.push(obj)
    return updateDecorationsJson();
}

function updateDecoration(id, obj) {
    for (let i in json) {
        if (json[i]._id == id) {
            json[i] = obj;
            break;
        }
    }
    return updateDecorationsJson();
}

function deleteDecoration(id) {
    for (let i in json) {
        if (json[i]._id == id) {
            json.splice(i, 1);
            break;
        }
    }
    return updateDecorationsJson();
}

module.exports = { findDecorations, findDecoration, findDecorationByID, addDecoration, updateDecoration, deleteDecoration }

function updateDecorationsJson() {
    return fs.writeFile('decorations.json', JSON.stringify(json), function (data, err) {
        return err ? err : data
    });
}