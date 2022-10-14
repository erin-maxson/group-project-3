const { Schema, model } = require('mongoose');

const locationSchema = require('./location')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            min:3,
            max: 20,

        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        savedLocation: [
            locationSchema
        ]
    }
)

const User = model('user', userSchema);

module.exports = User;

