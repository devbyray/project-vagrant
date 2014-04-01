var userApp = angular.module('userApp', []);

userApp.controller('MainController', function($scope, $http) {

    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
          console.log('active');
          return "active"
        } else {
          console.log('what are you talking about?');
          return ""
        }
    }

});

userApp.controller('NavigationCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isCurrentPath = function (viewLocation) {
         var active = (viewLocation === $location.path());
         return active;
    };
}]);

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

userApp.controller('SkillController', function($scope, $http) {

    $scope.skills = [];

    // Get all skills
    $http.get('/skill/find').success(function(skills) {
            $scope.loaded = true;
            $scope.skills = skills;
    }).error(function(err) {
        // Alert if there's an error
        console.log(err);
    });

});


