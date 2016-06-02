import 'angular';

// intro module
angular
  .module('puppyfinder.intro', []);

// intro controller
// TODO $scope -> this
angular
  .module('puppyfinder.intro')
  .controller('IntroController', [function() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }]);
