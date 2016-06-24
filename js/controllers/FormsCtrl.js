angular.module($APP.name).controller('FormsCtrl', [
    '$scope',
    '$stateParams',
    'FormDesignService',
    '$rootScope',
    'CacheFactory',
    'AuthService',
    '$state',
    '$ionicPopup',
    '$ionicHistory',
    '$anchorScroll',
    '$ionicSideMenuDelegate',
    function ($scope, $stateParams, FormDesignService, $rootScope, CacheFactory, AuthService, $state, $ionicPopup, $ionicHistory, $anchorScroll, $ionicSideMenuDelegate) {

        $scope.$on('$ionicView.enter', function () {
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.canDragContent(false);
        });

        $scope.isLoaded = false;
        $scope.hasData = '';
        $scope.categoryId = $stateParams.categoryId;
        $rootScope.slideHeader = false;
        $rootScope.slideHeaderPrevious = 0;
        $rootScope.slideHeaderHelper = false;

        $rootScope.$on('$stateChangeStart', function () {
            $anchorScroll.yOffset = 0;
        });

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

        var designsCache = CacheFactory.get('designsCache');
        if (!designsCache || designsCache.length === 0) {
            designsCache = CacheFactory('designsCache');
            designsCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        var aux;
        $rootScope.formDesigns = [];
        angular.forEach(designsCache.keys(), function (key) {
            aux = designsCache.get(key);
            if (aux.category_id === parseInt($stateParams.categoryId)) {
                $rootScope.formDesigns.push(aux);
            }
        });
        $scope.isLoaded = true;
        if ($rootScope.formDesigns.length === 0) {
            $scope.hasData = 'no data';
        }


        $scope.categoryName = $rootScope.categories[$stateParams.categoryId - 1].name;

        $scope.refresh = function () {
            FormDesignService.list_mobile($stateParams.categoryId).then(function (data) {
                if (data) {
                    if (data.length === 0) {
                        $scope.hasData = 'no data';
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            designsCache.put(data[i].id, data[i]);
                        }
                        $rootScope.formDesigns = data;
                    }
                }
                $scope.$broadcast('scroll.refreshComplete');
            }, function (payload) {
            });
        };

        $scope.fixScroll = function () {
            $rootScope.slideHeader = false;
            $rootScope.slideHeaderPrevious = 0;
            $rootScope.slideHeaderHelper = false;
        }
    }
]);