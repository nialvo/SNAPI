const { Schema, model } = require('mongoose');
import dateFormat from "dateformat";

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
    username: {
      type: String,
      required: true
    },
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
    reactionNum: {
        type: Number,
        default: 0
    },
    
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;