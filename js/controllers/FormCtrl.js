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
    'ImageService',
    function ($scope, FormInstanceService, $timeout, FormUpdateService, $location, $rootScope, CacheFactory, $ionicScrollDelegate, $ionicPopup, $stateParams, ImageService) {
        var designsCache = CacheFactory.get('designsCache');
        if (!designsCache || designsCache.length === 0) {
            designsCache = CacheFactory('designsCache');
            designsCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        
        $scope.formData = designsCache.get($stateParams.formId);
        $scope.shownGroup = $scope.formData.field_group_designs[0];
        $scope.pictures = [
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
        
        $scope.submit = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'New form',
                template: 'Are you sure you want to submit the data?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    FormInstanceService.create($scope.formData).then(function (data) {
                        if (data) {
                            $rootScope.formId = data.id;
                            FormInstanceService.get($rootScope.formId).then(function (data) {
                                $rootScope.rootForm = data;
                                var list = $scope.pictures;
                                for (var i = 0; i < list.length; i++) {
                                    list[i].id = 0;
                                    list[i].formInstanceId = $rootScope.formId;
                                    list[i].projectId = $stateParams.projectId;
                                }
                                ImageService.create($scope.pictures).then(function (x) {
                                    $location.path("/app/view/" + $rootScope.projectId + "/form/" + data.id);
                                });
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

        $scope.repeatGroup = function (x) {
            var aux = {};
            angular.copy(x, aux);
            aux.repeatable = false;
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
            test.repeatable = false;
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

        $scope.addPictureSlot = function () {
            if ($scope.pictures.length < 9) {
                $scope.pictures.push({
                    "id": $scope.pictures.length,
                    "base64String": "",
                    "comment": "",
                    "tags": "",
                    "title": " ",
                    "projectId": 0,
                    "formInstanceId": 0
                });
            }
        };
        
        $scope.isLastPicture = function (index) {
            if (index === 8) {
                return false;
            }
            else {
                if (index + 1 === $scope.pictures.length) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
        
        $scope.addPicture = function (index) {
            $rootScope.imgUp = $ionicPopup.alert({
                title: "Uploading",
                template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                content: "",
                buttons: []
            });
            window.imagePicker.getPictures(
                    function (results) {
                        $scope.convertToDataURLviaCanvas(results[0], function (base64Img) {
                            $scope.$apply(function () {
                                for (var i = 0; i < $scope.pictures.length; i++) {
                                    if ($scope.pictures[i].id === index) {
                                        $scope.pictures[i].base64String = base64Img.replace(/^data:image\/(png|jpg);base64,/, "");
                                    }
                                }
                                $rootScope.imgUp.close();
                            });
                        });
                        $rootScope.imgUp.close();
                    }, function (error) {
            }, {
                maximumImagesCount: 1,
                width: 800,
                quality: 10
            });
        };
        $scope.removePicture = function (index) {
            if ($scope.pictures.length !== 1) {
                for (var i = index; i < $scope.pictures.length - 1; i++) {
                    $scope.pictures[i].comment = angular.copy($scope.pictures[i + 1].comment);
                    $scope.pictures[i].base64String = angular.copy($scope.pictures[i + 1].base64String);
                }
                $scope.pictures.splice($scope.pictures.length - 1, 1)
            }
            else {
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