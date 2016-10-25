var options = require('../config/options');
var nodeStatic = require('node-static'); // Why do we use this
var path = require('path');
var fileServer = new nodeStatic.Server(options.publicDir, options.nodeStatic); //  a static file server which serves provided as part of node 

var express = require('express');
var router = express.Router();

router.route('/images/:name')
.get( function(req, res) {
  
  console.log('You requested image ' + req.params.name + req.url);
  fileServer.serve(req, res);
  // res.send('You requested image ', req.params.name);
}); 

module.exports.router = router;