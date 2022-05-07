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
            default: ""
        },
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
        reactionNum: {
            type: Number,
            default: 0
        },

    },
    
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;