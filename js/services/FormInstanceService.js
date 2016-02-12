angular.module($APP.name).factory('FormInstanceService', [
    '$rootScope',
    '$http',
    'CacheFactory',
    '$ionicPopup',
    '$location',
    '$timeout',
    '$state',
    'ConvertersService',
    'ImageService',
    function ($rootScope, $http, CacheFactory, $ionicPopup, $location, $timeout, $state, ConvertersService, ImageService) {

        return {
            get: function (id) {
                return $http.get($APP.server + '/api/forminstance', {
                    params: {id: id}
                }).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                });
            },
            create: function (data, imgUri) {
                var requestForm = ConvertersService.designToInstance(data)

//                var sw = true;
//                if(list.length === 1 && list[0].base64String === ""){
//                    sw = false;
//                }
//                if (list.length >= 1) {
//                    if (list[0].base64String !== "") {
//                        ImageService.create(list).then(function (x) {
//                            $rootScope.formUp.close();
//                            $state.go('app.formInstance', {'projectId': $rootScope.projectId, 'type': 'form', 'formId': data.id});
//                        });
//                    } else {
//                        $rootScope.formUp.close();
//                        $state.go('app.formInstance', {'projectId': $rootScope.projectId, 'type': 'form', 'formId': data.id});
//                    }
//                } else {
//                    $rootScope.formUp.close();
//                    $state.go('app.formInstance', {'projectId': $rootScope.projectId, 'type': 'form', 'formId': data.id});
//                }


                return $http.post($APP.server + '/api/forminstance', requestForm, {
                    withCredentials: true
                }).then(function (payload) {
                    if (payload.data.message) {
                        $rootScope.formUp.close();
                        $timeout(function () {
                            var alertPopup3 = $ionicPopup.alert({
                                title: 'Submision failed.',
                                template: 'You have not permission to do this operation'
                            });
                            alertPopup3.then(function (res) {
                                $rootScope.$broadcast('sync.todo');
                            });
                        });
                    }
                    else {
                        console.log(payload)
                        var list = ConvertersService.photoList(imgUri, payload.data.id);
                        if (list.length !== 0) {
                            ImageService.create(list).then(function (x) {
                                return x;
                            });
                        }
                    }
                    return payload.data;
                }, function errorCallback(payload) {
//                    $rootScope.formUp.close();
                    if (payload.status === 0 || payload.status === 502) {
                        var sync = CacheFactory.get('sync');
                        if (!sync) {
                            sync = CacheFactory('sync');
                        }
                        sync.setOptions({
                            storageMode: 'localStorage'
                        });
                        $rootScope.toBeUploadedCount = sync.keys().length;
                        $rootScope.toBeUploadedCount++;
                        sync.put($rootScope.toBeUploadedCount, requestForm);
                        $timeout(function () {
                            $rootScope.formUp.close();
                            var alertPopup = $ionicPopup.alert({
                                title: 'Submision failed.',
                                template: 'You are offline. Submit forms by syncing next time you are online'
                            }).then(function (res) {
                                $state.go('app.forms', {'projectId': $rootScope.projectId, 'categoryId': requestForm.category_id});
                            });
                        });
                    }
                    else {
                        $timeout(function () {
                            $rootScope.formUp.close();
                            var alertPopup2 = $ionicPopup.alert({
                                title: 'Submision failed.',
                                template: 'Incorrect data, try again'
                            });
                            alertPopup2.then(function (res) {
                            });
                        });
                    }
                });
            },
            create_sync: function (dataIn) {
                return $http({
                    method: 'POST',
                    url: $APP.server + '/api/forminstance',
                    data: dataIn
                }).then(function (response) {
                });
            },
            update: function (id, data) {
                var requestForm = ConvertersService.instanceToUpdate(data);
                console.log(data)
                console.log(requestForm)
                return $http.put($APP.server + '/api/forminstance', requestForm, {
                    params: {'id': id}
                }).then(function (payload) {
                    return payload.data;
                }, function (payload) {
                    if (payload.status === 0 || payload.status === 502) {
                        var sync = CacheFactory.get('sync');
                        if (!sync) {
                            sync = CacheFactory('sync');
                        }
                        sync.setOptions({
                            storageMode: 'localStorage'
                        });
                        $rootScope.toBeUploadedCount = sync.keys().length;
                        $rootScope.toBeUploadedCount++;
                        sync.put($rootScope.toBeUploadedCount, requestForm);
                        var alertPopup = $ionicPopup.alert({
                            title: 'Edit failed.',
                            template: 'You are offline. Edit forms by syncing next time you are online'
                        });
                        $location.path("/app/category/" + $rootScope.projectId + '/' + $rootScope.categoryId);
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Edit failed.',
                            template: 'Incorrect data, try again'
                        });
                    }
                });
            },
            save_as: function (data) {
                var requestForm = ConvertersService.instanceToNew(data);
                return $http.post($APP.server + '/api/forminstance', requestForm, {
                    withCredentials: true
                }).then(function (payload) {
                    if (payload.data.message) {
                        $rootScope.formUp.close();
                        $timeout(function () {
                            var alertPopup3 = $ionicPopup.alert({
                                title: 'Submision failed.',
                                template: 'You have not permission to do this operation'
                            });
                            alertPopup3.then(function (res) {
                                $rootScope.$broadcast('sync.todo');
                            });
                        }, 10);
                    }
                    return payload.data;
                }, function (payload) {
                    $rootScope.formUp.close();
                    if (payload.status === 0 || payload.status === 502) {
                        var sync = CacheFactory.get('sync');
                        if (!sync) {
                            sync = CacheFactory('sync');
                        }
                        sync.setOptions({
                            storageMode: 'localStorage'
                        });
                        $rootScope.toBeUploadedCount = sync.keys().length;
                        $rootScope.toBeUploadedCount++;
                        sync.put($rootScope.toBeUploadedCount, requestForm);
                        $timeout(function () {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Submision failed.',
                                template: 'You are offline. Submit forms by syncing next time you are online'
                            }).then(function (res) {
                                $state.go('app.forms', {'projectId': $rootScope.projectId, 'categoryId': requestForm.category_id});
                            });
                        }, 100);
                    }
                    else {
                        $rootScope.formUp.close();
                        var alertPopup2 = $ionicPopup.alert({
                            title: 'Submision failed.',
                            template: 'Incorrect data, try again'
                        });
                        alertPopup2.then(function (res) {
                        });
                    }
                });
            },
            list: function (projectId, categoryId) {
                return $http.get($APP.server + '/api/forminstance', {
                    params: {projectId: projectId, categoryId: categoryId}
                }).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                });
            },
            list_mobile: function (projectId) {
                return $http.get($APP.server + '/api/forminstance', {
                    params: {projectId: projectId}
                }).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                });
            }
        };
    }
]);


