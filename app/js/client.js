'use strict';

require('angular/angular');

var wordsApp = angular.module('wordsApp', []);
require('./words/words')(wordsApp);




// notesApp.controller('notesController', ['$scope', function($scope) {
//   $scope.greeting = 'hello world';
// }]);


