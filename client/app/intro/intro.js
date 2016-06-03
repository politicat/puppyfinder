import 'angular';

// intro module
angular
  .module('puppyfinder.intro', []);

angular
  .module('puppyfinder.intro')
  .controller('IntroController', ['$timeout', function($timeout) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.showMsg = false;

    let bgm = new Audio('../../assets/intro-music.mp3');
    bgm.addEventListener('ended', () => {
      bgm.currentTime = 0;
      bgm.play();
    });

    angular.element(document.querySelector('video'))[0].onended = () => {
      bgm.play();
      $timeout(() => {
        this.showMsg = true;
      }, 0);
    };
}]);
