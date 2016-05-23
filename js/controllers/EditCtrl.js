angular.module($APP.name).controller('EditCtrl', [
    '$scope',
    'FormInstanceService',
    '$timeout',
    'FormUpdateService',
    '$location',
    '$rootScope',
    '$ionicSideMenuDelegate',
    '$ionicScrollDelegate',
    '$ionicPopup',
    '$ionicModal',
    '$cordovaCamera',
    'ConvertersService',
    'ImageService',
    '$ionicHistory',
    'ResourceService',
    'StaffService',
    'SchedulingService',
    'PayitemService',
    function ($scope, FormInstanceService, $timeout, FormUpdateService, $location, $rootScope, $ionicSideMenuDelegate, $ionicScrollDelegate, $ionicPopup, $ionicModal, $cordovaCamera, ConvertersService, ImageService, $ionicHistory, ResourceService, StaffService, SchedulingService, PayitemService) {

        $scope.filter = {
            edit: true,
            state: 'form'
        }
        $scope.actionBtnPayitem = function () {
            if ($scope.filter.state === 'payitem' || $scope.filter.state === 'scheduling') {
                if ($scope.filter.substate && !$scope.filter.substateStk) {
                    if ($scope.filter.substate.resources.length === 0 && $scope.filter.substate.subtasks.length === 0) {
                        $scope.filter.actionBtn = !$scope.filter.actionBtn;
                    } else {
                        if ($scope.filter.substate.resources.length !== 0 && $scope.filter.substate.subtasks.length === 0) {
                            $scope.addResourcePi();
                        } else {
                            $scope.addSubtask();
                        }
                    }
                } else {
                    if ($scope.filter.substateStk) {
                        $scope.addResourceInSubtask();
                    } else {
                        $scope.addPayitem();
                    }
                }
            }
            if ($scope.filter.state === 'resource') {
                $scope.addResource();
            }
            if ($scope.filter.state === 'staff') {
                $scope.addStaff();
            }
        };
        $scope.addResource = function () {
            $scope.resourceField.resources.push({
                "id": 0,
                "resource_field_id": 0,
                "resource_id": 0,
                "position": 0,
                "name": '',
                "product_ref": '',
                "unit_id": 0,
                "unit_name": '',
                "resource_type_id": 0,
                "resource_type_name": '',
                "direct_cost": 0,
                "resource_margin": 0,
                "stage_id": 1,
                "stage_name": '',
                "vat": 0,
                "quantity": 0,
                "current_day": '',
                "total_cost": 0,
                "calculation": false,
                "open": true
            });
            $scope.filter.substate = $scope.resourceField.resources[$scope.resourceField.resources.length - 1];
        };
        $scope.addStaff = function () {
            if ($scope.staffField) {
                $scope.staffField.resources.push({
                    name: "",
                    customerId: 0,
                    employer_name: "",
                    staff_role: "",
                    product_ref: "",
                    unit_name: "",
                    direct_cost: 0.0,
                    resource_type_name: "",
                    resource_margin: 0,
                    telephone_number: "",
                    email: "",
                    safety_card_number: "",
                    expiry_date: "",
                    staff: true,
                    current_day: "",
                    start_time: "",
                    break_time: "",
                    finish_time: "",
                    total_time: "",
                    comment: "",
                    vat: 0.0
                })
                $scope.filter.substate = $scope.staffField.resources[ $scope.staffField.resources.length - 1];
            }
        }
        $scope.addPayitem = function () {
            $scope.payitemField.pay_items.push({
                "description": "",
                "reference": "",
                "unit": "",
                "quantity": "",
                "subtasks": [],
                "resources": []
            })
            $scope.filter.substate = $scope.payitemField.pay_items[$scope.payitemField.pay_items.length - 1]
        }
        $scope.addSubtask = function () {
            if ($scope.filter.substate && $scope.filter.substate.resources.length === 0) {
                $scope.filter.substate.subtasks.push({
                    "description": "",
                    "resources": [{
                            "open": false,
                            "resource_id": 0,
                            "position": 0,
                            "name": "",
                            "product_ref": "",
                            "unit_id": 0,
                            "unit_name": "",
                            "resource_type_id": 0,
                            "resource_type_name": "",
                            "direct_cost": 0,
                            "quantity": 0,
                            "resource_margin": 0,
                            "current_day": "",
                            "stage_id": 0,
                            "stage_name": "",
                            "calculation": true,
                            "vat": 0
                        }
                    ]
                });
                $scope.filter.substateStk = $scope.filter.substate.subtasks[$scope.filter.substate.subtasks.length - 1]
            }
        }
        $scope.addResourcePi = function () {
            if ($scope.filter.substate && $scope.filter.substate.subtasks.length === 0) {
                $scope.filter.substate.resources.push({
                    "open": false,
                    "resource_id": 0,
                    "position": 0,
                    "name": "",
                    "product_ref": "",
                    "unit_id": 0,
                    "unit_name": "",
                    "resource_type_id": 0,
                    "resource_type_name": "",
                    "direct_cost": 0,
                    "quantity": 0,
                    "resource_margin": 0,
                    "current_day": "",
                    "stage_id": 0,
                    "stage_name": "",
                    "calculation": true,
                    "vat": 0
                });
                $scope.filter.substateRes = $scope.filter.substate.resources[$scope.filter.substate.resources.length - 1]
            }
        }
        $scope.addResourceInSubtask = function () {
            if ($scope.filter.substateStk) {
                $scope.filter.substateStk.resources.push({
                    "open": false,
                    "resource_id": 0,
                    "position": 0,
                    "name": "",
                    "product_ref": "",
                    "unit_id": 0,
                    "unit_name": "",
                    "resource_type_id": 0,
                    "resource_type_name": "",
                    "direct_cost": 0,
                    "quantity": 0,
                    "resource_margin": 0,
                    "current_day": "",
                    "stage_id": 0,
                    "stage_name": "",
                    "vat": 0,
                    "calculation": true,
                });
                $scope.filter.substateStkRes = $scope.filter.substateStk.resources[$scope.filter.substateStk.resources.length - 1];
            }
        }
        $scope.actionBtnCalculation = function () {
            if ($scope.filter.substateRes) {
                $scope.filter.substateRes.calculation = !$scope.filter.substateRes.calculation;
            }
            if ($scope.filter.substateStkRes) {
                $scope.filter.substateStkRes.calculation = !$scope.filter.substateStkRes.calculation;
            }
        }
        $scope.deleteElement = function (parent, data) {
            var i = parent.indexOf(data);
            if (data.subtasks) {
                if (parent.length === 1) {
                    parent.splice(i, 1);
                    $scope.addPayitem();
                } else {
                    parent.splice(i, 1);
                }
            } else {
                if (i !== -1) {
                    parent.splice(i, 1);
                }
            }
        }


//        ==========================================================================================
        $scope.$on('$ionicView.enter', function () {
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.canDragContent(false);
        });
        $scope.formData = angular.copy($rootScope.rootForm);
        $scope.imgURI = [
            {
                "id": 0,
                "base64String": "",
                "comment": "",
                "tags": "",
                "title": " ",
                "projectId": 0,
                "formInstanceId": 0
            }
        ];
        $scope.trim = function () {
            $scope.pictures = [];
            var i, j, temparray, chunk = 3;
            for (i = 0, j = $scope.imgURI.length; i < j; i += chunk) {
                temparray = $scope.imgURI.slice(i, i + chunk);
                $scope.pictures.push(temparray);
            }
        };
        $scope.trim();
        $scope.addSpot = function () {
            if ($scope.imgURI.length < 9) {
                $scope.imgURI.push({"id": $scope.imgCounter, "base64String": "", "comment": "", "tags": "", "title": " ", "projectId": 0, "formInstanceId": 0});
                $scope.imgCounter++;
                $scope.trim();
            }
        };
        $scope.delSpot = function (id) {
            for (var i = 0; i < $scope.imgURI.length; i++) {
                if ($scope.imgURI[i].id === id) {
                    $scope.imgURI.splice(i, 1);
                    $scope.trim();
                    break;
                }
            }
        };

        $scope.test = function (item) {
            $scope.item = item;
            $ionicModal.fromTemplateUrl('view/form/_picture_modal.html', {
                scope: $scope
            }).then(function (modal) {
                $timeout(function () {
                    $scope.picModal = modal;
                    $scope.picModal.show();
                });
            });
        };
        $scope.doShow = function () {
            $scope.picModal.hide();
            $scope.picModal.remove();
        };
        $scope.takePicture = function (id) {
            var options = {
                quality: 60,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true,
                correctOrientation: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $timeout(function () {
                    $scope.item.base64String = imageData;
                });
            }, function (err) {
                // An error occured. Show a message to the user
            });
        };

        $scope.addPicture = function (index) {
            var options = {
                maximumImagesCount: 1,
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                correctOrientation: true,
                allowEdit: false
            };

            $cordovaCamera.getPicture(options).then(function (imageUri) {
                $timeout(function () {
                    $scope.item.base64String = imageUri;
                });

            }, function (err) {
                // error
            });
        };
        $scope.removePicture = function (index) {
            if ($scope.pictures.length !== 1) {
                for (var i = index; i < $scope.pictures.length - 1; i++) {
                    $scope.pictures[i].comment = angular.copy($scope.pictures[i + 1].comment);
                    $scope.pictures[i].base64String = angular.copy($scope.pictures[i + 1].base64String);
                }
                $scope.pictures.splice($scope.pictures.length - 1, 1)
            } else {
                $scope.pictures[0].base64String = "";
                $scope.pictures[0].comment = "";
            }
        };

        $scope.convertToDataURLviaCanvas = function (url, callback) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var dataURL;
                canvas.height = this.height;
                canvas.width = this.width;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL('image/jpg');
                callback(dataURL);
                canvas = null;
            };
            img.src = url;
        };
        FormInstanceService.get($rootScope.formId).then(function (data) {
            $rootScope.formData = data;
            $scope.formData = data;
        });

        $scope.submit = function (help) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Edit form',
                template: 'Are you sure you want to edit this form?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $timeout(function () {
                        var formUp = $ionicPopup.alert({
                            title: "Submitting",
                            template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                            content: "",
                            buttons: []
                        });
                        if ($scope.formData.resource_field_id) {
                            angular.forEach($rootScope.resourceField.resources, function (item) {
                                if (item.unit_obj) {
                                    item.unit_id = item.unit_obj.id;
                                    item.unit_name = item.unit_obj.name;
                                }
                                if (item.res_type_obj) {
                                    item.resource_type_id = item.res_type_obj.id;
                                    item.resource_type_name = item.res_type_obj.name;
                                }
                                if (item.stage_obj) {
                                    item.stage_id = item.stage_obj.id;
                                    item.stage_name = item.stage_obj.name;
                                }
                                if (item.absenteeism_obj) {
                                    item.abseteeism_reason_name = item.absenteeism_obj.reason;
                                }
                                if (item.current_day_obj) {
//                                            var date = new Date(item.current_day_obj);
//                                            item.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                    item.current_day = item.current_day_obj;
                                }
                            });
                            ResourceService.update_field($rootScope.resourceField).then(function (x) {
                            });
                        }
                        if ($scope.formData.pay_item_field_id) {
                            angular.forEach($rootScope.payitemField.pay_items, function (item) {
                                if (item.unit_obj) {
                                    item.unit = item.unit_obj.name;
                                    item.unit_id = item.unit_obj.id;
                                }
                                angular.forEach(item.resources, function (res) {
                                    if (res.unit_obj) {
                                        res.unit_id = res.unit_obj.id;
                                        res.unit_name = res.unit_obj.name;
                                    }
                                    if (res.res_type_obj) {
                                        res.resource_type_id = res.res_type_obj.id;
                                        res.resource_type_name = res.res_type_obj.name;
                                    }
                                    if (res.absenteeism_obj) {
                                        res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                    }
                                    if (res.current_day_obj) {
//                                                var date = new Date(res.current_day_obj);
//                                                res.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        res.current_day = res.current_day_obj;
                                    }
                                    if (res.expiry_date_obj) {
                                        var date = new Date(res.expiry_date_obj);
                                        res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                    }
                                });
                                angular.forEach(item.subtasks, function (subtask) {
                                    angular.forEach(subtask.resources, function (res) {
                                        if (res.unit_obj) {
                                            res.unit_id = res.unit_obj.id;
                                            res.unit_name = res.unit_obj.name;
                                        }
                                        if (res.res_type_obj) {
                                            res.resource_type_id = res.res_type_obj.id;
                                            res.resource_type_name = res.res_type_obj.name;
                                        }
                                        if (res.absenteeism_obj) {
                                            res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                        }
                                        if (res.current_day_obj) {
//                                                    var date = new Date(res.current_day_obj);
//                                                    res.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                            res.current_day = res.current_day_obj;
                                        }
                                        if (res.expiry_date_obj) {
                                            var date = new Date(res.expiry_date_obj);
                                            res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        }
                                    });
                                });
                            });
                            PayitemService.update_field($rootScope.payitemField).then(function (x) {
                            });
                        }
                        if ($scope.formData.scheduling_field_id) {
                            angular.forEach($rootScope.payitemField.pay_items, function (item) {
                                if (item.unit_obj) {
                                    item.unit = item.unit_obj.name;
                                    item.unit_id = item.unit_obj.id;
                                }
                                angular.forEach(item.resources, function (res) {
                                    if (res.unit_obj) {
                                        res.unit_id = res.unit_obj.id;
                                        res.unit_name = res.unit_obj.name;
                                    }
                                    if (res.res_type_obj) {
                                        res.resource_type_id = res.res_type_obj.id;
                                        res.resource_type_name = res.res_type_obj.name;
                                    }
                                    if (res.absenteeism_obj) {
                                        res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                    }
                                    if (res.current_day_obj) {
//                                                var date = new Date(res.current_day_obj);
//                                                res.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        res.current_day = res.current_day_obj;
                                    }
                                    if (res.expiry_date_obj) {
                                        var date = new Date(res.expiry_date_obj);
                                        res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                    }
                                });
                                angular.forEach(item.subtasks, function (subtask) {
                                    angular.forEach(subtask.resources, function (res) {
                                        if (res.unit_obj) {
                                            res.unit_id = res.unit_obj.id;
                                            res.unit_name = res.unit_obj.name;
                                        }
                                        if (res.res_type_obj) {
                                            res.resource_type_id = res.res_type_obj.id;
                                            res.resource_type_name = res.res_type_obj.name;
                                        }
                                        if (res.absenteeism_obj) {
                                            res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                        }
                                        if (res.current_day_obj) {
//                                    item.current_day = item.current_day_obj.getDate() + '-' + (item.current_day_obj.getMonth() + 1) + '-' + item.current_day_obj.getFullYear();
                                            res.current_day = res.current_day_obj.getTime();
                                        }
                                        if (res.expiry_date_obj) {
                                            var date = new Date(res.expiry_date_obj);
                                            res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        }
                                    });
                                });
                            });
                            SchedulingService.update_field($rootScope.payitemField).then(function (x) {
                            });
                        }
                        if ($scope.formData.staff_field_id) {
                            angular.forEach($rootScope.staffField.resources, function (item) {
                                if (item.res_type_obj) {
                                    item.resource_type_id = item.res_type_obj.id;
                                    item.resource_type_name = item.res_type_obj.name;
                                }
                                if (item.absenteeism_obj) {
                                    item.abseteeism_reason_name = item.absenteeism_obj.reason;
                                    item.absenteeism_obj.reason;
                                }
                                if (item.current_day_obj) {
//                                    item.current_day = item.current_day_obj.getDate() + '-' + (item.current_day_obj.getMonth() + 1) + '-' + item.current_day_obj.getFullYear();
                                    item.current_day = item.current_day_obj.getTime();
                                }
                                if (item.expiry_date_obj) {
//                                    item.expiry_date = item.expiry_date_obj.getDate() + '-' + (item.expiry_date_obj.getMonth() + 1) + '-' + item.expiry_date_obj.getFullYear();
                                    item.expiry_date = item.expiry_date_obj.getFullYear() + '-' + (item.expiry_date_obj.getMonth() + 1) + '-' + item.expiry_date_obj.getDate();
                                }
                                if (item.start_time_obj) {
                                    item.start_time = item.start_time_obj.getHours() + ':' + item.start_time_obj.getMinutes();
                                }
                                if (item.break_time_obj) {
                                    item.break_time = item.break_time_obj.getHours() + ':' + item.break_time_obj.getMinutes();
                                }
                                if (item.finish_time_obj) {
                                    item.finish_time = item.finish_time_obj.getHours() + ':' + item.finish_time_obj.getMinutes();
                                }
                            });
                            StaffService.update_field($rootScope.staffField).then(function (x) {
                            });
                        }
                        FormInstanceService.update($rootScope.formId, $scope.formData).then(function (data) {
                            if (data && data.status !== 0 && data.status !== 502 && data.status !== 403 && data.status !== 400) {
                                $rootScope.formId = data;
                                var list = ConvertersService.photoList($scope.imgURI, $scope.formData.id, $scope.formData.project_id);
                                if (list.length !== 0) {
                                    ImageService.create(list).then(function (x) {
                                        $timeout(function () {
                                            formUp.close();
                                            $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                        });
                                    });
                                } else {
                                    $timeout(function () {
                                        formUp.close();
                                        $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                    });
                                }
                            } else {
                                $timeout(function () {
                                    formUp.close();
                                    $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                });
                            }
                        });
                    });
                }
            });
        };
        $scope.saveAsNew = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Edit form',
                template: 'Are you sure you want to save this form?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $timeout(function () {
                        var formUp = $ionicPopup.alert({
                            title: "Submitting",
                            template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                            content: "",
                            buttons: []
                        });
                        if ($scope.formData.resource_field_id) {
                            angular.forEach($rootScope.resourceField.resources, function (item) {
                                if (item.unit_obj) {
                                    item.unit_id = item.unit_obj.id;
                                    item.unit_name = item.unit_obj.name;
                                }
                                if (item.res_type_obj) {
                                    item.resource_type_id = item.res_type_obj.id;
                                    item.resource_type_name = item.res_type_obj.name;
                                }
                                if (item.stage_obj) {
                                    item.stage_id = item.stage_obj.id;
                                    item.stage_name = item.stage_obj.name;
                                }
                                if (item.absenteeism_obj) {
                                    item.abseteeism_reason_name = item.absenteeism_obj.reason;
                                }
                                if (item.current_day_obj) {
//                                            var date = new Date(item.current_day_obj);
//                                            item.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                    item.current_day = item.current_day_obj;
                                }
                            });
                            ResourceService.add_field($rootScope.resourceField).then(function (x) {
                                $scope.formData.resource_field_id = x.id;
                                FormInstanceService.save_as($scope.formData).then(function (data) {
                                    if (data && data.status !== 0 && data.status !== 502 && data.status !== 403 && data.status !== 400) {
                                        $rootScope.formId = data.id;
                                        FormInstanceService.get($rootScope.formId).then(function (data) {
                                            var list = ConvertersService.photoList($scope.imgURI, $scope.formData.id, $scope.formData.project_id);
                                            if (list.length !== 0) {
                                                ImageService.create(list).then(function (x) {
                                                    $timeout(function () {
                                                        formUp.close();
                                                        $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                                    });
                                                });
                                            } else {
                                                $timeout(function () {
                                                    formUp.close();
                                                    $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                                });
                                            }
                                        });
                                    } else {
                                        $timeout(function () {
                                            formUp.close();
                                            $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                        });
                                    }
                                });
                            });
                        }
                        if ($scope.formData.pay_item_field_id) {
                            angular.forEach($rootScope.payitemField.pay_items, function (item) {
                                if (item.unit_obj) {
                                    item.unit = item.unit_obj.name;
                                    item.unit_id = item.unit_obj.id;
                                }
                                angular.forEach(item.resources, function (res) {
                                    if (res.unit_obj) {
                                        res.unit_id = res.unit_obj.id;
                                        res.unit_name = res.unit_obj.name;
                                    }
                                    if (res.res_type_obj) {
                                        res.resource_type_id = res.res_type_obj.id;
                                        res.resource_type_name = res.res_type_obj.name;
                                    }
                                    if (res.absenteeism_obj) {
                                        res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                    }
                                    if (res.current_day_obj) {
//                                                var date = new Date(res.current_day_obj);
//                                                res.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        res.current_day = res.current_day_obj;
                                    }
                                    if (res.expiry_date_obj) {
                                        var date = new Date(res.expiry_date_obj);
                                        res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                    }
                                });
                                angular.forEach(item.subtasks, function (subtask) {
                                    angular.forEach(subtask.resources, function (res) {
                                        if (res.unit_obj) {
                                            res.unit_id = res.unit_obj.id;
                                            res.unit_name = res.unit_obj.name;
                                        }
                                        if (res.res_type_obj) {
                                            res.resource_type_id = res.res_type_obj.id;
                                            res.resource_type_name = res.res_type_obj.name;
                                        }
                                        if (res.absenteeism_obj) {
                                            res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                        }
                                        if (res.current_day_obj) {
//                                                    var date = new Date(res.current_day_obj);
//                                                    res.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                            res.current_day = res.current_day_obj;
                                        }
                                        if (res.expiry_date_obj) {
                                            var date = new Date(res.expiry_date_obj);
                                            res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        }
                                    });
                                });
                            });
                            PayitemService.add_field($rootScope.payitemField).then(function (x) {
                                $scope.formData.pay_item_field_id = x.id;
                                FormInstanceService.save_as($scope.formData).then(function (data) {
                                    if (data && data.status !== 0 && data.status !== 502 && data.status !== 403 && data.status !== 400) {
                                        $rootScope.formId = data.id;
                                        FormInstanceService.get($rootScope.formId).then(function (data) {
                                            var list = ConvertersService.photoList($scope.imgURI, $scope.formData.id, $scope.formData.project_id);
                                            if (list.length !== 0) {
                                                ImageService.create(list).then(function (x) {
                                                    $timeout(function () {
                                                        formUp.close();
                                                        $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                                    });
                                                });
                                            } else {
                                                $timeout(function () {
                                                    formUp.close();
                                                    $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                                });
                                            }
                                        });
                                    } else {
                                        $timeout(function () {
                                            formUp.close();
                                            $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                        });
                                    }
                                });
                            });
                        }
                        if ($scope.formData.scheduling_field_id) {
                            angular.forEach($rootScope.payitemField.pay_items, function (item) {
                                if (item.unit_obj) {
                                    item.unit = item.unit_obj.name;
                                    item.unit_id = item.unit_obj.id;
                                }
                                angular.forEach(item.resources, function (res) {
                                    if (res.unit_obj) {
                                        res.unit_id = res.unit_obj.id;
                                        res.unit_name = res.unit_obj.name;
                                    }
                                    if (res.res_type_obj) {
                                        res.resource_type_id = res.res_type_obj.id;
                                        res.resource_type_name = res.res_type_obj.name;
                                    }
                                    if (res.absenteeism_obj) {
                                        res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                    }
                                    if (res.current_day_obj) {
//                                                var date = new Date(res.current_day_obj);
//                                                res.current_day = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        res.current_day = res.current_day_obj;
                                    }
                                    if (res.expiry_date_obj) {
                                        var date = new Date(res.expiry_date_obj);
                                        res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                    }
                                });
                                angular.forEach(item.subtasks, function (subtask) {
                                    angular.forEach(subtask.resources, function (res) {
                                        if (res.unit_obj) {
                                            res.unit_id = res.unit_obj.id;
                                            res.unit_name = res.unit_obj.name;
                                        }
                                        if (res.res_type_obj) {
                                            res.resource_type_id = res.res_type_obj.id;
                                            res.resource_type_name = res.res_type_obj.name;
                                        }
                                        if (res.absenteeism_obj) {
                                            res.abseteeism_reason_name = res.absenteeism_obj.reason;
                                        }
                                        if (res.current_day_obj) {
//                                    item.current_day = item.current_day_obj.getDate() + '-' + (item.current_day_obj.getMonth() + 1) + '-' + item.current_day_obj.getFullYear();
                                            res.current_day = res.current_day_obj.getTime();
                                        }
                                        if (res.expiry_date_obj) {
                                            var date = new Date(res.expiry_date_obj);
                                            res.expiry_date = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
                                        }
                                    });
                                });
                            });
                            SchedulingService.add_field($rootScope.payitemField).then(function (x) {
                                $scope.formData.scheduling_field_id = x.id;
                                FormInstanceService.save_as($scope.formData).then(function (data) {
                                    if (data && data.status !== 0 && data.status !== 502 && data.status !== 403 && data.status !== 400) {
                                        $rootScope.formId = data.id;
                                        FormInstanceService.get($rootScope.formId).then(function (data) {
                                            var list = ConvertersService.photoList($scope.imgURI, $scope.formData.id, $scope.formData.project_id);
                                            if (list.length !== 0) {
                                                ImageService.create(list).then(function (x) {
                                                    $timeout(function () {
                                                        formUp.close();
                                                        $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                                    });
                                                });
                                            } else {
                                                $timeout(function () {
                                                    formUp.close();
                                                    $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                                });
                                            }
                                        });
                                    } else {
                                        $timeout(function () {
                                            formUp.close();
                                            $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                        });
                                    }
                                });
                            });
                        }
                        if ($scope.formData.staff_field_id) {
                            angular.forEach($rootScope.staffField.resources, function (item) {
                                if (item.res_type_obj) {
                                    item.resource_type_id = item.res_type_obj.id;
                                    item.resource_type_name = item.res_type_obj.name;
                                }
                                if (item.absenteeism_obj) {
                                    item.abseteeism_reason_name = item.absenteeism_obj.reason;
                                    item.absenteeism_obj.reason;
                                }
                                if (item.current_day_obj) {
//                                    item.current_day = item.current_day_obj.getDate() + '-' + (item.current_day_obj.getMonth() + 1) + '-' + item.current_day_obj.getFullYear();
//                                    console.log(typeof(item.current_day_obj))
                                    item.current_day = item.current_day_obj.getTime();
                                }
                                if (item.expiry_date_obj) {
//                                    item.expiry_date = item.expiry_date_obj.getDate() + '-' + (item.expiry_date_obj.getMonth() + 1) + '-' + item.expiry_date_obj.getFullYear();
                                    item.expiry_date = item.expiry_date_obj.getFullYear() + '-' + (item.expiry_date_obj.getMonth() + 1) + '-' + item.expiry_date_obj.getDate();
                                }
                                if (item.start_time_obj) {
                                    item.start_time = item.start_time_obj.getHours() + ':' + item.start_time_obj.getMinutes();
                                }
                                if (item.break_time_obj) {
                                    item.break_time = item.break_time_obj.getHours() + ':' + item.break_time_obj.getMinutes();
                                }
                                if (item.finish_time_obj) {
                                    item.finish_time = item.finish_time_obj.getHours() + ':' + item.finish_time_obj.getMinutes();
                                }
                            });
                            StaffService.add_field($rootScope.staffField).then(function (x) {
                                $scope.formData.staff_field_id = x.id;
                                FormInstanceService.save_as($scope.formData).then(function (data) {
                                    if (data && data.status !== 0 && data.status !== 502 && data.status !== 403 && data.status !== 400) {
                                        $rootScope.formId = data.id;
                                        FormInstanceService.get($rootScope.formId).then(function (data) {
                                            var list = ConvertersService.photoList($scope.imgURI, $scope.formData.id, $scope.formData.project_id);
                                            if (list.length !== 0) {
                                                ImageService.create(list).then(function (x) {
                                                    $timeout(function () {
                                                        formUp.close();
                                                        $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                                    });
                                                });
                                            } else {
                                                $timeout(function () {
                                                    formUp.close();
                                                    $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                                });
                                            }
                                        });
                                    } else {
                                        $timeout(function () {
                                            formUp.close();
                                            $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                        });
                                    }
                                });
                            });
                        }
                        if (!$scope.formData.scheduling_field_id && !$scope.formData.staff_field_id && !$scope.formData.resource_field_id && !$scope.formData.pay_item_field_id) {
                            FormInstanceService.save_as($scope.formData).then(function (data) {
                                if (data && data.status !== 0 && data.status !== 502 && data.status !== 403 && data.status !== 400) {
                                    $rootScope.formId = data.id;
                                    FormInstanceService.get($rootScope.formId).then(function (data) {
                                        var list = ConvertersService.photoList($scope.imgURI, $scope.formData.id, $scope.formData.project_id);
                                        if (list.length !== 0) {
                                            ImageService.create(list).then(function (x) {
                                                $timeout(function () {
                                                    formUp.close();
                                                    $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                                });
                                            });
                                        } else {
                                            $timeout(function () {
                                                formUp.close();
                                                $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                            });
                                        }
                                    });
                                } else {
                                    $timeout(function () {
                                        formUp.close();
                                        $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                    });
                                }
                            });
                        }
                    });
                }
            });

        };

        function elmYPosition(id) {
            var elm = document.getElementById(id);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent !== document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            }
            return y;
        }

        $scope.goto = function (id) {
            if (id) {
                $scope.scroll_ref = $timeout(function () { // we need little delay
                    var stopY = elmYPosition(id) - 40;
                    $ionicScrollDelegate.scrollTo(0, stopY, true);

                }, 50);
            }
        };

        $scope.toggleGroup = function (group, id) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
            $scope.goto(id);
        };

        $scope.repeatGroup = function (x) {
            var aux = {};
            console.log(x);
            angular.copy(x, aux);
            aux.repeatable = true;
            aux.id = 0;
            for (var i = 0; i < aux.field_instances.length; i++) {
                aux.field_instances[i].field_group_instance_id = 0;
                aux.field_instances[i].id = 0;
                if (aux.field_instances.option_instances) {
                    for (var j = 0; j < aux.field_instances[i].option_instances.length; j++) {
                        aux.field_instances[i].option_instances[j].id = 0;
                        aux.field_instances[i].option_instances[j].field_instance_id = 0;
                    }
                }
                for (var j = 0; j < aux.field_instances[i].field_values.length; j++) {
                    aux.field_instances[i].field_values[j].name = x.field_instances[i].field_values[j].name;
                    aux.field_instances[i].field_values[j].value = x.field_instances[i].field_values[j].value;
                    aux.field_instances[i].field_values[j].id = 0;
                    aux.field_instances[i].field_values[j].field_instance_id = 0;
                }
            }
            console.log(aux);
            for (var i = 0; i < $scope.formData.field_group_instances.length; i++) {
                if (x === $scope.formData.field_group_instances[i]) {
                    $scope.formData.field_group_instances.splice(i + 1, 0, aux);
                    break;
                }
            }
        };

        $scope.repeatField = function (x, y) {
            var test = {};
            angular.copy(y, test);
            test.repeatable = true;
            test.id = 0;
            for (var i = 0; i < x.field_instances.length; i++) {
                if (x.field_instances[i] === y) {
                    if (x.field_instances.field_values) {
                        for (var j = 0; j <= x.field_instances.field_values.length; j++) {
                            test.field_instances.field_values[j].id = 0;
                        }
                    }
                    x.field_instances.splice(i + 1, 0, test);
                    break;
                }
            }
        };

        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };

        $scope.$on('updateScopeFromDirective', function () {
            FormUpdateService.addProduct($scope.formData, $scope.modalHelper);
        });

        $scope.$on('moduleSaveChanges', function () {
            $scope.formData = FormUpdateService.getProducts();
        });
    }
]);