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
    function ($scope, FormInstanceService, $timeout, FormUpdateService, $location, $rootScope, $ionicSideMenuDelegate, $ionicScrollDelegate, $ionicPopup, $ionicModal, $cordovaCamera, ConvertersService, ImageService, $ionicHistory) {
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
                                }
                                else {
                                    $timeout(function () {
                                        formUp.close();
                                        $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                    });
                                }
                            }
                            else {
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
                                    }
                                    else {
                                        $timeout(function () {
                                            formUp.close();
                                            $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                                        });
                                    }
                                });
                            }
                            else {
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