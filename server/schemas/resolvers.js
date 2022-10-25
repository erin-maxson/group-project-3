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

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
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
        saveLocation: async (parent, { username, title, description, rating, latitude, longitude }, context) => {
            if (!context.user) {

                throw new AuthenticationError('You need to be logged in!')

            }
            console.log(username, title, description, rating, latitude, longitude);


            const location = await Location.create({
                username,
                title,
                description,
                rating,
                latitude,
                longitude,
            }

            );


            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedLocations: location._id } },
                { new: true, runValidators: true }
            ).populate('savedLocations')

            return location

        },
        updateLocation: async (parent, { locationId, newLocation }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!')
            }

            const updatedLocation = await Location.findByIdAndUpdate(
                { _id: locationId },
                {
                    $set: {
                        title: newLocation.title,
                        description: newLocation.description,
                        rating: newLocation.rating,
                        latitude: newLocation.latitude,
                        longitude: newLocation.longitude
                    }
                },
                { new: true }
            )
            return updatedLocation
        },
        removeLocation: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in!');
            }

            const removedLocation = await Location.findOneAndDelete({
                _id: args.locationId
            })

            await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { locations: removedLocation._id } },

            );

            return removedLocation;
        }
    }
};

module.exports = resolvers;
