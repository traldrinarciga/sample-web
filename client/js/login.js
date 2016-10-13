var app = angular.module('loginApp', []);
app.controller('loginController', function($scope, $http){
  $scope.username = '';
  $scope.password = '';
  $scope.token = '';
  $scope.errorShown = false;
  $scope.login = function(){
    var user = {};
    user.username = $scope.username;
    user.password = $scope.password;
    $http({
      method: 'POST',
      url: '/api/users/login',
      data: JSON.stringify({user : user}),
    }).then(function successCallback(response) {
      if(response.data.success){
        $scope.token = response.data.token;
        window.location.href = "/about";
      }else{
        $scope.errorShown = true;
      }
    }, function errorCallback(response) {
      $scope.errorShown = true;
      console.log(response);
    });
  };
});
