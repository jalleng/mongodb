'use strict';

require('angular/angular');

var notesApp = angular.module('notesApp', []);

notesApp.controller('notesController', ['$scope', function($scope) {
  $scope.greeting = 'hello world';
}]);

notesApp.controller('anotherController', ['$scope', function($scope) {
  //$scope.greeting = '';
}]);

