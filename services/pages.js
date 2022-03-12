const fs = require('fs-extra');
var json = JSON.parse(fs.readFileSync('./pages.json').toString('utf-8'));

function findPages() {
    return json;
}

function findPage(url) {
    for (let i in json) {
        if (json[i].url == url) {
            return json[i];
        }
    }
}

function findPageByID(id) {
    for (let i in json) {
        if (json[i]._id == id) {
            return json[i];
        }
    }
}

function addPage(obj) {
    obj._id = json.length ? json.sort(function (a, b) { return a._id - b._id })[json.length - 1]._id - 0 + 1 : 1;
    json.push(obj)
    return updatePagesJson();
}

function updatePage(id, obj) {
    for (let i in json) {
        if (json[i]._id == id) {
            json[i] = obj;
            break;
        }
    }
    return updatePagesJson();
}

function deletePage(id) {
    for (let i in json) {
        if (json[i]._id == id) {
            json.splice(i, 1);
            break;
        }
    }
    return updatePagesJson();
}

module.exports = { findPages, findPage, findPageByID, addPage, updatePage, deletePage }

function updatePagesJson() {
    return fs.writeFile('pages.json', JSON.stringify(json), function (data, err) {
        return err ? err : data
    });
}