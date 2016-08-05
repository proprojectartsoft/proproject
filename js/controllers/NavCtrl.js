angular.module($APP.name).controller('NavCtrl', [
    '$rootScope',
    '$state',
    'AuthService',
    '$scope',
    '$ionicSideMenuDelegate',
    'CacheFactory',
    '$timeout',
    '$http',
    'SyncService',
    function ($rootScope, $state, AuthService, $scope, $ionicSideMenuDelegate, CacheFactory, $timeout, $http, SyncService) {
        $scope.toggleLeft = function ($event) {
            $ionicSideMenuDelegate.toggleLeft();
            $($event.target)
                    .toggleClass("ion-navicon")
                    .toggleClass("ion-android-arrow-back");
        };


        var projects = CacheFactory.get('projects');
        if (!projects || projects.length === 0) {
            projects = CacheFactory('projects');
            projects.setOptions({
                storageMode: 'localStorage'
            });
        }

        var id = projects.get('projectId');
        var name = projects.get('navTitle');
        var sw = false;

        if (id && name) {
            angular.forEach($rootScope.projects, function (proj) {
                if (proj.id === id && proj.name === name) {
                    sw = true;
                }
            });
            if (sw === true) {
                $rootScope.navTitle = name;
                $rootScope.projectId = id;
            } else {
                $rootScope.navTitle = $rootScope.projects[0].name;
                $rootScope.projectId = $rootScope.projects[0].id;
                projects.put('navTitle', $rootScope.projects[0].name);
                projects.put('projectId', $rootScope.projects[0].id);
            }

        }



        var settingsCache = CacheFactory.get('settings');
        if (!settingsCache) {
            settingsCache = CacheFactory('settings');
            settingsCache.setOptions({
                storageMode: 'localStorage'
            });
        }

        $rootScope.categories = [
            {"id": 1, "name": "Health and Safety", "description": "Health and safety category", "image_url": "healthsafety"},
            {"id": 2, "name": "Design", "description": "Design category", "image_url": "design"},
            {"id": 3, "name": "Quality Assurance", "description": "Quality Assurance category", "image_url": "qa"},
            {"id": 4, "name": "Contractual", "description": "Contractual category", "image_url": "contractual"},
            {"id": 5, "name": "Environmental", "description": "Environmental category", "image_url": "environmental"},
            {"id": 6, "name": "Financial", "description": "Financial category", "image_url": "financial"}
        ];
        $scope.isDisconnect = {checked: false};

        $scope.pushIsDisconnectChange = function () {
            if ($scope.isDisconnect.checked) {
                $scope.logout();
            }
        };

        $scope.goAt = function () {
            var deviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : "Android";
            if (deviceType === "Android") {
                navigator.app.loadUrl($APP.server, {openExternal: true});
            }
            else {
                window.open($APP.server, '_system');
            }


        }
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
            var projects = CacheFactory.get('projects');
            if (projects) {
                projects.destroy();
            }
            var photos = CacheFactory.get('photos');
            if (photos) {
                photos.destroy();
            }


            var resourcesCache = CacheFactory.get('resourcesCache');
            if (resourcesCache) {
                resourcesCache.destroy();
            }
            var staffCache = CacheFactory.get('staffCache');
            if (staffCache) {
                staffCache.destroy();
            }
            var unitCache = CacheFactory.get('unitCache');
            if (unitCache) {
                unitCache.destroy();
            }
            var custSettCache = CacheFactory.get('custSettCache');
            if (custSettCache) {
                custSettCache.destroy();
            }
            var payitemsCache = CacheFactory.get('payitemsCache');
            if (payitemsCache) {
                payitemsCache.destroy();
            }


            AuthService.logout().success(function () {
            });
            $state.go('login');

        };


        AuthService.version().then(function (version) {
            settingsCache.put("version", version);
        });

        $scope.updateTitle = function (project) {
            $rootScope.navTitle = project.name;
            $rootScope.projectId = project.id;
            projects.put('navTitle', project.name);
            projects.put('projectId', project.id);
        };

        $scope.sync = function () {
            $timeout(function () {
                $http.get($APP.server + '/api/me', {withCredentials: true}).then(function (user) {
                    SyncService.sync();
                }, function errorCallback(response) {
                    console.log(response.status)
                    if (response.status === 403) {
                        AuthService.autoLogFix().then(function (result) {
                            SyncService.sync();
                        });
                    }
                });

            });
        };

        $rootScope.$on('sync.todo', function () {
            $state.go('app.categories', {'projectId': $rootScope.projectId});
            $scope.sync();
        });
    }
]);