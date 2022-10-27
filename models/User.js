const { Schema, model } = require('mongoose');

//schema to create user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        }],
        friends: [{
            type: Schema.Type.ObjectId,
            ref: 'User',
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

//creating virtual to get the ammount of friends.
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

//Initializing User model.
const User = model('user', userSchema);


//exporting User
module.exports = User;