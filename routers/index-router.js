var express = require('express');
var router = express.Router();

router.get('/test', function(req, res){
    res.json({ message: 'index api working' });
});

router.route('/')
.get(function(req, res){
  res.render('index.html');
});

module.exports = router;
