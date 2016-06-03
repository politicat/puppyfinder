import 'angular';

// result module
angular
  .module('puppyfinder.result', []);

// result controller
angular
  .module('puppyfinder.result')
  .controller('ResultController', ['$window', '$sce', 'RelatedContents', '$timeout', function($window, $sce, RelatedContents, $timeout) {
    /* Put results from survey.js in window scope into this scope's results variable */
    this.results = $window.results;
    this.tab = 0;

    /* Initialize method when ResultController is loaded in the DOM */
    this.init = () => {
      angular.forEach(this.results, (dog) => {
        /* Remove whitespaces in dog.breed string */
        let q = dog.breed.replace(/ /gi, '');
        /* Request related videos to Youtube */
        RelatedContents.getYoutube(q)
          .then((videos) => {
            dog.relatedVideos = videos;
            dog.currentVideo = dog.relatedVideos[0];
          });
        /* Request related photos to Daum Image Search */
        RelatedContents.getDaum(q)
          .then((photos) => {
            dog.relatedPhotos = photos.data.channel.item;
          });
      });
     };

    let loadingBGM = new Audio('../../assets/result-loading.mp3');
    let loadedBGM = new Audio('../../assets/result-loaded.mp3');

    loadingBGM.play();

    this.isLoading = true;
    $timeout(() => {
      this.isLoading = false;
      loadingBGM.pause();
      loadedBGM.play();
    }, 3000);

    /* Set the tabIndex to see the RelatedContents related breed selected */
    this.setTab = (tabIndex) => {
      this.tab = tabIndex;
    };
    /* Confirm that video source can be trusted */
    this.getSrc = (video) => {
      return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video.id.videoId);
    };
    /* Change the video in iframe(player) */
    this.play = (dog, video) => {
      dog.currentVideo = video;
    };
}]);
