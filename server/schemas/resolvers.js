const { AuthenticationError } = require('apollo-server-express');
const { User, Location } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {

        users: async () => {
            return User.find().populate('savedLocations')
        },
        // user: async(parent, { username}) => {
        //     return User.findOne({username}).populate('savedLocations')
        // },
        locations: async (parent, {username}) => {
            const params = username ? {username} : {};
            return Location.find(params).sort({createdAt: -1}) //needs to be fixed since it is a map
        },
        location: async (parent, {locationId}) => {
            return Location.findOne({_id: locationId})
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('savedLocations');
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
    
            if(!user) {
                throw new AuthenticationError('No user found with this email address');
            }
    
            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            const signToken = signToken(user);

            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            const token = signToken(user);

            return { token, user };
        },
        removeLocation: async (parent, args, context) => {
            if(!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }
            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$pull: { savedLocations: { locationId: args.locationId }}},
                { new: true }
            );

            return updatedUser;
        }
    }
};

module.exports = resolvers;
