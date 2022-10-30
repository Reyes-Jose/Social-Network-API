const { User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
        .select('-__v')
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res){
        User.findOne({ _id: req.params.userId })
        .populate('thought')
        .populate('friendData')
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID, try a different one.' })
                : res.json(err)
        )
        .catch((err) => res.status(500).json(err));
    },
    createNewUser(req, res){
        User.create(req.body)
            .then((userdb) => res.json(userdb))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new:true }
        )
        .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID, try a different one.' })
                : res.json(err)
        )
        .catch((err) => { 
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteUser(req, res){
        User.findOneAndDelete({ _id: req.params.userId})
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'No user with that ID, try a different one.'})
                    : Thought.deleteMany({ _id: { $in: user.applications }})
            )
            .then(() => res.json({ message: 'User and user thought has been deleted.'}))
            .catch((err) => res.status(500).json(err));                    
    },
};
