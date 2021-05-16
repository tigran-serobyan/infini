const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Page = new Schema({
    url: {
        type: String,
        require: [true, 'URL is required']
    },
    nameAM: {
        type: String,
        require: [true, 'Name is required']
    },
    nameEN: {
        type: String,
        require: [true, 'Name is required']
    },
    bodyAM: {
        type: String,
        require: [true, 'Body is required']
    },
    bodyEN: {
        type: String,
        require: [true, 'Body is required']
    },
    image: {
        type: String,
        require: [true, 'Image is required']
    }
});

module.exports = mongoose.model('Page', Page);