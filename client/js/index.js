var app = angular.module('index', []);
app.controller('controller', function($scope, $http){
  $scope.myInput = "Aldrin";
  $scope.myClick = function(){
    $http({
      method: 'POST',
      url: '/index',
      data: JSON.stringify( { "name": $scope.myInput } ),
    }).then(function successCallback(response) {
        window.location.href = "about?name=" + response.data.name;
    }, function errorCallback(response) {
      console.log(response);
    });
  };
});
