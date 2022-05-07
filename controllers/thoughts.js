const { Thought, User } = require('../models');

const thoughts = {

    // get list of thoughts
    getThoughts(req, res) {
        Thought.find()
            .populate('reactions')
            .sort('date')
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // get thought by id
    getThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate('reactions')
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong id' });
                }
                res.status(200).json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // new thought
    newThought(req, res) {
        Thought.create(req.body)
            .then((data) => {
                try {
                    User.findOneAndUpdate(
                        { _id: req.body.userId },
                        { $push: { thoughts: data._id }, $inc: { thoughtNum: 1 } },
                        { new: true }
                    ).then((userData) => {
                        Thought.findOneAndUpdate(
                            { _id: data._id },
                            { name: userData.name },
                        )
                    })
                } catch {
                    return res.status(200).json({ message: "Anonymous thought created" });
                }
                res.status(200).json(data);
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { runValidators: true, new: true })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong id' });
                }
                res.status(200).json(data);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.id })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong id' });
                }
                try {
                    User.findOneAndUpdate(//remove reference and decrement count
                        { name: data.name },
                        { $pull: { thoughts: req.params.id }, $inc: { thoughtNum: -1 } }
                    );
                } catch {
                    return res.status(200).json({ message: 'Anonymous thought deleted' });
                }
                res.status(200).json({ message: 'Thought deleted' });
            }).catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


};

module.exports = thoughts;
