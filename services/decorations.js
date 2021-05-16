const Decoration = require('../models/decoration');

function findDecorations() {
    return Decoration.find();
}

function findDecoration(url) {
    return Decoration.findOne({ url });
}
function findDecorationByID(id) {
    return Decoration.findOne({ _id: id });
}

function addDecoration(obj) {
    let newDecoration = new Decoration(obj);
    return newDecoration.save();
}

function updateDecoration(id, obj) {
    return Decoration.updateOne({ _id: id }, { $set: obj });
}

function deleteDecoration(id) {
    return Decoration.deleteOne({_id: id});
}

module.exports = { findDecorations, findDecoration, findDecorationByID, addDecoration, updateDecoration, deleteDecoration }