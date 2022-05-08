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
        reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
        friends: [{ type: Schema.Types.ObjectId, ref: 'User', }],   
    },
    {
        toJSON: {//display virtuals (defined below)
          virtuals: true,
        },
        id: false,//id is displayed by default, do not display again
    }
);



userSchema.virtual('thoughtNum').get(function () {
    return this.thoughts.length;
});

userSchema.virtual('reactionNum').get(function () {
    return this.reactions.length;
});

userSchema.virtual('friendNum').get(function () {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
