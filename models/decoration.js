const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Decoration = new Schema({
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
    descriptionAM: {
        type: String,
        require: [true, 'Description is required']
    },
    descriptionEN: {
        type: String,
        require: [true, 'Description is required']
    },
    mainImage: {
        type: String,
        require: [true, 'Main image is required']
    },
    images: {
        type: String,
        require: [true, 'Images are required']
    },
    type: {
        type: String,
        require: [true, 'Type is required']
    },
    status: {
        type: String,
        require: [true, 'Status is required']
    },
    related: {
        type: String,
        require: [true, 'Related is required']
    }
});

module.exports = mongoose.model('Decoration', Decoration);