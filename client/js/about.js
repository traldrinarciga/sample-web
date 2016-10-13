var app = angular.module('app', []);
app.config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});
app.controller('cont', function($scope, $location, $http){
  console.log(JSON.stringify($location.search()));
  $scope.token = $location.search().token;
  $location.search('token', null)
  $scope.name = '';
  $scope.age = '';
  $scope.people = [];
  $scope.add = function(){
    var newP = {};
    newP.name = $scope.name;
    newP.age = $scope.age;
    $scope.people.push(newP);
  };
  $scope.delete = function($index){
    $scope.people.splice($index, 1);
  };
  $scope.logOut = function(){
    $http({
      method: 'POST',
      url: '/api/users/logout'
    }).then(function successCallback(response) {
      if(response.data.success){
        $scope.token = response.data.token;
        window.location.href = "/login";
      }
    }, function errorCallback(response) {
      $scope.errorShown = true;
      console.log(response);
    });
  };


});
