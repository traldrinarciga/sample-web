var express = require('express');
var router = express.Router();
var session = require('express-session')

router.get('/test', function(req, res){
    res.json({ message: 'index api working' });
});

router.route('/')
.get(function(req, res){
  if(req.session.token){
    res.render('about.html');
  }else{
    res.render('login.html');
  }
});

module.exports = router;
