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

            AuthService.logout(function () {
                $state.go('login');
            }, function () {
            });

        };
        $scope.meTest = function () {
            AuthService.meTest();
        }
        $rootScope.$watch('projects', function (newValue, oldValue) {
            if ($rootScope.projects[0]) {
                console.log($rootScope.projects[0])
                $rootScope.navTitle = $rootScope.projects[0].name;
                $rootScope.projectId = $rootScope.projects[0].id;
            }
        });



        $scope.updateTitle = function (project) {
            $rootScope.navTitle = project.name;
            $rootScope.projectId = project.id;
        };

        $scope.sync = function () {
            SyncService.sync();
        };


    }
]);