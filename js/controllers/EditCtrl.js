angular.module($APP.name).controller('EditCtrl', [
    '$scope',
    'FormInstanceService',
    '$timeout',
    'FormUpdateService',
    '$location',
    '$rootScope',
    'FormDesignService',
    '$ionicScrollDelegate',
    '$ionicPopup',
    function ($scope, FormInstanceService, $timeout, FormUpdateService, $location, $rootScope, FormDesignService, $ionicScrollDelegate, $ionicPopup) {
        $scope.formData = $rootScope.rootForm;
        console.log($scope.formData, $rootScope.formData)
        $scope.submit = function (help) {
            console.log(help, $rootScope.formId)
            var confirmPopup = $ionicPopup.confirm({
                title: 'Edit form',
                template: 'Are you sure you want to edit this form?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    FormInstanceService.update($rootScope.formId, $scope.formData).then(function (data) {
                        if (data) {
                            $rootScope.formId = data.id;
                            FormInstanceService.get($rootScope.formId).then(function (data) {
                                $location.path("/app/view/" + $rootScope.projectId + "/form/" + $rootScope.formId);
                            })
                        }
                    })
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
                    console.log(stopY)
                    $ionicScrollDelegate.scrollTo(0, stopY, true);

                }, 50);
            }
        }
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
            angular.copy(x, aux);
            aux.repeatable = false;
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
                    aux.field_instances[i].field_values[j].id = 0;
                    aux.field_instances[i].field_values[j].field_instance_id = 0;
                }
            }
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
            test.repeatable = false;
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
        }

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