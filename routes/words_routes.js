'use strict';

var Word = require(__dirname + '/../models/word');
var Language = require(__dirname + '/../models/language');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

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

wordsRoute.post('/words', jsonParser, function(req, res) {
  var newWord = new Word(req.body);
  newWord.save(function(err, data) {
    if (err) handleError(err, res);
    res.json(data);
  });
});

wordsRoute.put('/words/:id', jsonParser, function(req, res) {
  var newWordBody = req.body;
  Word.update({_id: req.params.id}, newWordBody, function(err, data) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});

wordsRoute.delete('/words/:id', function(req, res) {
  Word.remove({_id: req.params.id}, function(err) {
    if (err) return handleError(err, res);
    res.json({msg: 'success'});
  });
});
