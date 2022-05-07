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
            default: "",
        },
        date: {
            type: String,
            default: dateFormat()
        },
    },
   
);

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
