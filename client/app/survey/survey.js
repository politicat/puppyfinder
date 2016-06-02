import 'angular';

// survey module
angular
  .module('puppyfinder.survey', []);

// survey controller
angular
  .module('puppyfinder.survey')
  .controller('SurveyController', ['$window', '$location', 'QuestionList', 'Result', function($window, $location, QuestionList, Result) {
    /* Get the question list from the factory and insert into this scope */
    this.questions = QuestionList.questions;
    /* Container for user's answers to survey */
    this.data = {
      puppyData: {}
    };
    /* Default settings for styling */
    this.topIndex = 0;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    /* Method to send user's answers to the server and get results */
    this.sendQuery = function() {
      Result.getResults(this.data.puppyData)
        .then(function(resp) {
          /* Put results in the window scope container set in the AppController  */
          $window.results = resp.data;
          return "success";
        })
        .then(function() {
          $location.path('/result');
        });
    };

    /* Method to move(scroll) to the next question by changing topIndex in the scroll container */
    this.scrollTo = function(index) {
      this.topIndex = index;
    };
  }]);
