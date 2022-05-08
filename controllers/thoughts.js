const { Thought, User } = require('../models');

const thoughts = {

    // get list of thoughts
    getThoughts(req, res) {
        Thought.find()
            .populate('author','name')
            .populate({
                path:'reactions',
                select: 'content',
                populate:{
                    path: 'author',
                    select: 'name'
                }
            })
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
            .populate({
                path:'reactions',
                select: 'content',
                populate:{
                    path: 'author',
                    select: 'name'
                }
            })
            .populate('author', 'name')
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
                
                return User.findOneAndUpdate(//add reference and increment count
                            { _id: req.body.author },
                            { $push: { thoughts: data._id }, $inc: { thoughtNum: 1 } },
                            { new: true }
                        ).then(()=>{
                    res.status(200).json(data);
                })                
                   
                
            }).catch((err) => {
                console.log(err);
                res.status(501).json(err);
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
                
                User.findOneAndUpdate(//remove reference and decrement count
                    { _id: data.author },
                    { $pull: { thoughts: req.params.id }, $inc: { thoughtNum: -1 } }
                    ).then(()=>{res.status(200).json({ message: 'Thought deleted' })});

            }).catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }


};

module.exports = thoughts;
