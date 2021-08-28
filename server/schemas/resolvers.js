const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError} = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
      }
      throw new AuthenticationError("You need to log in.");
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const createdUser = User.create(args);
      const token = signToken(createdUser);
      return { createdUser, token };
    },

    saveBook: async (parent, { bookData }, context) => {
      if (context.User) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: { savedBooks: bookData },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
    },

    removeBook: async (parent, { userId, book }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        { $pull: { books: book } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
