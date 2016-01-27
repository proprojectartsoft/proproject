angular.module($APP.name).factory('SyncService', [
    '$q',
    'CacheFactory',
    '$ionicPopup',
    'FormInstanceService',
    'FormDesignService',
    'ProjectService',
    '$rootScope',
    function ($q, CacheFactory, $ionicPopup, FormInstanceService, FormDesignService, ProjectService, $rootScope) {

        return {
            sync: function () {
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
                    for (var i = 0; i < forms.length; i++) {
                        var formX = sync.get(forms[i]);
                        $rootScope.formi = forms[i];
                        if (formX) {
                            requests.push(FormDesignService.checkpermission(formX.formDesignId).then(function (result) {
                                if (result === true) {
                                    FormInstanceService.create_sync(formX)
                                }
                            }));
                        }
                    }
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
                            $rootScope.projects = result[0];
                            $rootScope.projectId = result[0][0].id;
                            $rootScope.navTitle = result[0][0].name;
                            for (var i = 0; i < result[0].length; i++) {
                                projectsCache.put(result[0][i].id, result[0][i]);
                            }
                            for (var i = 0; i < result[1].length; i++) {
                                designsCache.put(result[1][i].id, result[1][i]);
                            }
                            $rootScope.syncPopup.close();
                        }
                );
            }
        };
    }
]);
