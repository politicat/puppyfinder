import 'angular';

// intro module
angular
  .module('puppyfinder.intro', []);

// intro controller
angular
  .module('puppyfinder.intro')
  .controller('IntroController', ['$window', '$location', '$timeout', 'QuestionList', function($window, $location, $timeout, QuestionList) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.showMsg = false;

    if (window.bgm) {
      window.bgm.pause();
    }

    window.bgm = new Audio('../../assets/intro-music.mp3');
    window.bgm.addEventListener('ended', () => {
      window.bgm.currentTime = 0;
      window.bgm.play();
    });

    angular.element(document.querySelector('video'))[0].onended = () => {
      window.bgm.play();
      $timeout(() => {
        this.showMsg = true;
      }, 0);
    };

    this.sendQuery = function() {
      QuestionList.getQuestions()
      .then(function(resp) {
        $window.questions = resp.data;
        return "success";
      })
      .then(function() {
        $location.path('/survey');
      });
    }
  }]);
