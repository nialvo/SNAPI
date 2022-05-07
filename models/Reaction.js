const { Schema, model } = require('mongoose');
const dateFormat = require ('../lib/dateformat.js');

const reactionSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            maxlength: 280
        },
        name: {
            type: String,
            required: true
        },
        date: {
            type: String,
            default: dateFormat()
        },
    },
    {
        versionKey: false
    }
);

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
