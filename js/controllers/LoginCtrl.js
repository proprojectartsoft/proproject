angular.module($APP.name).controller('LoginCtrl', [
    '$scope',
    '$state',
    'AuthService',
    'CacheFactory',
    'SyncService',
    '$rootScope',
    '$timeout',
    function ($scope, $state, AuthService, CacheFactory, SyncService, $rootScope, $timeout) {
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
        var aux = reloadCache.get('reload');
        console.log('aux')
        if (aux) {
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
                        } else {
                            rememberCache.destroy();
                        }
                    }
                    var reloadCache = CacheFactory.get('reloadCache');
                    if (!reloadCache) {
                        reloadCache = CacheFactory('reloadCache');
                        reloadCache.setOptions({
                            storageMode: 'localStorage'
                        });
                    }
                    reloadCache.put('reload', {'username': $scope.user.username, 'password': $scope.user.password});
                    $timeout(function () {
                        SyncService.sync();
                        $state.go('app.categories', {'projectId': $rootScope.projectId});
                    });                    
                }
            });
        };
    }
]);