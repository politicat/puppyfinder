import 'normalize-css';
import '../../node_modules/angular-material/angular-material.css'
import '../styles/SpoqaHanSans.css';
import '../styles/style.css';
import 'fullpage.js'

import angular from 'angular';
import 'angular-route';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';

import './intro/intro';
import './survey/survey';
import './result/result';

// app module
angular
  .module('puppyfinder', [
    'puppyfinder.intro',
    'puppyfinder.survey',
    'puppyfinder.result',
    'ngRoute',
    'ngMaterial'
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

// app controller
// TODO $window 대신 다른 것 사용하기
angular
  .module('puppyfinder')
  .controller('AppController', ['$window', function($window) {
    /* A container for results in window scope to use in multiple apps(servey.js, result.js) */
    $window.results = [];
  }])

// app Survey questions factory
// TODO factory 대신 DB에서 불러오기
angular
  .module('puppyfinder')
  .factory('QuestionList', function() {
    /* Question list to use in survey.html */
    var questions = [];

    /* Question data is in object for maintenance */
    var question_list = {
      1: {
        index: "slide1",
        subject: "질문01 | 생활환경",
        title: "반려견이 생활할 수 있는 야외 공간이 있나요?",
        content: "평소엔 너무나 사랑스러운 반려견도 제대로 활동할 수 있는 환경을 만들어주지 못한다면 최고의 말썽꾸러기가 되기도 합니다. 반려견을 맞이하기 전에 생활하기에 알맞은 환경을 가지고 있는지 고려해 주세요.",
        name: "inside",
        options: [{
          value: "true",
          text: "네, 마당이나 뒤뜰에 공간을 마련할 수 있어요"
        }, {
          value: "false",
          text: "아니오, 아늑한 실내에서 키울 거예요"
        }]
      },
      2: {
        index: "slide2",
        subject: "질문02 | 생활환경",
        title: "가족들과 함께 살고 있나요?",
        content: "반려견을 혼자 돌보게 되면 함께 보내는 시간에 따라 반려견이 외로워할 수 있기 때문에 가급적이면 2마리를 함께 키우는 것이 좋습니다. 독신이시라면 반려견에 충분한 애정을 주실 수 있는지, 가족분들과 함께 살고 계신다면 다른 가족 분들이 반려견을 함께 돌봐주실 준비가 되어 있는지 생각해 주세요.",
        name: "single",
        options: [{
          value: "false",
          text: "네, 가족들과 함께 살고 있어요"
        }, {
          value: "true",
          text: "아니요, 혼자 살고 있지만 충분한 애정과 관심을 줄 수 있어요!"
        }]
      }
    };

    for (var question in question_list) {
      questions.push(question_list[question]);
    }

    return ({
      questions: questions
    });
  });

// app get survey result factory
angular
  .module('puppyfinder')
  .factory('Result', ['$http', function($http) {
    let getResults = function(data) {
      return $http({
          method: 'GET',
          url: '/search',
          params: data
        })
        .then((resp) => resp);
    };

    return ({
      getResults: getResults
    });
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
        })
        .then((resp) => resp.data.items);
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
        })
        .then((resp) => resp);
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

    return ({
      getYoutube: getYoutube,
      getDaum: getDaum
    });
  }]);
