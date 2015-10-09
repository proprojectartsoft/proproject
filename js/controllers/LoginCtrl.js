angular.module($APP.name).controller('LoginCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    'AuthService',
    '$ionicPopup',
    'ReloadMeService',
    'CacheFactory',
    function ($rootScope, $scope, $state, AuthService, $ionicPopup, ReloadMeService, CacheFactory) {
        $scope.user = [];
        $scope.user.username = "";
        $scope.user.password = "";
        $scope.user.rememberMe = false;
        $scope.popupOpen = false;

        var rememberCache = CacheFactory.get('rememberCache');
        if (!rememberCache) {
            rememberCache = CacheFactory('rememberCache');
            rememberCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        var reloadCache = CacheFactory.get('reloadCache');
        if (!reloadCache) {
            reloadCache = CacheFactory('reloadCache');
            reloadCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        else{
//        if (reloadCache) {
            AuthService.isLoggedInCache();
        }
        $scope.hasRemember = rememberCache.get('remember');
        if ($scope.hasRemember) {
            $scope.user.username = $scope.hasRemember.username;
            $scope.user.password = $scope.hasRemember.password;
            $scope.user.rememberMe = true;
        }


        $scope.login = function () {
            var aux = AuthService.login({
                username: $scope.user.username,
                password: $scope.user.password
            }).then(function (response) {
                if (response) {
                    var rememberCache = CacheFactory.get('rememberCache');
                    if (rememberCache) {
                        if ($scope.user.rememberMe) {
                            rememberCache.put('remember', {'username': $scope.user.username, 'password': $scope.user.password});
                            reloadCache.put('reload', {'username': $scope.user.username, 'password': $scope.user.password});
                        }
                        else {
                            rememberCache.destroy();
                        }
                    }
                    $state.go("app.categories");
                }
            });

//                    then(function (data) {
//                
//            }, function error(err) {
//                if (!$scope.popupOpen) {
//                    $scope.popupOpen = true;
//                    $ionicPopup.alert({
//                        title: 'Invalid login',
//                        content: 'Please enter valid username and password.'
//                    }).then(function (rest) {
//                        $scope.popupOpen = false;
//                    });
//                }
//                $rootScope.error = 'Failed to login';
//            });
        };
    }
]);