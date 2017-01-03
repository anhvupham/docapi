/**
 * Route.js
 *
 * @description :: Model for api route
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    path: {
      type: 'string',
      required: true
    },
    method: {
      type: 'string',
      required: true
    },
    requestHeader: {
      type: 'string',
      required: true
    },
    requestBody: {
      type: 'string',
      required: true
    },
    responseSuccessHeader: {
      type: 'string',
      required: true
    },
    responseSuccessBody: {
      type: 'string',
      required: true
    },
    responseFailHeader: {
      type: 'string',
      required: true,
    },
    responseFailBody: {
      type: 'string',
      required: true
    },
    project: {
      model: 'project'
    }
  }
};
