/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    }
  },

  signup: function (inputs, cb) {
    User.create({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      username: inputs.username,
      password: inputs.password
    })
    .exec(cb);
  },

  attemptLogin: function (inputs, cb) {
    User.findOne({
      username: inputs.username,
      password: inputs.password
    })
    .exec(cb);
  }
};
