angular.module($APP.name).controller('NavCtrl', [
    '$rootScope',
    '$state',
    'AuthService',
    'ProjectService',
    '$scope',
    '$ionicSideMenuDelegate',
    'CacheFactory',
    'SyncService',
    'CategoriesService',
    function ($rootScope, $state, AuthService, ProjectService, $scope, $ionicSideMenuDelegate, CacheFactory, SyncService, CategoriesService) {
        console.log('user', $rootScope.currentUser);
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
        var settings = CacheFactory.get('settings');
        if (!settings || settings.length === 0) {
            settings = CacheFactory('settings');
            settings.setOptions({
                storageMode: 'localStorage'
            });
        }
        $scope.user = settings.get("user");
        var categoriesCache = CacheFactory.get('categoriesCache');
        if (!categoriesCache || categoriesCache.length === 0) {
            categoriesCache = CacheFactory('categoriesCache');
            categoriesCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        var projectsCache = CacheFactory.get('projectsCache');
        if (!projectsCache || categoriesCache.length === 0) {
            projectsCache = CacheFactory('projectsCache');
            projectsCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        $scope.logout = function () {
            var projectsCache = CacheFactory.get('projectsCache');
            if (projectsCache) {
                projectsCache.destroy();
            }

            var categoriesCache = CacheFactory.get('categoriesCache');
            if (categoriesCache) {
                categoriesCache.destroy();
            }
            var designsCache = CacheFactory.get('designsCache');
            if (designsCache) {
                designsCache.destroy();
            }
            var designsListCache = CacheFactory.get('designsListCache');
            if (designsListCache) {
                designsListCache.destroy();
            }
            var instancesCache = CacheFactory.get('instancesCache');
            if (instancesCache) {
                instancesCache.destroy();
            }
            var instancesListCache = CacheFactory.get('instancesListCache');
            if (instancesListCache) {
                instancesListCache.destroy();
            }
            var registersCache = CacheFactory.get('registersCache');
            if (registersCache) {
                registersCache.destroy();
            }
            var registersListCache = CacheFactory.get('registersListCache');
            if (registersListCache) {
                registersListCache.destroy();
            }

            var reloadCache = CacheFactory.get('reloadCache');
            if (reloadCache) {
                reloadCache.destroy();
            }

            var settingsCache = CacheFactory.get('settings');
            if (settingsCache) {
                settingsCache.destroy();
            }

            AuthService.logout(function () {
                $state.go('login');
            }, function () {
                $state.go('login');
            });

        };
        $scope.meTest = function () {
            AuthService.meTest();
        }
        if (!$rootScope.categories) {
            if (categoriesCache.keys().length > 0) {
                var list = [];
                for (var i = 0; i < categoriesCache.keys().length; i++) {
                    list.push(categoriesCache.get(categoriesCache.keys()[i]))
                }
                $rootScope.categories = list;
            }
            else {
                CategoriesService.list().then(function (data) {
                    $rootScope.categories = data;
                });
            }
        }
        if (!$rootScope.projects) {
            ProjectService.list().then(function (data) {
                $rootScope.online = true;
                $rootScope.projects = data;
                $rootScope.navTitle = data[0].name;
                $rootScope.projectId = data[0].id;
                SyncService.sync();
            }, function errorCallback(response) {
                $rootScope.online = false;
                if (projectsCache.keys().length > 0) {
                    var list = [];
                    for (var i = 0; i < projectsCache.keys().length; i++) {
                        list.push(projectsCache.get(projectsCache.keys()[i]))
                    }
                    $rootScope.projects = list;
                    $rootScope.navTitle = list[0].name;
                    $rootScope.projectId = list[0].id;
                }
            });
        }



        $scope.updateTitle = function (project) {
            $rootScope.navTitle = project.name;
            $rootScope.projectId = project.id;
        };

        $scope.sync = function () {
            if ($rootScope.online) {
                SyncService.sync();
            }
        };

//        var settingsCache = CacheFactory.get('settings');        
//        $rootScope.currentUser = settingsCache.get("user");
    }
]);