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
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionNum').get(function() {
    return this.reactions.length;
});
  

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;