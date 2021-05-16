const Photoshoot = require('../models/photoshoot');

function findPhotoshoots() {
    return Photoshoot.find();
}

function findPhotoshoot(code) {
    return Photoshoot.findOne({ code });
}
function findPhotoshootByID(id) {
    return Photoshoot.findOne({ _id: id });
}

function addPhotoshoot(obj) {
    let newPhotoshoot = new Photoshoot(obj);
    return newPhotoshoot.save();
}

function updatePhotoshoot(id, obj) {
    return Photoshoot.updateOne({ _id: id }, { $set: obj });
}

function deletePhotoshoot(id) {
    return Photoshoot.deleteOne({_id: id});
}

module.exports = { findPhotoshoots, findPhotoshoot, findPhotoshootByID, addPhotoshoot, updatePhotoshoot, deletePhotoshoot }