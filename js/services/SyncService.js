angular.module($APP.name).factory('SyncService', [
    '$q',
    'CacheFactory',
    '$ionicPopup',
    'FormInstanceService',
    'FormDesignService',
    'ProjectService',
    '$rootScope',
    '$timeout',
    '$state',
    '$http',
    function ($q, CacheFactory, $ionicPopup, FormInstanceService, FormDesignService, ProjectService, $rootScope, $timeout, $state, $http) {

        return {
            sync: function () {
                $http.get($APP.server + '/api/me').then(function (user) {
                    var requests = [ProjectService.list(), FormDesignService.list_mobile()];
                    var projectsCache = CacheFactory.get('projectsCache');
                    var designsCache = CacheFactory.get('designsCache');
                    var sync = CacheFactory.get('sync');
                    var forms;

                    if (projectsCache) {
                        projectsCache.removeAll();
                    } else {
                        projectsCache = CacheFactory('projectsCache');
                        projectsCache.setOptions({
                            storageMode: 'localStorage'
                        });
                        projectsCache.removeAll();
                    }
                    if (designsCache) {
                        designsCache.removeAll();
                    }
                    else {
                        designsCache = CacheFactory('designsCache');
                        designsCache.setOptions({
                            storageMode: 'localStorage'
                        });
                        designsCache.removeAll();
                    }
                    if (!sync || sync.length === 0) {
                        sync = CacheFactory('sync');
                    }
                    forms = sync.keys();

                    if (forms) {
                        angular.forEach(forms, function (singleForm) {
                            requests.push(FormInstanceService.create_sync(sync.get(singleForm)));
                        });
                    }

                    $rootScope.syncPopup = $ionicPopup.alert({
                        title: "Syncing",
                        template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                        content: "",
                        buttons: []
                    });

                    function asyncCall(listOfPromises, onErrorCallback, finalCallback) {
                        listOfPromises = listOfPromises || [];
                        onErrorCallback = onErrorCallback || angular.noop;
                        finalCallback = finalCallback || angular.noop;
                        var newListOfPromises = listOfPromises.map(function (promise) {
                            return promise.catch(function (reason) {
                                onErrorCallback(reason);
                                return {'rejected_status': reason.status};

                            });
                        });
                        $q.all(newListOfPromises).then(finalCallback);
                    }

                    asyncCall(requests,
                            function error(result) {
                                console.log('Some error occurred, but we get going:', result);
                            },
                            function success(result) {
                                var permissionError = 0;
                                $rootScope.projects = result[0];
                                $rootScope.projectId = result[0][0].id;
                                $rootScope.navTitle = result[0][0].name;
                                for (var i = 0; i < result[0].length; i++) {
                                    projectsCache.put(result[0][i].id, result[0][i]);
                                }
                                for (var i = 0; i < result[1].length; i++) {
                                    designsCache.put(result[1][i].id, result[1][i]);
                                }
                                for (var i = 2; i < result.length; i++) {
                                    if (result[i].message) {
                                        permissionError++;
                                    }
                                }
                                sync.removeAll();
                                $rootScope.syncPopup.close();
                                if (permissionError > 0) {
                                    $timeout(function () {
                                        var alertPopup4 = $ionicPopup.alert({
                                            title: 'Submision failed.',
                                            template: permissionError + " forms could not be submitted because you don't have the requiered permission anymore."
                                        });
                                        alertPopup4.then(function (res) {
                                            $state.go('app.categories', {'projectId': $rootScope.projectId});
                                        });
                                    });
                                }
                            }
                    );
                }, function errorCallback(response) {
                    $timeout(function () {
                        var alertPopup4 = $ionicPopup.alert({
                            title: 'Sync error.',
                            template: "You are offline. Please go online to sync."
                        });
                        alertPopup4.then(function (res) {
                            $state.go('app.categories', {'projectId': $rootScope.projectId});
                        });
                    });
                });
            }
        };
    }
]);
