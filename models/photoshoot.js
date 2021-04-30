const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Photoshoot = new Schema({
    url: {
        type: String,
        require: [true, 'Url is required']
    },
    code: {
        type: String,
        require: [true, 'Code is required']
    },
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    client: {
        type: String,
        require: [true, 'Client is required']
    },
    date: {
        type: String,
        require: [true, 'Date is required']
    },
    images: {
        type: String,
        require: [true, 'Images are required']
    },
    style: {
        type: String,
        require: [true, 'Style is required']
    },
    description: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Photoshoot', Photoshoot);