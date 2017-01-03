/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');

var passwordHandler = function(cb) {
	return function(req, res) {
		var password = Buffer.from(req.body.password, "base64").toString("base64");
		password = bcrypt.hashSync(req.body.password, sails.config.app.salt);
		if(cb) cb(req, res, password);
	}
}

module.exports = {
	_config: {
		actions: false,
	  rest: false,
	  shortcuts: false
	},

  login: passwordHandler(function (req, res, password) {
	  // Look up the user
	  User.attemptLogin({
	    username: req.body.username,
	    password: password
	  }, function (err, user) {
	    if (err) return res.negotiate(err);
	    if (!user) {
	      return res.badRequest('Invalid username/password combination.');
	    }

			var token = jwt.sign(req.body, sails.config.app.secret);
			req.session[token] = true;

	    return res.ok({token: token});
	  });
  }),

  logout: function (req, res) {
		var token = UtilService.getHeaderToken(req);
		req.session[token] = false;

    return res.ok('Logged out successfully!');
  },

  signup: passwordHandler(function (req, res, password) {
    User.signup({
			username: req.body.username,
			password: password,
			firstName: req.body.firstName,
			lastName: req.body.lastName
		}, function (err, user) {
      if (err) return res.negotiate(err);
			var token = jwt.sign({
				username: req.body.username,
				password: password,
			}, sails.config.app.secret);
			req.session[token] = true;
      return res.ok({
				message: 'Signup successful!',
				token: token
			});
    });
  })
};
