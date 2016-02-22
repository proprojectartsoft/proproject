angular.module($APP.name).factory('SyncService', [
    '$q',
    'CacheFactory',
    '$ionicPopup',
    'FormInstanceService',
    'FormDesignService',
    'ProjectService',
    '$rootScope',
    '$http',
    '$timeout',
    function ($q, CacheFactory, $ionicPopup, FormInstanceService, FormDesignService, ProjectService, $rootScope, $http, $timeout) {

        return {
            sync: function () {                
                var requests = [];
                var upRequests = [];
                var projectsCache = CacheFactory.get('projectsCache');
                var designsCache = CacheFactory.get('designsCache');
                var settingsCache = CacheFactory.get('settings');
                var sync = CacheFactory.get('sync');
                var photos = CacheFactory.get('photos');
                var forms, pics, picX, formX;

                var syncPopup = $ionicPopup.alert({
                    title: "Syncing",
                    template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                    content: "",
                    buttons: []
                });
                function upload() {
                    if (!sync || sync.length === 0) {
                        sync = CacheFactory('sync');
                    }
                    if (!photos) {
                        photos = CacheFactory('photos');
                        photos.setOptions({
                            storageMode: 'localStorage'
                        });
                    }
                    forms = sync.keys();
                    pics = photos.keys();
                    console.log('w', forms);
                    if (forms) {
                        angular.forEach(forms, function (formKey) {
                            picX = false;
                            formX = sync.get(formKey);
                            if (pics.indexOf(formKey) !== -1) {
                                console.log('sync.start.create_sync', formKey);
                                picX = photos.get(formKey);
                                console.log('sync.stop.create_sync', picX);
                            }
                            if (formX) {
                                var help1 = angular.copy(formX);
                                var help2 = angular.copy(picX);
                                upRequests.push(FormInstanceService.create_sync(help1, help2).then(function () {
                                    console.log('help', help1, help2)
                                }));
                            }
                        });
                    }
                }
                function clear() {
                    if (!settingsCache) {
                        settingsCache = CacheFactory('settingsCache');
                        settingsCache.setOptions({
                            storageMode: 'localStorage'
                        });
                    }
                    if (!photos) {
                        photos = CacheFactory('photos');
                        photos.setOptions({
                            storageMode: 'localStorage'
                        });
                    }

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
                    upload();
                }
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
                return $http.get($APP.server + '/api/userversion/session').then(function (version) {
                    var currentVersion = settingsCache.get("version");
                    var doRequest;
                    if (currentVersion !== version.data) {
                        clear();
                        requests = [ProjectService.list_current(true), FormDesignService.list_mobile()];
                        doRequest = requests.concat(upRequests);
                        console.log(doRequest);
                    }
                    else {
                        upload();
                        doRequest = upRequests;
                        if (doRequest.length === 0) {
                            syncPopup.close();
                        }
                        console.log('OK', upRequests)
                    }
                    asyncCall(doRequest,
                            function error(result) {
                                console.log('Some error occurred, but we get going:', result);
                            },
                            function success(result) {
                                var sw = false;
                                if (currentVersion !== version.data) {
                                    $rootScope.projects = result[0];
                                    angular.forEach($rootScope.projects, function (proj) {
                                        if (proj.id === $rootScope.projectId && proj.name === $rootScope.navTitle) {
                                            sw = true;
                                        }
                                    });
                                    if (!sw) {
                                        $rootScope.projectId = result[0][0].id;
                                        $rootScope.navTitle = result[0][0].name;
                                    }
                                    for (var i = 0; i < result[0].length; i++) {
                                        projectsCache.put(result[0][i].id, result[0][i]);
                                    }
                                    for (var i = 0; i < result[1].length; i++) {
                                        designsCache.put(result[1][i].id, result[1][i]);
                                    }
                                }
                                currentVersion = version.data;

                                if (sync) {
                                    sync.removeAll();
                                } else {
                                    sync = CacheFactory('sync');
                                    sync.setOptions({
                                        storageMode: 'localStorage'
                                    });
                                    sync.removeAll();
                                }

                                if (photos) {
                                    photos.removeAll();
                                } else {
                                    photos = CacheFactory('photos');
                                    photos.setOptions({
                                        storageMode: 'localStorage'
                                    });
                                    photos.removeAll();
                                }

                                settingsCache.put("version", currentVersion);

                                $timeout(function () {
                                    syncPopup.close();
                                });
                            }
                    );
                }, function errorCallback(response) {
                    $timeout(function () {
                        syncPopup.close();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Offline',
                            template: 'Could not connect to the cloud'
                        });
                    });
                });

            }
        };
    }
]);
