const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Photoshoot = new Schema({
    code: {
        type: String,
        require: [true, 'Code is required']
    },
    nameAM: {
        type: String,
        require: [true, 'Name is required']
    },
    nameEN: {
        type: String,
        require: [true, 'Name is required']
    },
    descriptionAM: {
        type: String,
        require: [true, 'Description is required']
    },
    descriptionEN: {
        type: String,
        require: [true, 'Description is required']
    },
    images: {
        type: String,
        require: [true, 'Images are required']
    },
    style: {
        type: String,
        require: [true, 'Style is required']
    },
    timer: {
        type: String,
        require: [true, 'Timer is required']
    }
});

module.exports = mongoose.model('Photoshoot', Photoshoot);