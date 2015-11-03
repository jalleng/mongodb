'use strict';

var mongoose = require('mongoose');
var languageSchema = new mongoose.Schema({
  author: {type: String, default: 'Anonymous'},
  languageBody: String,
  languageRoot: {type: String, default: 'Latin'}
});

var Language = mongoose.model('Language', languageSchema);

Language.schema.path('languageRoot').validate(function (value) {
  return /latin|greek|germanic|celtic|indo|slavic/i.test(value);
}, 'invalid languageRoot');

module.exports = Language;
