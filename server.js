var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/words_dev');
//process.env.APP_SECRET = process.env.APP_SECRET || 'safeword';
var wordsRouter = require(__dirname + '/routes/words_routes');
//var usersRouter = require(__dirname + '/routes/users_routes');
//app.use('/api', usersRouter);
app.use('/api', wordsRouter);
app.use(express.static(__dirname + '/build'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('server up on port: ' + port);
});
