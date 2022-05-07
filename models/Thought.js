const { Schema, model } = require('mongoose');
const dateFormat = require ('../lib/dateformat.js');

const thoughtSchema = new Schema(
    {
        content: {
            type: String,
            maxlength: 280
        },
        date: {
            type: String,
            default: dateFormat()
        },
        name: {
            type: String,
            required: true
        },
        reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
        reactionNum: {
            type: Number,
            default: 0
        },

    },
    {
        versionKey: false 
    }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;