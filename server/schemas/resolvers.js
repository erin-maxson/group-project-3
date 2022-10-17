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
        savedLocations: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Location.find(params).sort({ createdAt: -1 })
        },
        locations: async () => {
            return Location.find()
        },
        location: async (parent, { locationId }) => {
            return Location.findOne({ _id: locationId })
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

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            const token = signToken(user);

            return { token, user };
        },
        saveLocation: async (parent, { location }, context) => {
            if (!context.user) {

                throw new AuthenticationError('You need to be logged in!')

            }
            console.log(location);

            const savedLocation = await Location.create(
                location
            );
            

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedLocations: savedLocation._id } },
                {new: true, runValidators: true}
            ).populate('savedLocations')
            return updatedUser

        },

        updateLocation: async () => {
            const updatedLocation = await Location.findOneAndUpdate(
                {_id: location._id},
                {$push: {location: args.updateLocation}},
                {new: true, runValidators: true}
            )
            return location
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
