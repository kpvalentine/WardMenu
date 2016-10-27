var app = window.angular.module('app', [])

app.factory('peopleAdd', peopleAdd)
app.controller('mainCtrl', mainCtrl)

function peopleAdd ($http) {

  var API_ROOT = 'people'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
    tryit: function() {
      var politics = "/politics";
      return $http
        .get(politics)
        .then(function (resp) {
          console.log("Get Worked");
          console.log(resp.data);
          return resp.data
        })
    }
  }

}

function mainCtrl ($scope, $http, peopleAdd) {

  $scope.people = []

  peopleAdd.get()
    .then(function (data) {
      $scope.people = data
    })
  peopleAdd.tryit()
    .then(function (data) {
      console.log("tryit");
      console.log(data);
    })

$scope.addPeople = function() {
  var formData = {name:$scope.Name,avatarUrl:$scope.Url,lastname:$scope.LastName,phonenumber:$scope.PhoneNumber};
  console.log(formData);
  var peopleURL = 'people';
  $http({
     url: peopleURL,
     method: "POST",
     data: formData
  }).success(function(data, status, headers, config) {
    console.log("Post worked");
    peopleAdd.get()
       .then(function(data){
       $scope.people = data
     })
  }).error(function(data, status, headers, config) {
    console.log("Post failed");
  });
}

}
