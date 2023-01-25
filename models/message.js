const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    userID: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, minLength: 2, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true },
})

module.exports = mongoose.model("messages", Message);