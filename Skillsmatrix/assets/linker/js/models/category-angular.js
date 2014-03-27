var userApp = angular.module('userApp', []);

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

});

userApp.config(function($sceDelegateProvider) {
     $sceDelegateProvider.resourceUrlWhitelist([
       // Allow same origin resource loads.
       'self',
       // Allow loading from our assets domain.  Notice the difference between * and **.
       // 'http://srv*.assets.example.com/**'
    ]);

     // The blacklist overrides the whitelist so the open redirect here is blocked.
     $sceDelegateProvider.resourceUrlBlacklist([
        'http://myapp.example.com/clickThru**',
    ]);
});