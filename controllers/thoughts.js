const { Thought, User } = require('../models');

const thoughts = {

    // get list of thoughts
    getThoughts(req, res) {
        Thought.find()
            .populate('author', 'name thoughts reactions friends')
            .populate('reactions')
            .sort('date')
            .then((data) => {
                
                let x = data.map((a)=>{
                    let y = {
                        thoughtID:a._id, content:a.content, date:a.date, 
                        authorID:a.author._id, authorName:a.author.name,
                        reactions: 
                            a.reactions.map((b)=>{
                                let z={reactionID:b._id, reaction:b.content}
                                return z;
                            }),
                        reactionCount:a.reactionNum
                    };
                    return y;
                });
                res.status(200).json(x);
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
                    select: 'name thoughts reactions friends'
                }
            })
            .populate('author', 'name thoughts reactions friends')
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Wrong id' });
                }
                let singleThought = {
                    id: data._id,
                    content: data.content,
                    date: data.date,
                    authorID: data.author.id,
                    authorName: data.author.name,
                    
                    reactions: data.reactions.map((a)=>{
                        let h = {id: a._id, content : a.content, authorID : a.author._id, authorName : a.author.name };
                        return h;
                    }),
                    reactionCount: data.reactionNum
                    
                }
                res.status(200).json(singleThought);
                //res.status(200).json({data});

                    



                
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
                
                return User.findOneAndUpdate(//add reference 
                            { _id: req.body.author },
                            { $push: { thoughts: data._id } },
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
                
                User.findOneAndUpdate(//remove reference 
                    { _id: data.author },
                    { $pull: { thoughts: req.params.id } }
                    ).then(()=>{res.status(200).json({ message: 'Thought deleted' })});

            }).catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }


};

module.exports = thoughts;
