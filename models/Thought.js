const { model, Schema, Types} = require('mongoose');
// const reactionSchema = require('./reaction');

const reactionSchema = new Schema({
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
    
)

const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        ref: 'User',
    },
    reactions: [reactionSchema],    
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})


const Thought = model('thought', thoughtSchema);
module.exports = Thought;