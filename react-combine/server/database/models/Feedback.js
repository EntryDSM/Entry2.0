const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Feedback = Schema({
    writer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    contents: { type: String, required: true},
    uploads: { type: Array },
}, {collection: 'Feedback'});

Feedback.statics.create = function (writer, title, contents, uploads) {
    return new this({
        writer,
        title,
        contents,
        uploads
    }).save();
}

module.exports = mongoose.model('Feedback', Feedback);