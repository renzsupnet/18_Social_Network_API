const { Schema, Types } = require('mongoose');
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
      virtuals: true,
    },
  }
);

// Create a virtual property `reactionCount` that gets the length of Thoughts Array
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.thoughts.lenght}`;
  })

const Thought = model('thought', thoughtSchema);  

module.exports = Thought;
