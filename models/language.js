'use strict';

var mongoose = require('mongoose');
var languageSchema = new mongoose.Schema({
  languageBody: String,
  languageRoot: {type: String, default: 'Latin'}
});

var Language = mongoose.model('Language', languageSchema);

Language.schema.path('languageRoot').validate(function (value) {
  return /latin|greek/i.test(value);
}, 'invalid languageRoot');

module.exports = Language;
