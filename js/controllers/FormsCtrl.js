angular.module($APP.name).controller('FormsCtrl', [
    '$scope',
    '$stateParams',
    'FormDesignService',
    '$rootScope',
    'CacheFactory',
    'AuthService',
    '$state',
    '$ionicPopup',
    'SyncService',
    function ($scope, $stateParams, FormDesignService, $rootScope, CacheFactory, AuthService, $state, $ionicPopup, SyncService) {
        $scope.isLoaded = false;
        $scope.hasData = '';
        $scope.categoryId = $stateParams.categoryId;

        AuthService.me().then(function (user) {
            console.log(user);
            if (user && user.active === false) {
                $scope.getOut();
            }
        }, function errorCallback(error) {
            console.log(error, error.status);
        });

        $scope.getOut = function () {
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
                $state.go('login');
            }, function () {
            });
        };

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


        $scope.categoryName = $rootScope.categories[$stateParams.categoryId - 1].name;

        $scope.refresh = function () {
            FormDesignService.list($stateParams.categoryId).then(function (data) {
                if (data) {
                    $rootScope.formDesigns = data;
                    if (data.length === 0) {
                        $scope.hasData = 'no data';
                    }
                }
                $scope.$broadcast('scroll.refreshComplete');
            }, function (payload) {
            });
        };

        $scope.changeForm = function (id) {
            FormDesignService.checkpermission(id).then(function (result) {
                if (result === true) {
                    $state.go('app.form', {'projectId': $rootScope.projectId, 'formId': id});
                } else {
                    var alertPopup3 = $ionicPopup.alert({
                        title: 'Submision failed.',
                        template: 'You no longer have permission to acces that form. A sync will be triggered.'
                    }).then(function (res) {
                        var designsCache = CacheFactory.get('designsCache');
                        if (designsCache) {
                            designsCache.destroy();
                        }
                        var instanceCache = CacheFactory.get('instanceCache');
                        if (instanceCache) {
                            instanceCache.destroy();
                        }

                        var syncCache = CacheFactory.get('sync');
                        if (syncCache) {
                            syncCache.destroy();
                        }
                        $state.go('app.categories', {'projectId': $rootScope.projectId});
                        SyncService.sync();
                    });
                }
            });
        };
    }
]);