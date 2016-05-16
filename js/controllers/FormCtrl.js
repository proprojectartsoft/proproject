angular.module($APP.name).controller('FormCtrl', [
    '$scope',
    'FormInstanceService',
    '$timeout',
    'FormUpdateService',
    '$location',
    '$rootScope',
    'CacheFactory',
    '$ionicScrollDelegate',
    '$ionicPopup',
    '$stateParams',
    'ConvertersService',
    '$ionicModal',
    '$cordovaCamera',
    '$state',
    'SyncService',
    '$ionicSideMenuDelegate',
    '$ionicHistory',
    'ResourceService',
    function ($scope, FormInstanceService, $timeout, FormUpdateService, $location, $rootScope, CacheFactory, $ionicScrollDelegate, $ionicPopup, $stateParams, ConvertersService, $ionicModal, $cordovaCamera, $state, SyncService, $ionicSideMenuDelegate, $ionicHistory, ResourceService) {
        $scope.$on('$ionicView.enter', function () {
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.canDragContent(false);
        });
        $ionicSideMenuDelegate.canDragContent(false);

        var designsCache = CacheFactory.get('designsCache');
        if (!designsCache || designsCache.length === 0) {
            designsCache = CacheFactory('designsCache');
            designsCache.setOptions({
                storageMode: 'localStorage'
            });
        }

        $scope.filter = {
            state: 'form'
        };
        $scope.items = [
            {display: 'Hello'},
            {display: 'Baha'},
            {display: 'Ala'},
            {display: 'Siwar'},
            {display: 'Monira'},
            {display: 'Samir'},
            {display: 'Spange Bob'},
            {display: 'Deneris Targariant'},
            {display: 'Ned Stark'}
        ];
        $scope.onSelect = function (item) {
            console.log('item', item);
            if ($scope.filter.state === 'resource') {
                $scope.filter.substate.name = item.name;
                $scope.filter.substate.product_ref = item.product_ref;
                $scope.filter.substate.direct_cost = item.direct_cost;
                angular.forEach($rootScope.unit_list, function (unit) {
                    if (unit.id === item.unit_id) {
                        $scope.filter.substate.unit_obj = unit;
                    }
                });
                angular.forEach($rootScope.resource_type_list, function (res_type) {
                    if (res_type.id === item.resource_type_id) {
                        $scope.filter.substate.resource_type_obj = res_type;
                    }
                });
            }
        };

        $scope.formData = designsCache.get($stateParams.formId);
        $scope.shownGroup = $scope.formData.field_group_designs[0];
        if ($scope.formData.resource_field_design) {
            $scope.resourceField = {
                'id': 0,
                'customer_id': $scope.formData.customer_id,
                'register_nominated': $scope.formData.resource_field_design.register_nominated,
                'date_option': $scope.formData.resource_field_design.date_option,
                'financial_option': $scope.formData.resource_field_design.financial_option,
                'total_cost': 0,
                'resources': [
                    {
                        "id": 0,
                        "resource_field_id": 0,
                        "resource_id": 0,
                        "position": 0,
                        "calculation": false,
                        "name": '', "product_ref": '', "unit_id": 0,
                        "unit_name": '', "resource_type_id": 0,
                        "resource_type_name": '', "direct_cost": 0,
                        "resource_margin": 0,
                        "stage_id": 1,
                        "stage_name": '', "vat": 0,
                        "quantity": 0,
                        "current_day": '', "total_cost": 0,
                        "staff_role": '', "expiry_date": '',
                        "abseteeism_reason_name": ''
                    }
                ]
            };
            $scope.filter.substate = $scope.resourceField.resources[0];
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
        }
        $scope.$watch('filter.substate', function (newValue, oldValue) {
            if (newValue === null) {
                $scope.resourceField.total_cost = 0;
                angular.forEach($scope.resourceField.resources, function (res) {
                    $scope.resourceField.total_cost += res.quantity * res.direct_cost;
                });
            }
        });



        $scope.imgCounter = 1;
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


        $scope.submit = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'New form',
                template: 'Are you sure you want to submit the data?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    if ($scope.picModal) {
                        $scope.picModal.remove();
                        if ($scope.picModal) {
                            delete $scope.picModal;
                        }
                    }
                    console.log($scope)
                    $timeout(function () {
                        var formUp = $ionicPopup.alert({
                            title: "Submitting",
                            template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                            content: "",
                            buttons: []
                        });
                        if ($scope.formData.resource_field_design) {
                            angular.forEach($scope.resourceField.resources, function (item) {
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
                            ResourceService.add_field($scope.resourceField).then(function (x) {
                                $scope.formData.resource_field_id = x.id;
                                FormInstanceService.create($scope.formData, $scope.imgURI).then(
                                        function successCallback(data) {
                                            if (data && data.data && data.data.message) {
                                                $timeout(function () {
                                                    formUp.close();
                                                    $timeout(function () {
                                                        var alertPopup3 = $ionicPopup.alert({
                                                            title: 'Submision failed.',
                                                            template: 'You have not permission to do this operation'
                                                        });
                                                        alertPopup3.then(function (res) {
                                                            $rootScope.$broadcast('sync.todo');
                                                        });
                                                    });
                                                });
                                            }
                                            else {
                                                if (data && data.status !== 0 && data.status !== 502 && data.status !== 403 && data.status !== 400) {
                                                    $rootScope.formId = data.id;
                                                    if (!data.message && data.status !== 0) {
                                                        FormInstanceService.get($rootScope.formId).then(function (data) {
                                                            $rootScope.rootForm = data;
                                                            formUp.close();
                                                            $state.go('app.formInstance', {'projectId': $rootScope.projectId, 'type': 'form', 'formId': data.id});
                                                        });
                                                    }
                                                }
                                                else {
                                                    if (data && data.status === 400) {
                                                        $timeout(function () {
                                                            formUp.close();
                                                            $timeout(function () {
                                                                var alertPopup2 = $ionicPopup.alert({
                                                                    title: 'Submision failed.',
                                                                    template: 'Incorrect data, try again'
                                                                });
                                                                alertPopup2.then(function (res) {
                                                                });
                                                            });
                                                        });
                                                    }
                                                    else {
                                                        $timeout(function () {
                                                            formUp.close();
                                                            $timeout(function () {
                                                                var alertPopup = $ionicPopup.alert({
                                                                    title: 'Submision failed.',
                                                                    template: 'You are offline. Submit forms by syncing next time you are online'
                                                                }).then(function (res) {
                                                                    $state.go('app.forms', {'projectId': $rootScope.projectId, 'categoryId': $scope.formData.category_id});
                                                                });
                                                            });
                                                        });
                                                    }

                                                }
                                            }
                                        });
                            });
                        }
                        FormInstanceService.create($scope.formData, $scope.imgURI).then(
                                function successCallback(data) {
                                    if (data && data.data && data.data.message) {
                                        $timeout(function () {
                                            formUp.close();
                                            $timeout(function () {
                                                var alertPopup3 = $ionicPopup.alert({
                                                    title: 'Submision failed.',
                                                    template: 'You have not permission to do this operation'
                                                });
                                                alertPopup3.then(function (res) {
                                                    $rootScope.$broadcast('sync.todo');
                                                });
                                            });
                                        });
                                    }
                                    else {
                                        if (data && data.status !== 0 && data.status !== 502 && data.status !== 403 && data.status !== 400) {
                                            $rootScope.formId = data.id;
                                            if (!data.message && data.status !== 0) {
                                                FormInstanceService.get($rootScope.formId).then(function (data) {
                                                    $rootScope.rootForm = data;
                                                    formUp.close();
                                                    $state.go('app.formInstance', {'projectId': $rootScope.projectId, 'type': 'form', 'formId': data.id});
                                                });
                                            }
                                        }
                                        else {
                                            if (data && data.status === 400) {
                                                $timeout(function () {
                                                    formUp.close();
                                                    $timeout(function () {
                                                        var alertPopup2 = $ionicPopup.alert({
                                                            title: 'Submision failed.',
                                                            template: 'Incorrect data, try again'
                                                        });
                                                        alertPopup2.then(function (res) {
                                                        });
                                                    });
                                                });
                                            }
                                            else {
                                                $timeout(function () {
                                                    formUp.close();
                                                    $timeout(function () {
                                                        var alertPopup = $ionicPopup.alert({
                                                            title: 'Submision failed.',
                                                            template: 'You are offline. Submit forms by syncing next time you are online'
                                                        }).then(function (res) {
                                                            $state.go('app.forms', {'projectId': $rootScope.projectId, 'categoryId': $scope.formData.category_id});
                                                        });
                                                    });
                                                });
                                            }

                                        }
                                    }
                                });
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
                    var stopY = elmYPosition(id) - 48;
                    $ionicScrollDelegate.scrollTo(0, stopY, true);
                }, 50);
            }
        };

        $scope.repeatGroup = function (x) {
            var aux = {};
            angular.copy(x, aux);
            aux.repeatable = true;
            aux.id = 0;
            for (var i = 0; i < aux.field_designs.length; i++) {
                aux.field_designs[i].field_group_design_id = 0;
                aux.field_designs[i].id = 0;
                if (aux.field_designs[i].option_designs) {
                    for (var j = 0; j < aux.field_designs[i].option_designs.length; j++) {
                        aux.field_designs[i].option_designs[j].id = 0;
                        aux.field_designs[i].option_designs[j].field_design_id = 0;
                    }
                }
                if (aux.field_designs[i].field_values) {
                    for (var j = 0; j < aux.field_designs[i].field_values.length; j++) {
                        aux.field_designs[i].field_values[j].id = 0;
                        aux.field_designs[i].field_values[j].field_design_id = 0;
                    }
                }
            }
            for (var i = 0; i < $scope.formData.field_group_designs.length; i++) {
                if (x === $scope.formData.field_group_designs[i]) {
                    $scope.formData.field_group_designs.splice(i + 1, 0, aux);
                    break;
                }
            }
        };

        $scope.repeatField = function (x, y) {
            var test = {};
            angular.copy(y, test);
            test.repeatable = true;
            test.id = 0;
            for (var i = 0; i < x.field_designs.length; i++) {
                if (x.field_designs[i] === y) {
                    if (x.field_designs.option_designs) {
                        for (var j = 0; j < x.field_designs.option_designs.length; j++) {
                            test.field_designs.option_designs[j].id = 0;
                        }
                    }
                    x.field_designs.splice(i + 1, 0, test);
                    break;
                }
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

        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };
        $scope.$on('updateScopeFromDirective', function () {
            FormUpdateService.addProduct($scope.formData, $scope.modalHelper);
        });
        $scope.$on('moduleSaveChanges', function () {
            $scope.formData = FormUpdateService.getProducts();
        });

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
//            window.imagePicker.getPictures(
//                    function (results) {
//                        $scope.convertToDataURLviaCanvas(results[0], function (base64Img) {
//                            $scope.item.base64String = base64Img.replace(/^data:image\/(png|jpg);base64,/, "");
//                        });
//                    }, function (error) {
//            }, {
//                maximumImagesCount: 1,
//                width: 800,
//                quality: 10
//            });
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
    }
]);
