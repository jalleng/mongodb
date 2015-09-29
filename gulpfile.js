'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');

gulp.task('webpack:dev', function() {
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('staticfiles:dev', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'))
});

gulp.task('watch', function() {
  return gulp.watch(['./app/js/client.js', './app/**/*.html'], ['build:dev']);
});

gulp.task('build:dev', ['staticfiles:dev', 'webpack:dev']);
gulp.task('default', ['build:dev']);



//var jshint = require('gulp-jshint');
//var gulpMocha = require('gulp-mocha');


// gulp.task('jshint', function() {
//   return gulp.src(['server.js', 'test/*.js', 'gulpfile.js',
//     'routes/*.js', 'models/*.js', 'lib/handle_error.js'])
//   .pipe(jshint())
//   .pipe(jshint.reporter('default'));
// });

// gulp.task('test', function() {
//   return gulp.src('test/**/*test.js')
//     .pipe(gulpMocha());
// });

//gulp.task('default', ['jshint', 'test']);
