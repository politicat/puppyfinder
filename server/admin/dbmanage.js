angular.module("dbmanageApp", [])
  .controller("DbmanageController", ["$http", "$window", dbManagerController]);

function dbManagerController($http, $window) {
  var _this = this;

  // 사용자의 선택에 따라 편집/추가 mode 설정후, 그에 따른 버튼 기능(submit, goback) 변경 위한 초기 설정.
  _this.mode = "";
  _this.submit = undefined;
  _this.goback = gobackToAdmin;

  _this.allergic = [['true', '많음'], ['false', '적음']];
  _this.absent = [['true', '가능'], ['false', '불가능']];
  _this.active = [['true', '활동적'], ['false', '보통']];
  _this.single = [['true', '혼자 잘 지냄'], ['false', '외로움을 잘탐']];
  _this.friendly = [['true', '강함'], ['false', '약함'], ['default', '보통']];
  _this.inside = [['true', '실내'], ['false', '실외'], ['default', '상관없음']];

  // server에 db에 저장된 견종 목록을 요청
  reloadPage();


  _this.new = function() {
    _this.mode = "(추가)";
    _this.submit = add;
    _this.goback = gobackToList;
    _this.puppy = undefined;
  };

  _this.select = function(breed) {
    _this.mode = "(편집)";
    _this.submit = update;
    _this.goback = gobackToList;
    console.log(_this.mode);
    $http.get("/puppies/" + breed)
      .success((response) => {
        console.log('Selected puppy: ', response);
        _this.puppy = response;
      });
  };

  _this.remove = function(breed) {
    del(breed);
  };


  function update(puppy) {
    $http.put("/puppies/" + _this.puppy._id, puppy)
      .success((response) => {
        console.log("Updated puppy: ", response);
        _this.puppies = response;
        _this.mode = "";
        _this.goback = gobackToAdmin;
      });
  }

  function add(puppy) {
    $http.post("/result", puppy)
      .success((response) => {
        console.log("Just added: ", response);
        _this.puppy = undefined;
        _this.mode = "";
        _this.goback = gobackToAdmin;
        reloadPage();
      });
  }

  function del(breed) {
    $http.delete("/puppies/" + breed)
      .success((response) => {
        console.log("Delete succeded. ");
        _this.puppies = response;
      });
  }

  function gobackToList() {
    _this.mode = "";
  }

  function gobackToAdmin() {
    console.log("in goback function");
    $window.location.href = '/admin';
  }

  function reloadPage() {
    $http.get("/puppies")
      .success((response) => {
        _this.puppies = response;
      });
  }
}
