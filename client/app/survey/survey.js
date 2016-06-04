import 'angular';

// survey module
angular
  .module('puppyfinder.survey', []);

// survey controller
angular
  .module('puppyfinder.survey')
  .controller('SurveyController', ['$window', '$location', '$timeout', 'Result', function($window, $location, $timeout, Result) {
    /* Get the question list from the factory and insert into this scope */
    this.questions = $window.questions.map(function(val) {
      val.content = `${val.subject}\n${val.title}\n\n${val.content}`;
      return val;
    });

    /* Container for user's answers to survey */
    this.answers = {};

    /* Method to send user's answers to the server and get results */
    this.sendQuery = () => {
      Result.getResults(this.answers)
        .then(function(resp) {
          /* Put results in the window scope container set in the AppController  */
          $window.results = resp.data;
          return "success";
        })
        .then(function() {
          $location.path('/result');
        });
    };

    this.i = 0;
    this.speed = 60;
    this.pressed = false;
    this.keydowned = false;
    this.optionIdx = 0;

    this.type = (txt) => {
      let timeOut;
      let txtLen = txt.length;
      let character = 0;

      angular.element(document.querySelector('.question-box')).text("");

      let typeIt = (i) => {
        timeOut = $timeout(() => {
          character++;
          let nowTyping = txt.substring(0, character);
          angular.element(document.querySelector('.question-box')).html(nowTyping.replace(/\n/gi,"<br />"));
          typeIt(i);
          if (character === txtLen || i !== this.i) {
            $timeout.cancel(timeOut);
          }
        }, this.speed);
      };

      typeIt(this.i);
  };

  let ding = new Audio('../../assets/ding.mp3');
  this.toNext = () => {
    if (this.i < this.questions.length-1) {
      this.question = this.questions[++this.i];
      this.type(this.question.content);
      ding.play();
    } else if (this.i === this.questions.length-1) {
      this.i++;
    }
  };

  this.saveAnswer = (answer) => {
    this.answers[this.question.name] = answer;
  };

  this.keydownBox = (event) => {
    if (event.keyCode === 65) {
      this.speed = 20;
    }
  };

  this.keyupBox = (event) => {
    if (event.keyCode === 65) {
      this.speed = 60;
    } else if (event.keyCode === 40 && this.optionIdx < this.question.options.length-1) {
      this.optionIdx++;
    } else if (event.keyCode === 38 && this.optionIdx > 0) {
      this.optionIdx--;
    } else if (event.keyCode === 13) {
      this.saveAnswer(this.question.options[this.optionIdx].value);
      this.toNext();
    }
  };

  this.question = this.questions[0];
  this.type(this.question.content);

  if (window.bgm) {
    window.bgm.pause();
  }

  window.bgm = new Audio('../../assets/intro-music.mp3');
  window.bgm.play();
  window.bgm.addEventListener('ended', () => {
    window.bgm.currentTime = 0;
    window.bgm.play();
  });
}]);
