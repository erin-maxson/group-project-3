const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const {locationSchema} = require('./Location')

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
            // REGEX to set rules for emails
            match: [/.+@.+\..+/, 'Must match an email address!'],
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        savedLocations:
         [locationSchema]
    }
);
// function to hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
// checking to see if it's correct password 
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const User = model('User', userSchema);

module.exports = User;