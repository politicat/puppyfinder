import 'angular';

// intro module
angular
  .module('puppyfinder.intro', []);

// intro controller
angular
  .module('puppyfinder.intro')
  .controller('IntroController', ['$window', '$location', 'QuestionList', function($window, $location, QuestionList) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

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
