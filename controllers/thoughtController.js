const { User, Thought } = require('../models');



module.exports = {
    

    getAllThoughts(req, res){
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    
    createNewThought(req, res){
        Thought.create(req.body)
        .then((thought) => {
          return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
          );
        })
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'thought created, but found no user with that ID' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thoughtUpdate) => 
            !thoughtUpdate
                ? res.status(400).json({ message: 'No thought matches with this ID.'})
                :res.json(err)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteThought(req, res){
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No such thought exists' })
            : Thought.findOneAndUpdate(
                { thought: req.params.thoughtId },
                { $pull: { thought: req.params.thoughtId } },
                { new: true }
              )
        )
        .then((thought) =>
          !thought
            ? res.status(404).json({
                message: 'thought deleted',
              })
            : res.json({ message: 'Thought has been successfully deleted' })
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    createReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: body } },
            { runValidators: true, new: true},
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({
                    message: 'reaction not created',
                })
                : res.json({ message: 'Reaction has been created'})
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    deleteReaction(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId}}},
            { new: true },
        )
        .then((thought) => {
                !thought
                    ? res.status(404).json({
                        message: 'reaction not deleted'
                    })
                    : res.json({ message: 'Reaction has been deleted'})
            
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
        });
    }
}
                
                
    