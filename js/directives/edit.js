angular.module($APP.name).directive('edit', [
    '$ionicModal', '$rootScope', '$timeout',
    function ($ionicModal, $rootScope, $timeout) {

        return {
            templateUrl: 'view/form/_all_edit.html',
            restrict: 'EA',
            scope: {
                data: '='
            },
            link: function ($scope, $elem, $attrs) {
                $scope.value = $scope.data.value;
                $scope.dirty = false;
                $scope.submit = false;
                $scope.hash = "H" + $scope.$id;
                $scope.save = function () {
                    $timeout(function () {
                        $scope.data.field_values[0].value = angular.copy(document.getElementById($scope.hash).toDataURL("image/png"));
                        $scope.modal.hide();
                        $scope.modal.remove();
                    });

                }

                $scope.directiveClick = function (hash) {
                    $ionicModal.fromTemplateUrl('view/form/_modal.html', {
                        scope: $scope,
                        backdropClickToClose: false,
                        hardwareBackButtonClose: false,
                    }).then(function (modal) {
                        $scope.modal = modal;
                        console.log(modal)
//                        $scope.modal.hash = $scope.hash;
//                        FieldUpdateService.addProduct($scope.modalHelper);
                        $rootScope.$broadcast('updateScopeFromDirective');
                        $scope.modal.show();                        
                    });
                };

                if ($scope.data.type === "select") {
                    if ($scope.data.field_values[0]) {
                        for (var i = 0; i < $scope.data.field_values.length; i++) {
                            if ($scope.data.field_values[i] && $scope.data.field_values[i].value === 'true') {
                                $scope.data.value = $scope.data.field_values[i].name;
                            }
                        }
                    }
                }
                if ($scope.data.type === "number" && $scope.data.field_values[0]) {
                    $scope.data.field_values[0].value = parseInt($scope.data.field_values[0].value);
                }
                if ($scope.data.type === "checkbox_list") {
                    for (var i = 0; i < $scope.data.field_values.length; i++) {
                        if ($scope.data.field_values[i].value === "true") {
                            $scope.data.field_values[i].value = true;
                        }
                    }
                }
                if ($scope.data.type === "checkbox") {
                    if ($scope.data.field_values[0]) {
                        if ($scope.data.field_values[0].value === "true" || $scope.data.field_values[0].value === true) {
                            $scope.data.field_values[0].value = true;
                        }
                        else {
                            $scope.data.field_values[0].value = false;
                        }
                    }
                }
                if ($scope.data.type === "date") {
                    if ($scope.data.field_values[0]) {
                        var aux = '';
                        if ($scope.data.field_values[0].value !== 0) {
                            aux = $scope.data.field_values[0].value.substr(0, 4);
                            var fix = $scope.data.field_values[0].value.substr(3, 2) + '.' + $scope.data.field_values[0].value.substr(0, 2) + '.' + $scope.data.field_values[0].value.substr(6, 4);
                            var fix2 = $scope.data.field_values[0].value.substr(3, 2) + ' ' + $scope.data.field_values[0].value.substr(0, 2) + ' ' + $scope.data.field_values[0].value.substr(6, 4);
                        }
                        if ($scope.data.field_values[0].value !== '0' && $scope.data.field_values[0].value !== 0 && aux !== '1969') {
                            fix = new Date(fix);
                            //DON'T CHANGE                           
                            if (fix == 'Invalid data') {
                                fix = new Date(fix2);
                            }
                            $scope.data.field_values[0].value = fix;
                        }
                        else {
                            $scope.data.field_values[0].value = new Date(null);
                        }
                    }

                }

                if ($scope.data.type === "time") {
                    if ($scope.data.field_values[0] && $scope.data.field_values[0].value !== '0' && $scope.data.field_values[0].value !== 0 && $scope.data.field_values[0].value !== "") {
//                        $scope.data.field_values[0].value = new Date("01 " + $scope.data.field_values[0].value)
                        $scope.data.field_values[0].value = new Date("Mon, 25 Dec 1995 " + $scope.data.field_values[0].value)
                    }
                }
                if ($scope.data.type === "radio" && $scope.data.field_values.length > 0) {
                    angular.forEach($scope.data.field_values, function (entry) {
                        if (entry.value === true || entry.value === "true") {
                            $scope.data.value = entry.name;
                        }
                    });
                }

                $scope.$on('submit', function () {
                    if ($scope.data.type === "signature") {
                        $scope.data.value = $scope.data.field_values[0].value;
                    }

                    if ($scope.data.type === "checkbox") {
                        $scope.data.value = $scope.data.value ? true : false;
                    }
                    if ($scope.data.type === "select") {
                        for (var i = 0; i < $scope.data.option_instances.length; i++) {
                            if ($scope.data.field_values[0].value === $scope.data.option_instances[i].value) {
                                $scope.data.value = $scope.data.option_instances[i].value;
                            }
                        }
                    }
                    $scope.submit = true;
                });
                $scope.$on('focus', function () {
                    $elem.addClass('focus');
                });

                $scope.$on('blur', function () {
                    $elem.removeClass('focus');
                });

            }
        };
    }
]);
