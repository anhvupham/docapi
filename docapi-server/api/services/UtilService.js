module.exports = {
  getHeaderToken: function(req) {
    var authentication = req.headers.authentication;
    console.log(authentication);
    if (!authentication) return "";
	  var token = authentication.split(" ")[1];
    return token;
  }
}
