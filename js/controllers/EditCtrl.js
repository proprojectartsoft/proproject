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
    '$ionicPopover',
    function ($scope, FormInstanceService, $timeout, FormUpdateService, $location, $rootScope, $ionicSideMenuDelegate, $ionicScrollDelegate, $ionicPopup, $ionicModal, $cordovaCamera, ConvertersService, ImageService, $ionicHistory, ResourceService, StaffService, SchedulingService, PayitemService, $ionicPopover) {

        $scope.filter = {
            edit: true,
            state: 'form',
            popup_title: 'Resource filter',
            popup_list: [],
            searchText: ''
        }

        $ionicPopover.fromTemplateUrl('view/search.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });

        $scope.filter.vat = $rootScope.custSett.vat;
        $scope.filter.currency = $rootScope.custSett.currency;
        $scope.filter.margin = $rootScope.custSett.margin;
        $scope.filter.start = $rootScope.custSett.start;
        $scope.filter.break = $rootScope.custSett.break;
        $scope.filter.finish = $rootScope.custSett.finish;
        $scope.doTotal = function (type, parent) {
            parent.total_cost = 0;
            if (type === 'resource') {
                angular.forEach(parent.resources, function (res) {
                    parent.total_cost = parent.total_cost + res.quantity * res.direct_cost;
                });
            }
            if (type === 'piresource') {
                console.log('piresource', parent)
                angular.forEach(parent.resources, function (res) {
                    parent.total_cost = parent.total_cost + res.quantity * res.direct_cost;
                    console.log(parent.total_cost, res.quantity, res.direct_cost)

                });
            }
            if (type === 'pisubresource') {
                angular.forEach(parent.resources, function (res) {
                    parent.total_cost = parent.total_cost + res.quantity * res.direct_cost;
                });
            }
            if (type === 'pisubtask') {
                console.log(parent)
                angular.forEach(parent.subtasks, function (stk) {
                    parent.total_cost = parent.total_cost + stk.total_cost;
                });
            }
            if (type === 'pi') {
                angular.forEach(parent.pay_items, function (pi) {
                    parent.total_cost = parent.total_cost + pi.total_cost;
                });
            }
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
        $scope.openPopover = function ($event, predicate, test) {
            $scope.filter.popup_predicate = predicate;
            if (test !== 'pi') {
                $scope.filter.pi = false;
                if (predicate.staff) {
                    $scope.filter.popup_list = $rootScope.staff_list;
                }
                else {
                    $scope.filter.popup_list = $rootScope.resource_list;
                }
            }
            else {
                $scope.filter.pi = true;
                PayitemService.list_payitems($scope.formData.projectId).then(function (data) {
                    $rootScope.payitem_list = data;
                    $scope.filter.popup_list = $rootScope.payitem_list;
                });

            }
            $scope.popover.show($event);
        };
        $scope.selectPopover = function (item) {
            if (!$scope.filter.pi) {
                $scope.filter.popup_predicate.name = item.name;
                console.log($scope.filter.popup_predicate)
                if (!$scope.filter.popup_predicate.staff) {
                    //resource
                    $scope.filter.popup_predicate.name = item.name;
                    $scope.filter.popup_predicate.product_ref = item.product_ref;
                    $scope.filter.popup_predicate.direct_cost = item.direct_cost;
                    angular.forEach($rootScope.resource_type_list, function (restyp) {
                        console.log(restyp.id, item.resource_type_id)
                        if (restyp.name === item.resource_type_name) {
                            $scope.filter.popup_predicate.res_type_obj = restyp;
                            $scope.filter.popup_predicate.resource_type_id = restyp.id;
                            $scope.filter.popup_predicate.resource_type_name = restyp.name;
                        }
                    });
                    angular.forEach($rootScope.unit_list, function (unt) {
                        if (unt.name === item.unit_name) {
                            $scope.filter.popup_predicate.unit_obj = unt;
                            $scope.filter.popup_predicate.unit_id = unt.id;
                            $scope.filter.popup_predicate.unit_name = unt.name;
                        }
                    });
                }
                else {
                    //staff
                    $scope.filter.popup_predicate.name = item.name;
                    $scope.filter.popup_predicate.employer_name = item.employee_name;
                    $scope.filter.popup_predicate.staff_role = item.role;
                    $scope.filter.popup_predicate.direct_cost = item.direct_cost;
                    angular.forEach($rootScope.resource_type_list, function (restyp) {
                        console.log(restyp.id, item.resource_type_id)
                        if (restyp.name === item.resource_type_name) {
                            $scope.filter.popup_predicate.res_type_obj = restyp;
                            $scope.filter.popup_predicate.resource_type_id = restyp.id;
                            $scope.filter.popup_predicate.resource_type_name = restyp.name;
                        }
                    });
                }
            }
            else {
                $scope.filter.popup_predicate.description = item.description;
                $scope.filter.popup_predicate.reference = item.reference;
                angular.forEach($rootScope.unit_list, function (unt) {
                    if (unt.name === item.unit_name) {
                        $scope.filter.popup_predicate.unit_obj = unt;
                        $scope.filter.popup_predicate.unit_id = unt.id;
                        $scope.filter.popup_predicate.unit_name = unt.name;
                    }
                });
            }
            $scope.popover.hide();
        }
        $scope.closePopover = function () {
            $scope.popover.hide();
        }
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
        $scope.imgURI = [
            {"id": $scope.imgCounter, "base64String": "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", "comment": "", "tags": "", "title": " ", "projectId": 0, "formInstanceId": 0},
            {"id": $scope.imgCounter, "base64String": "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", "comment": "", "tags": "", "title": " ", "projectId": 0, "formInstanceId": 0},
            {"id": $scope.imgCounter, "base64String": "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", "comment": "", "tags": "", "title": " ", "projectId": 0, "formInstanceId": 0},
            {"id": $scope.imgCounter, "base64String": "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", "comment": "", "tags": "", "title": " ", "projectId": 0, "formInstanceId": 0},
            {"id": $scope.imgCounter, "base64String": "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", "comment": "", "tags": "", "title": " ", "projectId": 0, "formInstanceId": 0},
        ]
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
                    start_time: $scope.filter.start,
                    break_time: $scope.filter.break,
                    finish_time: $scope.filter.finish,
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
        $scope.goPicture = function () {
//            $scope.trim();
            $scope.filter.state = 'photos';
            $scope.filter.substate = 'gallery'
            $timeout(function () { // we need little delay
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
            });
        }

        $scope.testPicture = function (item) {
//            $scope.trim();
            $scope.filter.substate = 'pic';
            console.log(item)
            $scope.filter.picture = item;
            console.log($scope.imgURI)
//            console.log($scope.imgURI[item], $scope.filter.picture)
        }
        $scope.trim = function () {
            $scope.pictures = [];
            var i, j, temparray, chunk = 3;
            if ($scope.imgURI) {
                for (i = 0, j = $scope.imgURI.length; i < j; i += chunk) {
                    temparray = $scope.imgURI.slice(i, i + chunk);
                    $scope.pictures.push(temparray);
                }
            }
        };
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
        $scope.imgURI = [];
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
                    var alertPopup = $ionicPopup.alert({
                        title: 'Form gallery',
                        template: 'Photo added. Check form gallery for more options.'
                    });
                    $scope.imgURI.push({
                        "id": 0,
                        "base64String": imageData,
                        "comment": "",
                        "tags": "",
                        "title": " ",
                        "projectId": 0,
                        "formInstanceId": 0
                    })
                    $scope.filter.picture = $scope.imgURI[$scope.imgURI.length - 1];
                    $scope.filter.state = 'form';
                    $scope.filter.substate = null;
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

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $timeout(function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Form gallery',
                        template: 'Photo added. Check form gallery for more options.'
                    });
                    $scope.imgURI.push({
                        "id": 0,
                        "base64String": imageData,
                        "comment": "",
                        "tags": "",
                        "title": " ",
                        "projectId": 0,
                        "formInstanceId": 0
                    })
                    $scope.filter.picture = $scope.imgURI[$scope.imgURI.length - 1];
                    $scope.filter.state = 'form';
                    $scope.filter.substate = null;
                });

            }, function (err) {
                // error
            });
        };
        $scope.removePicture = function (index) {
            if ($scope.imgURI.length !== 0) {
                $scope.imgURI.splice(index, 1);
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

        $scope.goToTop = function () {
            $timeout(function () { // we need little delay
                $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
            });
        }
    }
]);