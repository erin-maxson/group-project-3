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









        saveLocation: async (parent, args, context) => {
            if (!context.user) {

                throw new AuthenticationError('You need to be logged in!')

            }
            await User.findOneandUpdate(
                { _id: context.user._id },
                { $addToSet: { savedLocations: args.location } },
                {new: true, runValidators: true}
            )
            return location

        },

        updateLocation: async () => {
            await Location.findOneandUpdate(
                {_id: location._id},
                {$push: {location: args.updateLocation}},
                {new: true, runValidators: true}
            )
            return location
        }

    }


}

module.exports = resolvers;