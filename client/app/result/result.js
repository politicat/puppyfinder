import 'angular';

// result module
angular
  .module('puppyfinder.result', []);

// result controller
angular
  .module('puppyfinder.result')
  .controller('ResultController', ['$window', '$sce', 'RelatedContents', function($window, $sce, RelatedContents) {
    /* Put results from survey.js in window scope into this scope's results variable */
    this.results = $window.results;
    this.tab = 0;

    /* Initialize method when ResultController is loaded in the DOM */
    this.init = function() {
      angular.forEach(this.results, function(dog) {
        /* Remove whitespaces in dog.breed string */
        let q = dog.breed.replace(/ /gi, '');
        /* Request related videos to Youtube */
        RelatedContents.getYoutube(q)
          .then(function(videos) {
            dog.relatedVideos = videos;
            dog.currentVideo = dog.relatedVideos[0];
          });
        /* Request related photos to Daum Image Search */
        RelatedContents.getDaum(q)
          .then(function(photos) {
            dog.relatedPhotos = photos.data.channel.item;
          });
      });
    };
    /* Set the tabIndex to see the RelatedContents related breed selected */
    this.setTab = function(tabIndex) {
      this.tab = tabIndex;
    };
    /* Confirm that video source can be trusted */
    this.getSrc = function(video) {
      return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video.id.videoId);
    };
    /* Change the video in iframe(player) */
    this.play = function(dog, video) {
      dog.currentVideo = video;
    };
  }]);
