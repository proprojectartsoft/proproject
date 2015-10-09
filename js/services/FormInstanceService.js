angular.module($APP.name).factory('FormInstanceService', [
    '$rootScope',
    '$http',
    'CacheFactory',
    function ($rootScope, $http, CacheFactory) {

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
            create: function (data, index) {
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
                    "user_id": user.id,
                    "customer_id": data.customer_id,
                    "category": data.category,
                    "category_id": data.category_id,
                    "created_on": 0,
                    "formDesignId": data.id,
                    "field_group_instances": []
                };
                var requestGroupList = [], requestFieldList = [];
                var requestGroup, requestField;
                for (var i = 0; i < data.field_group_designs.length; i++) {
                    requestGroup = {
                        "id": 0,
                        "name": "Register test group",
                        "guidance": "description",
                        "position": 0,
                        "form_instance_id": 0,
                        "field_instances": []
                    }
                    for (var j = 0; j < data.field_group_designs[i].field_designs.length; j++) {
                        requestField = {
                            "id": 0,
                            "name": data.field_group_designs[i].field_designs[j].name,
                            "guidance": data.field_group_designs[i].field_designs[j].guidance,
                            "type": data.field_group_designs[i].field_designs[j].type,
                            "validation": data.field_group_designs[i].field_designs[j].validation,
                            "placeholder": data.field_group_designs[i].field_designs[j].placeholder,
                            "required": data.field_group_designs[i].field_designs[j].required,
                            "position": data.field_group_designs[i].field_designs[j].position,
                            "inline": data.field_group_designs[i].field_designs[j].inline,
                            "field_group_instance_id": 0,
                            "default_value": data.field_group_designs[i].field_designs[j].default_value,
                            "register_nominated": data.field_group_designs[i].field_designs[j].register_nominated,
                            "option_instances": data.field_group_designs[i].field_designs[j].option_design,
                            "field_values": [{
                                    "id": 0,
                                    "value": data.field_group_designs[i].field_designs[j].value,
                                    "position": 0,
                                    "field_instance_id": 0
                                }]
                        }
                        requestFieldList.push(requestField);
                    }
                    requestGroup.field_instances = requestFieldList;
                    requestGroupList.push(requestGroup);
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
                        sync.put($rootScope.toBeUploadedCount, data);
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


