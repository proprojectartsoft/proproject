angular.module($APP.name).controller('NavCtrl', [
    '$rootScope',
    '$state',
    'AuthService',
    '$scope',
    '$ionicSideMenuDelegate',
    'CacheFactory',
    'SyncService',
    '$timeout',
    function ($rootScope, $state, AuthService, $scope, $ionicSideMenuDelegate, CacheFactory, SyncService, $timeout) {
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };
        var settingsCache = CacheFactory.get('settings');
        if (!settingsCache) {
            settingsCache = CacheFactory('settings');
            settingsCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        $scope.user = settingsCache.get("user");

        $rootScope.categories = [
            {"id": 1, "name": "Health and Safety", "description": "Health and safety category", "image_url": "healthsafety"},
            {"id": 2, "name": "Design", "description": "Design category", "image_url": "design"},
            {"id": 3, "name": "Quality Assurance", "description": "Quality Assurance category", "image_url": "qa"},
            {"id": 4, "name": "Contractual", "description": "Contractual category", "image_url": "contractual"},
            {"id": 5, "name": "Environmental", "description": "Environmental category", "image_url": "environmental"},
            {"id": 6, "name": "Financial", "description": "Financial category", "image_url": "financial"}
        ];

        $scope.logout = function () {
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

            AuthService.logout(function () {
                $state.go('login');
            }, function () {
            });

        };
        $rootScope.getOut = function () {
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

            AuthService.logout(function () {
                $state.go('login');
            }, function () {
            });
        };
        $scope.meTest = function () {
            AuthService.meTest();
        }

        AuthService.version().then(function (version) {
            settingsCache.put("version", version);
        });

        $scope.updateTitle = function (project) {
            $rootScope.navTitle = project.name;
            $rootScope.projectId = project.id;
        };

        $scope.sync = function () {
            $timeout(function () {
                SyncService.sync();
            });
        };

        $rootScope.$on('sync.todo', function () {
            $state.go('app.categories', {'projectId': $rootScope.projectId});
            $scope.sync();
        });
    }
]);