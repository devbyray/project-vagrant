var userApp = angular.module('userApp', []);

userApp.controller('UserController', function($scope, $http) {

    $scope.users = [];

    // Get all users
    $http.get('/user/find').success(function(users) {
            $scope.loaded = true;
            $scope.users = users;
            console.log(users);
    }).error(function(err) {
        // Alert if there's an error
        alert(err);
    });

});