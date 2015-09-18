'use strict';

var Word = require(__dirname + '/../models/word');
var Language = require(__dirname + '/../models/language');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var wordsRoute = module.exports = exports = express.Router();

wordsRoute.post('/languages', jsonParser, function(req, res) {
  var newLanguage = new Language(req.body);
  newLanguage.save(function(err,data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

wordsRoute.get('/words', function(req, res) {
  Word.find({}, function(err, data) {
    if (err) return handleError(err, res);
    res.json(data);
  });
});

wordsRoute.post('/words', jsonParser, eatAuth, function(req, res) {
  var newWord = new Word(req.body);
  newWord.author = req.user.username;
  newWord.save(function(err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

wordsRoute.put('/words/:id', jsonParser, eatAuth,  function(req, res) {
  var newWordBody = req.body;
  delete newWordBody._id;
  Word.update({_id: req.params.id}, newWordBody, function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});

wordsRoute.delete('/words/:id',jsonParser, eatAuth, function(req, res) {
  Word.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});
