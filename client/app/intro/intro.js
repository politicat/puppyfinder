import 'angular';
angular.module('puppyfinder.intro', [])

// TODO 필요없는 $window
.controller('IntroController', ['$scope', '$window', '$location', function ($scope, $window, $location) {
  $scope.width = window.innerWidth;
  $scope.height = window.innerHeight;
}]);
