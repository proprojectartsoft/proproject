angular.module($APP.name).factory('FormInstanceService', [
    '$rootScope',
    '$http',
    'CacheFactory',
    '$ionicPopup',
    '$location',
    function ($rootScope, $http, CacheFactory, $ionicPopup, $location) {
        var dateTimeSave = function (obj) {
            var aux;
            if (obj.value) {
                aux = obj.value;
            }
            else {
                aux = obj.field_values[0].value;
            }
            if (obj.type === "date") {
                var x = new Date(aux);
                var dd = x.getDate();
                var MM = x.getMonth() + 1; //January is 0!

                var yyyy = x.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (MM < 10) {
                    MM = '0' + MM;
                }
                console.log(obj)
                x = dd + '-' + MM + '-' + yyyy;
                return  x;

            }
            else {
                if (obj.type === "time") {
                    var x = new Date(aux);
                    var hh = x.getHours();
                    var mm = x.getMinutes();
                    if (hh < 10) {
                        hh = '0' + hh;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    x = hh + ':' + mm + ':';
                    return x;
                }
                else {
                    return obj.value;
                }
            }
        };
        return {
            get: function (id) {
                return $http.get($APP.server + '/api/forminstance', {
                    params: {id: id}
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            },
            create: function (data) {
                console.log('data', data)
                var settingsCache = CacheFactory.get('settings');
                if (!settingsCache) {
                    settingsCache = CacheFactory('settings');
                    settingsCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                var user = settingsCache.get('user');
                var requestForm = {
                    "id": 0,
                    "name": data.name,
                    "guidance": data.guidance,
                    "code": data.code,
                    "hash": null,
                    "project_id": $rootScope.projectId,
                    "customer_id": data.customer_id,
                    "category": data.category,
                    "category_id": data.category_id,
                    "user_id": user.id,
                    "created_on": 0,
                    "formDesignId": data.id,
                    "field_group_instances": []
                };
                var requestGroupList = [], requestFieldList = [];
                var requestGroup, requestField, requestOptions;
                for (var i = 0; i < data.field_group_designs.length; i++) {
                    requestGroup = {
                        "id": 0,
                        "name": data.field_group_designs[i].name,
                        "guidance": data.field_group_designs[i].guidance,
                        "position": data.field_group_designs[i].position,
                        "repeatable": data.field_group_designs[i].repeatable,
                        "form_instance_id": 0,
                        "field_instances": []
                    };
                    requestFieldList = [];
                    for (var j = 0; j < data.field_group_designs[i].field_designs.length; j++) {
                        var field_values = [];
                        if (data.field_group_designs[i].field_designs[j].type === 'checkbox_list') {
                            field_values = [];
                        }
                        else {
                            if (data.field_group_designs[i].field_designs[j].type === 'date' || data.field_group_designs[i].field_designs[j].type === 'time') {
                                console.log('date/time', data.field_group_designs[i].field_designs[j])
                                if (data.field_group_designs[i].field_designs[j].value === null || data.field_group_designs[i].field_designs[j].value === undefined) {
                                    field_values = [{
                                            "id": 0,
                                            "value": 0,
                                            "position": data.field_group_designs[i].field_designs[j].position,
                                            "field_instance_id": 0
                                        }];
                                }
                                else {
                                    field_values = [{
                                            "id": 0,
                                            "value": dateTimeSave(data.field_group_designs[i].field_designs[j]),
                                            "position": data.field_group_designs[i].field_designs[j].position,
                                            "field_instance_id": 0
                                        }];
                                }
                            }
                            else {
                                if (data.field_group_designs[i].field_designs[j].value) {
                                    field_values = [{
                                            "id": 0,
                                            "value": data.field_group_designs[i].field_designs[j].value,
                                            "position": data.field_group_designs[i].field_designs[j].position,
                                            "field_instance_id": 0
                                        }];
                                }
                                else {
                                    field_values = []
                                }
                            }
                        }

                        requestOptions = [];
                        for (var p = 0; p < data.field_group_designs[i].field_designs[j].option_designs.length; p++) {
                            requestOptions.push({
                                "enables_freeform": data.field_group_designs[i].field_designs[j].option_designs[p].enables_freeform,
                                "id": 0,
                                "name": data.field_group_designs[i].field_designs[j].option_designs[p].name,
                                "value": data.field_group_designs[i].field_designs[j].option_designs[p].value
                            })
                        }
                        requestField = {
                            "id": 0,
                            "name": data.field_group_designs[i].field_designs[j].name,
                            "guidance": data.field_group_designs[i].field_designs[j].guidance,
                            "type": data.field_group_designs[i].field_designs[j].type,
                            "validation": data.field_group_designs[i].field_designs[j].validation,
                            "placeholder": data.field_group_designs[i].field_designs[j].placeholder,
                            "required": data.field_group_designs[i].field_designs[j].required,
                            "repeatable": data.field_group_designs[i].field_designs[j].repeatable,
                            "position": data.field_group_designs[i].field_designs[j].position,
                            "inline": data.field_group_designs[i].field_designs[j].inline,
                            "field_group_instance_id": 0,
                            "default_value": data.field_group_designs[i].field_designs[j].default_value,
                            "register_nominated": data.field_group_designs[i].field_designs[j].register_nominated,
                            "option_instances": requestOptions,
                            "field_values": field_values
                        };
                        requestFieldList.push(requestField);
                    }
                    requestGroup.field_instances = requestFieldList;
//                        console.log('groupdata',requestGroup)
                    requestGroupList.push(requestGroup);
//                        console.log('groups',requestGroupList)
                }
                requestForm.field_group_instances = requestGroupList;

                if ($rootScope.toBeUploadedCount === undefined || $rootScope.toBeUploadedCount === NaN) {
                    $rootScope.toBeUploadedCount = 0;
                }

                return $http.post($APP.server + '/api/forminstance', requestForm, {
                    withCredentials: true
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
                        console.log('pana aici')
                        $rootScope.toBeUploadedCount = sync.keys().length;
                        $rootScope.toBeUploadedCount++;
                        sync.put($rootScope.toBeUploadedCount, requestForm);
                        var alertPopup = $ionicPopup.alert({
                            title: 'Submision failed.',
                            template: 'You are offline. Submit forms by syncing next time you are online',
                        });
                        alertPopup.then(function (res) {
                            $location.path("/app/category/" + $rootScope.projectId + '/' + $rootScope.categoryId);
                        });
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Submision failed.',
                            template: 'Incorrect data, try again',
                        });
                        alertPopup.then(function (res) {
                        });
                    }
                });
            },
            update: function (id, data) {
                var settingsCache = CacheFactory.get('settings');
                if (!settingsCache) {
                    settingsCache = CacheFactory('settings');
                    settingsCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                var user = settingsCache.get('user');

                var requestForm = {
                    "id": data.id,
                    "name": data.name,
                    "guidance": data.guidance,
                    "code": data.code,
                    "hash": data.hash,
                    "project_id": data.project_id,
                    "customer_id": data.customer_id,
                    "category": data.category,
                    "category_id": data.category_id,
                    "user_id": user.id,
                    "created_on": data.created_on,
                    "formDesignId": data.formDesignId,
                    "userName": data.userName,
                    "customerName": data.customerName,
                    "revised": data.revised,
                    "codeWithRevision": data.codeWithRevision,
                    "field_group_instances": []
                };
                var requestGroupList = [], requestFieldList = [], field_values;
                var requestGroup, requestField;
                for (var i = 0; i < data.field_group_instances.length; i++) {
                    requestGroup = {
                        "id": data.field_group_instances[i].id,
                        "name": data.field_group_instances[i].name,
                        "guidance": data.field_group_instances[i].guidance,
                        "position": data.field_group_instances[i].position,
                        "form_instance_id": data.field_group_instances[i].form_instance_id,
                        "repeatable": data.field_group_instances[i].repeatable,
                        "field_instances": []
                    };
                    requestFieldList = [];
                    for (var j = 0; j < data.field_group_instances[i].field_instances.length; j++) {
                        if (data.field_group_instances[i].field_instances[j].type === "checkbox_list") {
                            field_values = [];
                        }
                        else {
                            if (data.field_group_instances[i].field_instances[j].type === "select" && data.field_group_instances[i].field_instances[j].field_values[0]) {
                                data.field_group_instances[i].field_instances[j].field_values[0].value = data.field_group_instances[i].field_instances[j].value;
                                field_values = data.field_group_instances[i].field_instances[j].field_values;
                            }
                            else {
                                field_values = data.field_group_instances[i].field_instances[j].field_values;
                            }
                        }
                        if (data.field_group_instances[i].field_instances[j].type === "date" || data.field_group_instances[i].field_instances[j].type === "time") {
                            if (field_values[0].value === null || field_values[0].value === undefined) {
                                field_values[0].value = 0;
                            } else {
                                console.log(data.field_group_instances[i].field_instances[j])
                                field_values[0].value = dateTimeSave(data.field_group_instances[i].field_instances[j]);
                            }
                        }

                        requestField = {
                            "id": data.field_group_instances[i].field_instances[j].id,
                            "name": data.field_group_instances[i].field_instances[j].name,
                            "guidance": data.field_group_instances[i].field_instances[j].guidance,
                            "type": data.field_group_instances[i].field_instances[j].type,
                            "validation": data.field_group_instances[i].field_instances[j].validation,
                            "placeholder": data.field_group_instances[i].field_instances[j].placeholder,
                            "required": data.field_group_instances[i].field_instances[j].required,
                            "repeatable": data.field_group_instances[i].field_instances[j].repeatable,
                            "position": data.field_group_instances[i].field_instances[j].position,
                            "inline": data.field_group_instances[i].field_instances[j].inline,
                            "field_group_instance_id": data.field_group_instances[i].field_instances[j].field_group_instance_id,
                            "default_value": data.field_group_instances[i].field_instances[j].default_value,
                            "register_nominated": data.field_group_instances[i].field_instances[j].register_nominated,
                            "option_instances": data.field_group_instances[i].field_instances[j].option_instances,
                            "field_values": field_values
                        };
                        requestFieldList.push(requestField);
                    }
                    requestGroup.field_instances = requestFieldList;
//                        console.log('groupdata',requestGroup)
                    requestGroupList.push(requestGroup);
//                        console.log('groups',requestGroupList)
                }
                requestForm.field_group_instances = requestGroupList;
                console.log('create.requestForm', requestForm);

                return $http.put($APP.server + '/api/forminstance', requestForm, {
                    params: {'id': id}
                }).then(function (payload) {
                    $rootScope.$broadcast('instanceCreated');
                    return payload.data;
                });
                return $http.post($APP.server + '/api/forminstance', requestForm, {
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
                            template: 'You are offline. Edit forms by syncing next time you are online',
                        });
                        alertPopup.then(function (res) {
                            $location.path("/app/category/" + $rootScope.projectId + '/' + $rootScope.categoryId);
                        });
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Edit failed.',
                            template: 'Incorrect data, try again',
                        });
                        alertPopup.then(function (res) {
                        });
                    }
                });

            },
            list: function (projectId, categoryId) {
                //api/forminstance
                return $http.get($APP.server + '/api/forminstance', {
                    params: {projectId: projectId, categoryId: categoryId}
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            }
        };
    }
]);


