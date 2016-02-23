angular.module($APP.name).controller('FormCompletedCtrl', [
    '$scope',
    '$state',
    'FormInstanceService',
    'CacheFactory',
    '$rootScope',
    '$location',
    '$stateParams',
    'AuthService',
    '$ionicPopup',
    '$ionicSideMenuDelegate',
    '$ionicHistory',
    function ($scope, $state, FormInstanceService, CacheFactory, $rootScope, $location, $stateParams, AuthService, $ionicPopup, $ionicSideMenuDelegate, $ionicHistory) {
        
        $scope.$on('$ionicView.enter', function () {
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.canDragContent(false);
        });
        
        $scope.isLoaded = false;
        $rootScope.slideHeader = false;
        $rootScope.slideHeaderPrevious = 0;
        $rootScope.slideHeaderHelper = false;

        $scope.getFullCode = function (row) {
            if (row.revision !== '0') {
                return row.code + '-' + row.form_number + '-Rev' + row.revision;
            }
            else {
                return row.code + '-' + row.form_number;
            }
        };

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

        $scope.categoryName = $rootScope.categories[$stateParams.categoryId - 1].name;
        $rootScope.categoryId = $stateParams.categoryId;

        FormInstanceService.list($stateParams.projectId, $stateParams.categoryId).then(function (data) {
            $scope.isLoaded = true;
            $scope.formInstances = data;
            if (data) {
                if (data.length === 0) {
                    $scope.hasData = 'no data';
                }
            }
            else {
                $scope.hasData = 'no data';
            }
        });

        $scope.refresh = function () {
            FormInstanceService.list($stateParams.projectId, $stateParams.categoryId).then(function (data) {
                $scope.formInstances = data;
                if (data) {
                    if (data.length === 0) {
                        $scope.hasData = 'no data';
                    }
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.change = function (id) {
            $rootScope.formId = id;
            FormInstanceService.get($rootScope.formId).then(function (data) {
                $rootScope.rootForm = data;
                $location.path("/app/view/" + $rootScope.projectId + "/form/" + id);
            });
        };

        $scope.test = function () {
        };

        $scope.form = function (completedFormId) {
            $state.go("app.form");
        };
    }
]);