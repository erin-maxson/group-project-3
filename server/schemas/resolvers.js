

Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if(!user) {
            throw new AuthenticationError('No user found with this email address');
        }

        const correctPw = await user.isCorrectPassword(password);
    },
}