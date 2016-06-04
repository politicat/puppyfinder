import 'normalize-css';
import '../styles/SpoqaHanSans.css';
import '../styles/style.css';

import angular from 'angular';
import 'angular-route';
import 'angular-aria';
import 'angular-animate';

import './intro/intro';
import './survey/survey';
import './result/result';

// app module
angular
  .module('puppyfinder', [
    'puppyfinder.intro',
    'puppyfinder.survey',
    'puppyfinder.result',
    'ngRoute'
  ]);

// app router
angular
  .module('puppyfinder')
  .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/intro/intro.html',
        controller: 'IntroController as Intro'
      })
      .when('/intro', {
        templateUrl: 'app/intro/intro.html',
        controller: 'IntroController as Intro'
      })
      .when('/survey', {
        templateUrl: 'app/survey/survey.html',
        controller: 'SurveyController as Survey',
      })
      .when('/result', {
        templateUrl: 'app/result/result.html',
        controller: 'ResultController as Result'
      })
      .otherwise('/intro');
  }]);

// app Survey questions factory
angular
  .module('puppyfinder')
  .factory('QuestionList', ['$http', function($http) {
    let questions = [];
    let getQuestions = function() {
      return $http({
        method: 'GET',
        url: '/questions'
      });
    };

    return {
      questions: questions,
      getQuestions: getQuestions
    };
  }]);

// app get survey result factory
angular
  .module('puppyfinder')
  .factory('Result', ['$http', function($http) {
    let results = [];
    let getResults = function(data) {
      return $http({
          method: 'GET',
          url: '/search',
          params: data
        });
    };

    return {
      results: results,
      getResults: getResults
    };
  }]);

// app search related puppy data factory
angular
  .module('puppyfinder')
  .factory('RelatedContents', ['$http', function($http) {
    /* Get video list json related to the breed in result from Youtube */
    let getYoutube = function(query) {
      return $http({
          method: 'GET',
          url: 'https://www.googleapis.com/youtube/v3/search?' +
            'part=' + 'snippet' +
            '&key=' + 'AIzaSyBRXCXvGfojUxaVxBYannVo38Vzgj5W_fs' +
            '&q=' + query + ' 개' +
            '&maxResults=' + 12 +
            '&type=' + 'video' +
            '&videoEmbeddable=' + 'true'
        });
    };

    /* Get video list json related to the breed in result from Youtube */
    let getDaum = function(query) {
      let data = {
        q: query
      }

      return $http({
          method: 'GET',
          url: '/daum',
          params: data
        });
    };

    /*
     * Get photo list json related to the breed in result from Instagram.
     * Failed due to Instagram's permission policy.
     */
    // var getInstagram = function(hashtag){
    //   return $http({
    //     method: 'GET',
    //     url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent' +
    //     '?client_id=' + '642176ece1e7445e99244cec26f4de1f&',
    //   })
    //   .then(function(resp){
    //     console.log(resp);
    //     return resp;
    //   }, function(err){
    //     if(err) return err;
    //   });
    // };

    return {
      getYoutube: getYoutube,
      getDaum: getDaum
    };
  }]);
