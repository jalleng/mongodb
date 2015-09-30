'use strict';

module.exports = function(app) {
  app.controller('WordsController', ['$scope', '$http', function($scope, $http) {
    $scope.words = [];

    $scope.getAll = function() {
      $http.get('/api/words')
        .then(function(res) {
          $scope.words = res.data;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.createWord = function(word) {
      $http.post('/api/words', word)
        .then(function(res) {
          $scope.words.push(res.data);
          $scope.newWord = null;
        }, function(res) {
          console.log(res);
        });
    };

    $scope.beginUpdate = function(word) {
      word.old = word.wordBody;
      word.editing = true;
    };

    $scope.cancelUpdate = function(word) {
      word.wordBody = word.old;
    };

    $scope.saveWord = function(word) {
      word.status = 'pending';
      $http.put('/api/words/' + word._id, word)
        .then(function(res) {
          delete word.status;
          word.editing = false;
        }, function(res) {
          console.log(res);
          word.status = 'failed';
          word.editing = false;
        });
    };

    // $scope.undoUpdate = function(word) {
    //   word.editing = false;

    // }

    $scope.removeWord = function(word) {
      word.status = 'pending';
      $http.delete('/api/words/' + word._id)
        .then(function() {
          $scope.words.splice($scope.words.indexOf(word), 1);
        }, function(res) {
          word.status = 'failed';
          console.log(res);
        });
    };
  }]);
};
