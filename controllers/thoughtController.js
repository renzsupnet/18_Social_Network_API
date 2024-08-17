const { Thought, User, Reaction } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // Push the created thought's _id to the associated user's thoughts array field
      const updateUser = await User.updateOne({ _id: req.body.userId}, { $push: { thoughts: thought._id } });
      res.status(201).json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      res.status(200).json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {

      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body} },
        { runValidators: true, new: true }
      );

      if (!thought){
        return res.status(404).json({ message: 'No such thought exists' });
      }

      res.status(201).json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: {reactionId : req.params.reactionId}} },
        { runValidators: true, new: true}
      )

      if (!thought){
        return res.status(404).json({ message: 'No such user exists' });
      }

      res.status(200).json({ message: 'Reaction successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }
};
