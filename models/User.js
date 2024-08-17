const { Schema, model } = require('mongoose');
const validator = require('validator');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: input => `${input} is not a valid email address!`
      }
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

// Create a virtual property `friendCount` that gets the length of Friends Array
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  });


const User = model('User', userSchema);

module.exports = User;
