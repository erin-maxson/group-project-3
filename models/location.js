
const { Schema, model } = require('mongoose');

const locationSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            min:3,
            max: 20,

        },
        title: {
            type: String,
            required: true,
            min: 2

        },
        description: {
            type: String,
            required: true,
            min: 4
        },
        rating: {
            type: Number,
            require: true,
            min: 0,
            max: 5
        },
        latitude: {
            type: Number,
            require: true
        },
        longitude: {
            type: Number,
            require: true
        }
    }
)



const Location = model('location', locationSchema);

module.exports = Location;