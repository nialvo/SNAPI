const { User, Thought, Reaction } = require('../models');

const users = {
    // get list of users
    getUsers(req, res) {
        User.find()
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // get user by ID
    getUserId(req, res) {
        User.findOne({ _id: req.params.id })
            .populate('friends','name thoughts reactions friends')
            .populate('thoughts', 'content reactions')
            .populate('reactions','content')
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong id' });
                }

                
                let y = {
                    _id:data._id, name:data.name, email:data.email,
                    thoughtNum:data.thoughtNum, reactionNum:data.reactionNum, friendNum:data.friendNum,
                    thoughts:data.thoughts, reactions:data.reactions,
                    friends:data.friends.map((b)=>{
                        let z={_id:b._id, name:b.name};
                        return z;
                    })
                }
                


                res.json(y);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    
   

    // new user
    newUser(req, res) {
        User.create(req.body)
            .then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
                res.status(500).json({message:"use a different username or email"});
            });
    },

    // update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
            )
            .then((data) => {
            if (!data) return res.status(404).json({ message: 'Wrong id' });
            res.json(data);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // delete user by ID
    deleteUserId(req, res) {
        let datum ={a:""};//create object to store user data
        
        User.findOneAndDelete({ _id: req.params.id })//delete user
            .then((data) => {
                datum.a=data;
                if (!data) {
                    return res.status(404).json({ message: 'Wrong id' });
                }
                
                if(datum.a) return Thought.deleteMany({ _id: { $in: datum.a.thoughts } });//delete user's thoughts
            })
            .then(() => {

                
                if(datum.a) return Reaction.deleteMany({ _id: { $in: datum.a.reactions } });//delete user's reactions
            })

            .then(() => {
                if(datum.a) res.json({ message: 'User deleted' });
            })
            .catch((err) => {
                console.log(err);
                if(datum.a) res.status(500).json(err);
            });
    },

    

    // add friend 
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $addToSet: { friends: req.params.friendId } }, 
            { new: true })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong user id' });
                }
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // remove friend 
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $pull: { friends: req.params.friendId } },
            { new: true })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong user id' });
                }
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

module.exports = users;
