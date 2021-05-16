const Page = require('../models/page');

function findPages() {
    return Page.find();
}

function findPage(url) {
    return Page.findOne({ url });
}
function findPageByID(id) {
    return Page.findOne({ _id: id });
}

function addPage(obj) {
    let newPage = new Page(obj);
    return newPage.save();
}

function updatePage(id, obj) {
    return Page.updateOne({ _id: id }, { $set: obj });
}

function deletePage(id) {
    return Page.deleteOne({_id: id});
}

module.exports = { findPages, findPage, findPageByID, addPage, updatePage, deletePage }