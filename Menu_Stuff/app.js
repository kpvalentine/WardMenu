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

function getNickName() {
    $("#newName").click(function() {
                var randval = Math.floor(Math.random() * 110);
                var url = "../getnickname?q=" + randval;
                $.getJSON(url,function(data) {
                        console.log(data);
                });
        });
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
    $scope.name = $scope.name + getNickName();
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
//get new quote when the page is reloaded
$(Document).ready(function() {
                $("#quoteDiv").html("");
                var randval = Math.floor(Math.random() * 20) + 1;
                var url = "../getquote?q=" + randval;
                //console.log(url);
                $.getJSON(url,function(data) {
//                        console.log(data);
                        $("#quoteSpan").html(data);
//                    document.getElementById("quoteSpan").innerHTML = data;
                });
        });
    //fetch new nickname when a person's name is submitted
//        $("#newName").click(function() {
//                var randval = Math.floor(Math.random() * 110);
//                var url = "../getnickname?q=" + randval;
//                $.getJSON(url,function(data) {
//                        console.log(data);
//                });
//        });

}
