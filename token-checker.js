var jwt = require('jsonwebtoken');
var secKey = require('./secret-key');

module.exports = function(req, res, next){
  if(req.url.indexOf('/api/users/') != -1 || req.url.indexOf('api/') == -1){
  			next();
	}else{
			var token = req.body.token || req.query.token || req.headers['token'];
			jwt.verify(token, secKey, function(err, decode){
				if(err){
					res.json({
						message: err
					});
				}else{
					next();
				}
			});
	}
}
