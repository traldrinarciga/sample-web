var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secKey = require('../secret-key');
var session = require('express-session');

module.exports = function(conn){
  router.get('/test', function(req, res){
      res.json({ message: 'index api working' });
  })
  .post('/login', function(req, res){
    var user = req.body.user;
    var sql = 'SELECT * FROM users where username = ? AND password = ?';
    var params = [user.username, user.password];
    conn.query(sql, params, function(err, rows) {
        if(err || rows.length == 0){
          res.json({
              success: false,
              message: 'No token for you!'
            });
        }else{
          var token = jwt.sign(user, secKey, {
              expiresIn : 60 * 60 * 24 // expires in 24 hours
          });
          req.session.token = token;
          res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
          });
        }
  	});
  })
  .post('/logout', function(req, res){
    req.session.token = null;
    res.json({
        success: true,
        message: 'logout'
    });
  })
  .post('/signup', function(req, res){
    var user = req.body.user;
    console.log(JSON.stringify(user));
    var sql = 'INSERT INTO users(username, password) values(?, ?)';
    var params = [user.username, user.password];
    conn.query(sql, params, function(err, rows) {
        if(err || rows.length == 0){
          res.json({
              success: false,
              message: err
            });
        }else{
          res.json({
              success: true,
              data: rows
          });
        }
  	});
  })
  .get('/testtoken', function(req, res){
    res.json({test: 'test'});
  });

  return router;
};
