var userApp = angular.module('userApp', []);

userApp.controller('UserController', function($scope, $http) {

    $scope.users = [];

    // Get all users
    $http.get('/user/find').success(function(users) {
            $scope.loaded = true;
            $scope.users = users;
    }).error(function(err) {
        // Alert if there's an error
        console.log(err);
    });

    $scope.confirmDelete = false;

    $scope.$watch('[confirmDelete]', function(){
        $scope.deleteButtonDisabled = !$scope.confirmDelete;
    }, true );

});

userApp.controller('CategoryController', function($scope, $http) {

    $scope.categories = [];

    // Get all categories
    $http.get('/category/find').success(function(categories) {
            $scope.loaded = true;
            $scope.categories = categories;
    }).error(function(err) {
        // Alert if there's an error
        console.log(err);
    });

    $scope.confirmDelete = false;

    $scope.$watch('[confirmDelete]', function(){
        $scope.deleteButtonDisabled = !$scope.confirmDelete;
    }, true );

});


