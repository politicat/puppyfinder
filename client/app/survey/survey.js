import 'angular';

// survey module
angular
  .module('puppyfinder.survey', []);

// survey controller
angular
  .module('puppyfinder.survey')
  .controller('SurveyController', ['$window', '$location', '$timeout', 'QuestionList', 'Result', function($window, $location, $timeout, QuestionList, Result) {
    /* Get the question list from the factory and insert into this scope */
    this.questions = QuestionList.questions.map(function(val) {
      val.content = `${val.subject}\n${val.title}\n${val.content}`;
      return val;
    });

    /* Container for user's answers to survey */
    this.data = {
      puppyData: {}
    };
    //[> Default settings for styling <]
    //this.topIndex = 0;
    //this.width = window.innerWidth;
    //this.height = window.innerHeight;

    /* Method to send user's answers to the server and get results */
    this.sendQuery = () => {
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

/*    [> Method to move(scroll) to the next question by changing topIndex in the scroll container <]*/
    //this.scrollTo = (index) => {
      //this.topIndex = index;
    //};


    this.i = 0;
    this.speed = 60;
    this.pressed = false;
    this.keydowned = false;

    this.type = (txt) => {
      this.question = this.questions[this.i++];

      let timeOut;
      let txtLen = txt.length;
      let character = 0;

      angular.element(document.querySelector('.question-box')).text("");

      let typeIt = (i) => {
        timeOut = $timeout(() => {
          character++;
          let type = txt.substring(0, character);
          angular.element(document.querySelector('.question-box')).html(type.replace("\n","<br />"));
          typeIt(i);
          if (character === txtLen || i !== this.i) {
            $timeout.cancel(timeOut);
          }
        }, this.speed);
      };

      typeIt(this.i);
  };

  this.toNext = () => {
    if (this.i < this.questions.length) {
      this.type(this.questions[this.i].content);
    }
  };

  this.keydownBox = (event) => {
    console.log('keydown');
    if (event.keyCode === 65) {
      this.speed = 20;
/*      if (this.pressed) {*/
        //this.pressed = false;
        //this.keydowned = false;
        //if (this.i < this.questions.length) {
          //this.type(this.questions[this.i].content);
        //}
      //} else {
        //this.keydowned = true;
      /*}*/
    }
  };

  this.keyupBox = (event) => {
    if (event.keyCode === 65) {
      this.speed = 60;
      if (this.keydowned) {
        this.pressed = true;
      }
    }
  };

  this.type(this.questions[this.i].content);
}]);
