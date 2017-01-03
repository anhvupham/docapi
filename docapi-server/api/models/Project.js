/**
 * Project.js
 *
 * @description :: Model for project
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    routes: {
      collection: 'route',
      via: 'project'
    }
  }
};
