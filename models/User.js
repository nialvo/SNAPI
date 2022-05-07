const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Must match an email address!'],
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
        thoughtNum: {
            type: Number,
            default: 0
        },
        reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
        reactionNum: {
            type: Number,
            default: 0
        },
        friends: [{ type: Schema.Types.ObjectId, ref: 'User', }],
        friendNum: {
            type: Number,
            default: 0
        }
    }
    

);

const User = model('User', userSchema);

module.exports = User;
