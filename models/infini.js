const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Infini = new Schema({
    tag: {
        type: String,
        require: [true, 'Tag is required']
    },
    content: {
        type: String,
        require: [true, 'Content is required']
    }
});
module.exports = mongoose.model('Infini', Infini);