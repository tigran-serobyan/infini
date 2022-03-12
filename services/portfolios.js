const fs = require('fs-extra');
var json = JSON.parse(fs.readFileSync('./portfolios.json').toString('utf-8'));

function findPortfolios() {
    return json;
}

function findPortfolio(url) {
    for (let i in json) {
        if (json[i].url == url) {
            return json[i];
        }
    }
}
function findPortfolioByID(id) {
    for (let i in json) {
        if (json[i]._id == id) {
            return json[i];
        }
    }
}

function addPortfolio(obj) {
    obj._id = json.length ? json.sort(function (a, b) { return a._id - b._id })[json.length - 1]._id - 0 + 1 : 1;
    json.push(obj)
    return updatePortfoliosJson();
}

function updatePortfolio(id, obj) {
    for (let i in json) {
        if (json[i]._id == id) {
            json[i] = obj;
            break;
        }
    }
    return updatePortfoliosJson();
}

function deletePortfolio(id) {
    for (let i in json) {
        if (json[i]._id == id) {
            json.splice(i, 1);
            break;
        }
    }
    return updatePortfoliosJson();
}

module.exports = { findPortfolios, findPortfolio, findPortfolioByID, addPortfolio, updatePortfolio, deletePortfolio }

function updatePortfoliosJson() {
    return fs.writeFile('portfolios.json', JSON.stringify(json), function (data, err) {
        return err ? err : data
    });
}