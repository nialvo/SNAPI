const { Thought, User, Reaction } = require('../models');

const reactions = {

    // add a reaction
    newReaction(req, res) {
        datum = {//create object to store data across functions
            a:{},
            m:"Reaction added"//message
        };
        Reaction.create(req.body)//create reaction
            .then((data) => {
                datum.a=data;//save reaction (for id)

                return User.findOneAndUpdate(//add reaction reference to user and increment reaction count
                    { _id: req.body.author },
                    { $push: { reactions: data._id }, $inc: { reactionNum: 1 } },
                ).then((d)=>{
                    if(!d)datum.m = datum.m + ", no user associated";//else add notification that reaction has no known author
                })
            }).then(() => {
                  
                return Thought.findOneAndUpdate(//add reaction reference to thought and increment reaction count
                    { _id: req.body.thought },
                    { $push: { reactions: datum.a._id }, $inc: { reactionNum: 1} },
                ).then((d)=>{
                    if(!d)datum.m = datum.m + ", no thought associated";//else add notification that reaction has no known thought
                })
                    
                
            }).then(() => {//return message
                datum.m = datum.m + ".";
                return res.status(404).json({ message: datum.m });
               
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


    // remove reaction 
    deleteReaction(req, res) {
        datum = {//create object to store data across functions
            a:"",
            m: "Reaction deleted"//message
        };
        
        Reaction.findOneAndDelete({ _id: req.params.reactionId })//delete reaction
        .then((data) => {
            datum.a=data;//save deleted reaction (for id)

            return User.findOneAndUpdate(//remove reference from user and decrement
                { _id: data.author },
                { $pull: { reactions: data._id }, $inc: { reactionNum: -1 } },
            ).then((d)=>{
                if(!d)datum.m = datum.m + ", no user associated";
            })
        }).then(() => {
              
            return Thought.findOneAndUpdate(//remove reference from thought and decrement
                { _id: datum.a.thought },
                { $pull: { reactions: datum.a._id }, $inc: { reactionNum: -1} },
            ).then((d)=>{
                if(!d)datum.m = datum.m + ", no thought associated";
            })
                
            
        }).then(() => {//return message
            datum.m = datum.m + ".";
            return res.status(404).json({ message: datum.m });
           
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}
            
            
            
            

module.exports = reactions;