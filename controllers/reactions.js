const { Thought, User, Reaction } = require('../models');

const reactions = {

    // add a reaction
    newReaction(req, res) {
        let userX;
        let thoughtX;
        Reaction.create(req.body)
            .then((data) => {
                try {
                    User.findOneAndUpdate(
                        { _id: req.body.userId },
                        { $push: { reactions: data._id }, $inc: { reactionNum: 1 } },
                        { new: true }
                    ).then((userData) => {
                        return res.status(404).json({userData});
                        Reaction.findOneAndUpdate(
                            { _id: data._id },
                            { name: userData.name },
                        );

                    });
                    userX = 1;
                } catch {
                    userX = 2;//user not found

                } try {
                    Thought.findOneAndUpdate(
                        { _id: req.body.thoughtId },
                        { $push: { reactions: data._id }, $inc: { reactionNum: 1} },
                        { new: true }
                    );
                    thoughtX = 1;
                } catch {
                    thoughtX = 2;//thought not found
                }
            }).then(() => {
                if (userX == 2 && thoughtX == 2) {
                    return res.status(404).json({ message: 'Response created but neither user nor thought exist ' });
                } else if (userX == 2) {
                    return res.status(404).json({ message: 'Response created but user does not exist ' });
                } else if (thoughtX == 2) {
                    return res.status(404).json({ message: 'Response created but thought does not exist ' });
                }


                res.status(200).json({ message: 'Response added' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    // remove reaction 
    deleteReaction(req, res) {
        try {
            let m = "Reaction deleted";//message

            Reaction.findOneAndDelete({ _id: req.params.reactionId })
            .then((data) => {
                try {
                    User.findOneAndUpdate(//decrement reaction count and remove reaction id from user
                        { name: data.name },
                        { $pull: { reactions: req.params.reactionId }, $inc: { reactionNum: -1 } },  
                    );
                } catch { m = m + ", no user associated";//add notification if anonymous
                } try {
                    Thought.findOneAndUpdate(//decrement reaction count and remove id from thought
                        { _id: req.params.thoughtId },
                        {  $pull: { reactions: req.params.reactionId }, $inc: { reactionNum: -1} },
                    );
                
                } catch { m = m + ", no thought associated"//add notification if orphan
                }
            }).then(() => {
                
                m = m + ".";//complete message
                res.status(200).json({ message: m }); 
            })
        }catch{
            res.status(404).json({ message: 'Reaction does not exist' }); 
        }
    }
};

module.exports = reactions;