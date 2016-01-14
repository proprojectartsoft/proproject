angular.module($APP.name).controller('CategoriesCtrl', [
    'AuthService',
    'CacheFactory',
    '$state',
    '$scope',
    'SyncService',
    '$rootScope',
    function (AuthService, CacheFactory, $state, $scope, SyncService, $rootScope) {
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
        SyncService.newsync();
        $rootScope.$on('doSync', function () {
            $state.go('app.categories', {'projectId': $rootScope.projectId});
            SyncService.sync();
        });
    }
]);
