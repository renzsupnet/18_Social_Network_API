const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const User = require('./User');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => timestamp.toLocaleString()
    },
    username: {
      type: String,
      ref: 'User',
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      id: false,
      virtuals: true,
      getters: true
    },
  }
);

// Create a virtual property `reactionCount` that gets the length of Reactions Array
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  })

const Thought = model('Thought', thoughtSchema);  

module.exports = Thought;
