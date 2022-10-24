const { model, Schema, Types } = require('mongoose');


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
    toJSON:{
        virtuals: true,
        getters: true,
    },
    id: false,
})

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const reactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectIdId,
        default: () => new Types.ObjectIdId(),
    },
    reactionBody: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    toJson: {
        getters: true,
    },
    id: false,
})

const Thought = model('thought', thoughtSchema);
module.exports = Thought;