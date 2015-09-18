'use strict'

var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var httpBasic = require(__dirname + '/../lib/http_basic');

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function(req, res) {
  var newUser = new User();
  console.log('/signup req.body', req.body)
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
    console.log('newUser', newUser)

  // console.log('username', res.body.username);
  newUser.generateHash(req.body.password, function(err, hash) {
    console.log('genhash err', err);
    console.log('genhash hash', hash);
    if (err) return res.send("hey")
    newUser.save(function(err, data) {
      console.log('save err', err);
      console.log('save data', data);
      if (err) return res.send("this broke")
      newUser.generateToken(function(err, token) {
        console.log('genToken', token)
        console.log('genToken err', err)
        if (err) return res.send("lulwat")
        res.json({token: token});
      });
    });
  });
});

usersRouter.get('/signin', httpBasic, function(req, res) {
  console.log('get /signin auth.username', req.auth.username);
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    console.log('get /signin findown basic user', user);
    if (err) return handleError(err, res);


    if (!user) {
      console.log('Meow1! Could not authenticat: ' + req.auth.username);
      return res.status(401).json({msg: 'Meow1! Could not authenticat!'});
    }

    user.compareHash(req.auth.password, function(err, hashRes) {
      if (err) return handleError(err, res);
      if (!hashRes) {
        console.log('Meow2! Could not authenticat: ' + req.auth.username);
        return res.status(401).json({msg: 'Meow2! Could not authenticat!'});
      }

      user.generateToken(function(err, token) {
        if (err) return handleError(err, res);
        res.json({token: token});
      });
    });
  });
});
