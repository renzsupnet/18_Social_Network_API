const { Schema, Types } = require('mongoose');
// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlenght: 280
    },
    username: {
      type: String,
      ref: 'User',
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: timestamp => timestamp.toLocaleString()
    }
  },
  {
    toJSON: {
      getters: true
    },
    id: false
  }
);

module.exports = reactionSchema;
