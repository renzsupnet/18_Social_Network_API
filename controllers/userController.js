const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      res.status(200).json(users);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user with populated thoughts and friends data
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate('thoughts')
        .populate('friends')
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.status(200).json(user);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      res.status(200).json(user);

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Delete a user, associated thoughts are also deleted refer to model
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.status(200).json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )

      if (!user){
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.status(201).json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  },

  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId} },
        { runValidators: true, new: true}
      )

      if (!user){
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.status(200).json({ message: 'Friend successfully deleted' });

    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }
};
