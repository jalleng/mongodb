'use strict';
module.exports = function(app) {
  require('./controllers/words_controller')(app);
};