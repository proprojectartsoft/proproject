/* global angular */

angular.module($APP.name).service('ConvertersService', [
    '$rootScope', 'CacheFactory', '$stateParams',
    function ($rootScope, CacheFactory, $stateParams) {

        var designToInstanceValuesFormat = function (field) {
            var field_values, field_helper;
            if (field.type === 'text' || field.type === 'email' || field.type === 'textarea' || field.type === 'number') {
                if (field.value) {
                    field_values = [{"id": 0, "name": field.value, "value": field.value, "position": field.position, "field_instance_id": 0}];
                }
                else {
                    field_values = [{"id": 0, "name": field.value, "value": '', "position": field.position, "field_instance_id": 0}];
                }
            }
            if (field.type === 'date') {
                if (field.value) {
                    var x = new Date(field.value);
                    var dd = x.getDate();
                    var MM = x.getMonth() + 1;
                    var yyyy = x.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (MM < 10) {
                        MM = '0' + MM;
                    }
                    x = dd + '-' + MM + '-' + yyyy;
                    field_values = [{"id": 0, "name": x, "value": x, "position": field.position, "field_instance_id": 0}];
                }
                else {
                    field_values = [{"id": 0, "name": null, "value": '', "position": field.position, "field_instance_id": 0}];
                }
            }
            if (field.type === 'time') {
                if (field.value) {
                    var x = new Date(field.value);
                    var hh = x.getHours();
                    var mm = x.getMinutes();
                    if (hh < 10) {
                        hh = '0' + hh;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    x = hh + ':' + mm;
                    field_values = [{"id": 0, "name": x, "value": x, "position": field.position, "field_instance_id": 0}];
                }
                else {
                    field_values = [{"id": 0, "name": null, "value": '', "position": field.position, "field_instance_id": 0}];
                }
            }
            if (field.type === 'checkbox') {
                if (!field.value) {
                    field_values = [{"id": 0, "name": false, "value": false, "position": field.position, "field_instance_id": 0}];
                }
                else {
                    field_values = [{"id": 0, "name": true, "value": true, "position": field.position, "field_instance_id": 0}];
                }
            }
            if (field.type === 'select') {
                field_values = [];
                angular.forEach(field.option_designs, function (option_value) {
                    if (option_value.value === field.value) {
                        field_helper = {"id": 0, "name": option_value.name, "value": true, "position": field.position, "field_instance_id": 0};
                    }
                    else {
                        field_helper = {"id": 0, "name": option_value.name, "value": false, "position": field.position, "field_instance_id": 0};
                    }
                    field_values.push(field_helper);
                });
            }
            if (field.type === 'radio') {
                field_values = [];
                angular.forEach(field.option_designs, function (option_value) {
                    if (option_value.value === field.value) {
                        field_helper = {"id": 0, "name": option_value.name, "value": true, "position": field.position, "field_instance_id": 0};
                    }
                    else {
                        field_helper = {"id": 0, "name": option_value.name, "value": false, "position": field.position, "field_instance_id": 0};
                    }
                    field_values.push(field_helper);
                });
            }
            if (field.type === 'checkbox_list') {
                field_values = [];
                angular.forEach(field.option_designs, function (option_value) {
                    if (option_value.value === true) {
                        field_helper = {"id": 0, "name": option_value.name, "value": true, "position": field.position, "field_instance_id": 0};
                    }
                    else {
                        field_helper = {"id": 0, "name": option_value.name, "value": false, "position": field.position, "field_instance_id": 0};
                    }
                    field_values.push(field_helper);
                });
            }
            if (field.type === 'signature') {
                if (field.value) {
                    field_values = [{"id": 0, "name": 'Signature', "value": field.value, "position": field.position, "field_instance_id": 0}];
                }
                else {
                    field_values = [{"id": 0, "name": 'Signature', "value": '', "position": field.position, "field_instance_id": 0}];
                }
            }
            return field_values;
        };

        var instanceToInstanceValuesFormat = function (field) {
            var field_values, field_helper;
            if (field.type === 'date') {
                if (field.field_values[0].value) {
                    var dd = field.field_values[0].value.getDate();
                    var MM = field.field_values[0].value.getMonth() + 1;
                    var yyyy = field.field_values[0].value.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (MM < 10) {
                        MM = '0' + MM;
                    }
                    var x = dd + '-' + MM + '-' + yyyy;
                    field.field_values[0].name = x;
                    field.field_values[0].value = x;
                }
                else {
                    field.field_values[0].name = '0';
                    field.field_values[0].value = '0';
                }
                field_values = field.field_values;
            }
            if (field.type === 'time') {
                if (field.field_values[0].value) {
                    var hh = field.field_values[0].value.getHours();
                    var mm = field.field_values[0].value.getMinutes();
                    if (hh < 10) {
                        hh = '0' + hh;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    var x = hh + ':' + mm;
                    field.field_values[0].name = x;
                    field.field_values[0].value = x;
                }
                else {
                    field.field_values[0].name = '0';
                    field.field_values[0].value = '0';
                }
                field_values = field.field_values;
            }

            if (field.type === 'select') {
                field_values = [];
                angular.forEach(field.field_values, function (option_value) {
                    if (option_value.name === field.value) {
                        option_value.value = true;
                    }
                    else {
                        option_value.value = false;
                    }
                    field_values.push(option_value);
                });
                field_values = field.field_values;
            }
            if (field.type === 'radio') {
                field_values = [];
                angular.forEach(field.field_values, function (option_value) {
                    if (option_value.name === field.value) {
                        option_value.value = true;
                    }
                    else {
                        option_value.value = false;
                    }
                    field_values.push(option_value);
                });
            }
            if (field.type === 'checkbox' || field.type === 'signature' || field.type === 'checkbox_list' || field.type === 'text' || field.type === 'textarea'
                    || field.type === 'email' || field.type === 'number') {
                if (!field.field_values[0].value) {
                    field.field_values[0].value = "";
                }
                field_values = field.field_values;
            }
            if (field.type === 'checkbox_list') {
                field_values = [];
                angular.forEach(field.field_values, function (option_value) {
                    if (option_value.value === true) {
                        field_helper = {"id": option_value.id, "name": option_value.name, "value": true, "position": field.position, "field_instance_id": 0};
                    }
                    else {
                        field_helper = {"id": option_value.id, "name": option_value.name, "value": false, "position": field.position, "field_instance_id": 0};
                    }
                    field_values.push(field_helper);
                });
            }
            return field_values;
        };

        return {
            designToInstance: function (design) {
                var settings = CacheFactory.get('settings');
                if (!settings || settings.length === 0) {
                    settings = CacheFactory('settings');
                    settings.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                $rootScope.thisUser = settings.get("user");
                var requestForm = {
                    "id": 0,
                    "active": true,
                    "name": design.name,
                    "guidance": design.guidance,
                    "code": design.code,
                    "hash": null,
                    "pdf": design.pdf,
                    "project_id": parseInt($stateParams.projectId),
                    "customer_id": design.customer_id,
                    "category": design.category,
                    "category_id": design.category_id,
                    "user_id": $rootScope.thisUser.id,
                    "created_on": new Date().getTime(),
                    "updated_on": new Date().getTime(),
                    "formDesignId": design.id,
                    "field_group_instances": []
                };
                var requestGroupList = [], requestFieldList = [];
                var requestGroup, requestField;

                angular.forEach(design.field_group_designs, function (field_group) {
                    requestGroup = {
                        "id": 0,
                        "name": field_group.name,
                        "guidance": field_group.guidance,
                        "position": field_group.position,
                        "repeatable": field_group.repeatable,
                        "form_instance_id": 0,
                        "at_revision": "0",
                        "field_instances": []
                    };
                    requestFieldList = [];

                    angular.forEach(field_group.field_designs, function (field) {
                        requestField = {
                            "id": 0,
                            "name": field.name,
                            "guidance": field.guidance,
                            "type": field.type,
                            "validation": field.validation,
                            "placeholder": field.placeholder,
                            "required": field.required,
                            "repeatable": field.repeatable,
                            "position": field.position,
                            "inline": field.inline,
                            "field_group_instance_id": 0,
                            "default_value": field.default_value,
                            "register_nominated": field.register_nominated,
                            "at_revision": "0",
                            "option_instances": [],
                            "field_values": designToInstanceValuesFormat(field)
                        };
                        requestFieldList.push(requestField);
                    });
                    requestGroup.field_instances = requestFieldList;
                    requestGroupList.push(requestGroup);
                });
                requestForm.field_group_instances = requestGroupList;
                return(requestForm);
            },
            viewField: function (data) {
                if (data.type === "checkbox" && data.field_values && data.field_values.length > 0) {
                    if (data.field_values[0].value === 'true' || data.field_values[0].value === true) {
                        data.value = true;
                    }
                    else {
                        data.value = false;
                    }
                }
                if ((data.type === "select" || data.type === "radio") && data.field_values && data.field_values.length > 0) {
                    angular.forEach(data.field_values, function (entry) {
                        if (entry.value === true || entry.value === "true") {
                            data.value = entry.name;
                        }
                    });
                }
                if (data.type === "time" && data.field_values && data.field_values.length > 0) {
                    if (data.field_values[0].value !== '' && data.field_values[0].value !== 0 && data.field_values[0].value !== '0') {
                        data.value = new Date("01 " + data.field_values[0].value);
                    }
                    else {
                        data.value = null;
                    }
                }
                if (data.type === "date" && data.field_values && data.field_values.length > 0) {
                    var fix = data.field_values[0].value.substr(3, 2) + '-' + data.field_values[0].value.substr(0, 2) + '-' + data.field_values[0].value.substr(6, 4);
                    if (data.field_values[0].value !== '0' && data.field_values[0].value !== 0 && data.field_values[0].value !== '') {
                        data.value = new Date(fix);
                    }
                    else {
                        data.value = null;
                    }
                }
                return data;
            },
            instanceToUpdate: function (instance) {
                var data = angular.copy(instance);
                var settings = CacheFactory.get('settings');
                if (!settings || settings.length === 0) {
                    settings = CacheFactory('settings');
                    settings.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                $rootScope.thisUser = settings.get("user");
                var requestForm = {
                    "id": data.id,
                    "active": true,
                    "name": data.name,
                    "guidance": data.guidance,
                    "code": data.code,
                    "hash": data.hash,
                    "pdf": data.pdf,
                    "project_id": data.project_id,
                    "customer_id": data.customer_id,
                    "category": data.category,
                    "category_id": data.category_id,
                    "user_id": $rootScope.thisUser.id,
                    "created_on": data.created_on,
                    "updated_on": new Date().getTime(),
                    "formDesignId": data.formDesignId,
                    "form_number": data.form_number,
                    "userName": data.userName,
                    "customerName": data.customerName,
                    "revised": data.revised,
                    "codeWithRevision": data.codeWithRevision,
                    "field_group_instances": []
                };
                var requestGroupList = [], requestFieldList = [];
                var requestGroup, requestField;

                angular.forEach(data.field_group_instances, function (field_group) {

                    requestFieldList = [];
                    requestGroup = {
                        "id": field_group.id,
                        "name": field_group.name,
                        "guidance": field_group.guidance,
                        "position": field_group.position,
                        "form_instance_id": field_group.form_instance_id,
                        "repeatable": field_group.repeatable,
                        "at_revision": field_group.at_revision,
                        "field_instances": []
                    };

                    angular.forEach(field_group.field_instances, function (field) {
                        requestField = {
                            "id": field.id,
                            "name": field.name,
                            "guidance": field.guidance,
                            "type": field.type,
                            "validation": field.validation,
                            "placeholder": field.placeholder,
                            "required": field.required,
                            "repeatable": field.repeatable,
                            "position": field.position,
                            "inline": field.inline,
                            "field_group_instance_id": field.field_group_instance_id,
                            "default_value": field.default_value,
                            "register_nominated": field.register_nominated,
                            "at_revision": field.at_revision,
                            "option_instances": field.option_instances,
                            "field_values": instanceToInstanceValuesFormat(field)
                        };
                        requestFieldList.push(requestField);
                    });
                    requestGroup.field_instances = requestFieldList;
                    requestGroupList.push(requestGroup);
                });
                requestForm.field_group_instances = requestGroupList;
                return requestForm;
            },
            instanceToNew: function (instance) {
                var data = angular.copy(instance);
                var settings = CacheFactory.get('settings');
                if (!settings || settings.length === 0) {
                    settings = CacheFactory('settings');
                    settings.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                $rootScope.thisUser = settings.get("user");
                var requestForm = {
                    "id": 0,
                    "active": true,
                    "name": data.name,
                    "guidance": data.guidance,
                    "code": data.form_design_code,
                    "hash": null,
                    "pdf": data.pdf,
                    "project_id": data.project_id,
                    "customer_id": data.customer_id,
                    "category": data.category,
                    "category_id": data.category_id,
                    "user_id": $rootScope.thisUser.id,
                    "created_on": new Date().getTime(),
                    "updated_on": new Date().getTime(),
                    "formDesignId": data.formDesignId,
                    "field_group_instances": []
                };
                var requestGroupList = [], requestFieldList = [];
                var requestGroup, requestField;

                angular.forEach(data.field_group_instances, function (field_group) {

                    requestFieldList = [];
                    requestGroup = {
                        "id": 0,
                        "name": field_group.name,
                        "guidance": field_group.guidance,
                        "position": field_group.position,
                        "form_instance_id": 0,
                        "repeatable": field_group.repeatable,
                        "at_revision": "0",
                        "field_instances": []
                    };
                    angular.forEach(field_group.field_instances, function (field) {
                        var aux = instanceToInstanceValuesFormat(field);
                        angular.forEach(aux, function (val) {
                            val.id = 0;
                            val.field_instance_id = 0;
                        });

                        requestField = {
                            "id": 0,
                            "name": field.name,
                            "guidance": field.guidance,
                            "type": field.type,
                            "validation": field.validation,
                            "placeholder": field.placeholder,
                            "required": field.required,
                            "repeatable": field.repeatable,
                            "position": field.position,
                            "inline": field.inline,
                            "field_group_instance_id": 0,
                            "default_value": field.default_value,
                            "register_nominated": field.register_nominated,
                            "option_instances": field.option_instances,
                            "at_revision": "0",
                            "field_values": aux
                        };
                        requestFieldList.push(requestField);
                    });
                    requestGroup.field_instances = requestFieldList;
                    requestGroupList.push(requestGroup);
                });
                requestForm.field_group_instances = requestGroupList;
                return requestForm;
            },
            photoList: function (photos, id, project) {
                var list = photos;
                var requestList = [];
                console.log(id)
                for (var i = 0; i < list.length; i++) {
                    if (list[i].base64String !== "") {
                        list[i].id = 0;
                        list[i].formInstanceId = id;
                        list[i].projectId = project;
                        requestList.push(list[i]);
                    }
                }
                console.log(requestList)
                return requestList;
            }
        };
    }
]);