angular.module($APP.name).controller('RegistersCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'RegisterService',
    'CacheFactory',
    'AuthService',
    '$ionicPopup',
    '$state',
    function ($scope, $rootScope, $stateParams, RegisterService, CacheFactory, AuthService, $ionicPopup, $state) {
        $scope.isLoaded = false;
        $scope.hasData = '';

        AuthService.me().then(function (user) {
            if (user && user.active === false) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Your account has been de-activated. Contact your supervisor for further information.',
                });
                alertPopup.then(function (res) {
                    var projectsCache = CacheFactory.get('projectsCache');
                    if (projectsCache) {
                        projectsCache.destroy();
                    }
                    var designsCache = CacheFactory.get('designsCache');
                    if (designsCache) {
                        designsCache.destroy();
                    }
                    var instanceCache = CacheFactory.get('instanceCache');
                    if (instanceCache) {
                        instanceCache.destroy();
                    }
                    var registersCache = CacheFactory.get('registersCache');
                    if (registersCache) {
                        registersCache.destroy();
                    }
                    var registerCache = CacheFactory.get('registerCache');
                    if (registerCache) {
                        registerCache.destroy();
                    }

                    var reloadCache = CacheFactory.get('reloadCache');
                    if (reloadCache) {
                        reloadCache.destroy();
                    }

                    var syncCache = CacheFactory.get('sync');
                    if (syncCache) {
                        syncCache.destroy();
                    }

                    var settingsCache = CacheFactory.get('settings');
                    if (settingsCache) {
                        settingsCache.destroy();
                    }
                    AuthService.logout().success(function () {
                    }, function () {
                    });
                    $state.go('login');
                });

            }
        }, function errorCallback(error) {
            console.log(error, error.status);
        });
        if ($stateParams.categoryId) {
            $rootScope.categoryId = $stateParams.categoryId;
            RegisterService.list($stateParams.projectId, $stateParams.categoryId).then(function (data) {
                $scope.isLoaded = true;
                $scope.registers = data;
                if (data) {
                    if (data.length === 0) {
                        $scope.hasData = 'no data';
                    }
                }
                else {
                    $scope.hasData = 'no data';
                }
            });
        }
        $scope.categoryName = $rootScope.categories[$stateParams.categoryId - 1].name;

        $scope.refresh = function () {
            RegisterService.list($stateParams.projectId, $stateParams.categoryId).then(function (data) {
                if (data) {
                    $scope.registers = data;
                    if (data.length === 0) {
                        $scope.hasData = 'no data';
                    }
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    }
]);