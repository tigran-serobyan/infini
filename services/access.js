const fs = require('fs-extra');
var json = JSON.parse(fs.readFileSync('./loginInfo.json').toString('utf-8'));

function haveAccess(cookie) {
    for (let i of json.accessList) {
        if (i == cookie) {
            return true;
        }
    }
    return false;
}
function changeUsername(cookie, username, password, newUsername) {
    for (let i of json.accessList) {
        if (i == cookie) {
            if (username == json.username && password == json.password) {
                json.accessList = [];
                json.accessList.push(cookie);
                json.username = newUsername;
                return updateLoginInfoJson()
            }
            return 'false';
        }
    }
    return 'false';
}
function changePassword(cookie, username, password, newPassword) {
    for (let i of json.accessList) {
        if (i == cookie) {
            if (username == json.username && password == json.password) {
                json.accessList = [];
                json.accessList.push(cookie);
                json.password = newPassword;
                return updateLoginInfoJson()
            }
            return 'false';
        }
    }
    return 'false';
}
function newAccess(username, password) {
    if (username == json.username && password == json.password) {
        let access = (new Date()).getTime();
        json.accessList.push(access);
        updateLoginInfoJson();
        return access;
    } else {
        return 'wuop';
    }
}
module.exports = { haveAccess, newAccess, changeUsername, changePassword }

function updateLoginInfoJson() {
    return fs.writeFile('loginInfo.json', JSON.stringify(json), function (data, err) {
        return err ? err : data
    });
}