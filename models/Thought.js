const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
      getters: true
    },
    id: false
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
