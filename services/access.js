const Infini = require('../models/infini');
var accessList = ['a'];
var _username, _password;
Infini.findOne({ 'tag': 'username' }).then((username) => {
    _username = username.content;
}).catch((error) => {
    console.log(error);
});
Infini.findOne({ 'tag': 'password' }).then((password) => {
    _password = password.content;
}).catch((error) => {
    console.log(error);
});

function haveAccess(cookie) {
    for (let i of accessList) {
        if (i == cookie) {
            return true;
        }
    }
    return false;
}
function changeUsername(cookie, username, password, newUsername) {
    for (let i of accessList) {
        if (i == cookie) {
            if (username == _username && password == _password) {
                accessList = [];
                accessList.push(cookie);
                _username = newUsername;
                return Infini.updateOne({ 'tag': 'username' }, { $set: { 'content': newUsername } });
            }
            return false;
        }
    }
    return false;
}
function changePassword(cookie, username, password, newPassword) {
    for (let i of accessList) {
        if (i == cookie) {
            if (username == _username && password == _password) {
                accessList = [];
                accessList.push(cookie);
                _password = newPassword;
                return Infini.updateOne({ 'tag': 'password' }, { $set: { 'content': newPassword } });
            }
            return false;
        }
    }
    return false;
}
function newAccess(username, password) {
    if (username == _username && password == _password) {
        let access = (new Date()).getTime();
        accessList.push(access);
        return access;
    } else {
        return 'wuop';
    }
}
module.exports = { haveAccess, newAccess, changeUsername, changePassword }