'use strict';

var mongoose = require('mongoose');
var wordSchema = new mongoose.Schema({
  wordBody: String,
  language: {type: String, default: 'English'}
});

var Word = mongoose.model('Word', wordSchema);

Word.schema.path('language').validate(function (value) {
  return /english|spanish|italian|french/i.test(value);
}, 'invalid language');

module.exports = Word;
