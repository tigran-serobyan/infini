const Infini = require('../models/infini');
var accessList = ['a'];
var _username, _password;
Infini.findOne({ 'tag': 'username' }).then((username) => {
    _username = username.content;
});
Infini.findOne({ 'tag': 'password' }).then((password) => {
    _password = password.content;
});

function haveAccess(cookie) {
    for (let i of accessList) {
        if (i == cookie) {
            return true;
        }
    }
    return false;
}
function changeUsername(cookie, newUsername) {
    for (let i of accessList) {
        if (i == cookie) {
            accessList = [];
            accessList.push(cookie);
            return Infini.updateOne({ 'tag': 'username' }, { $set: { 'content': newUsername } });
        }
    }
    return false;
}
function changePassword(cookie, newPassword) {
    for (let i of accessList) {
        if (i == cookie) {
            accessList = [];
            accessList.push(cookie);
            return Infini.updateOne({ 'tag': 'password' }, { $set: { 'content': newPassword } });
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