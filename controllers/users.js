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
    getSingleUserId(req, res) {
        User.findOne({ _id: req.params.id })
            .populate('friends')
            .populate('thoughts')
            .populate('reactions')
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong id' });
                }
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // get user by name
    getSingleUserName(req, res) {
        User.findOne({ name: req.params.name })
            .populate('friends')
            .populate('thoughts')
            .populate('reactions')
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong name' });
                }
                res.json(data);
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
                res.json(data);
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err);
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
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong id' });
                }

                Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
                Reaction.deleteMany({ _id: { $in: dbUserData.reactions } });
            })
            .then(() => {
                res.json({ message: 'User deleted' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete user by name
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.name })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong name' });
                }

                Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
                Reaction.deleteMany({ _id: { $in: dbUserData.reactions } });
            })
            .then(() => {
                res.json({ message: 'User deleted' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
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
