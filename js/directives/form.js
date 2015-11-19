angular.module($APP.name).directive('form', ['$parse', '$ionicPopup', '$rootScope', function ($parse, $ionicPopup, $rootScope) {
        return {
            restrict: 'EA',
            compile: function (cElement, cAttributes, transclude) {
                return {
                    pre: function ($scope, $elem, $attrs) {
                        $rootScope.sketch = false;
                        if (!$attrs["novalidate"]) {
                            $elem.attr("novalidate", "novalidate");
                        }

                        if ($attrs["name"]) {
                            $scope.name = $attrs["name"];
                        }
                        else {
                            $scope.name = "form" + Math.floor((Math.random() * 10000) + 1);
                            $elem.attr("name", $scope.name);
                        }

                        $scope.validateField = function (data, single) {

                            if (single === undefined) { // default
                                single = true;
                            }

                            data.errors = [];
                            if (data.required && data.value && (data.value === undefined || data.value === "" || data.value.length === 0 || data.value === $rootScope.sketch)) {
                                data.errors.push({type: 'required', message: data.label + ' is required.'});
                            }
                            else if (data.minLength !== undefined && data.value !== undefined && data.value.length < data.minLength) {
                                data.errors.push({type: 'required', message: data.label + ' is too short. Must be min ' + data.minLength + ' chars long.'});
                            }
                            else if (data.maxLength !== undefined && data.value !== undefined && data.value.length > data.maxLength) {
                                data.errors.push({type: 'required', message: data.label + ' is too long. Must be max ' + data.minLength + ' chars long.'});
                            }
                            else if (data.minValue !== undefined && data.value !== undefined && data.value < data.minValue) {
                                data.errors.push({type: 'required', message: data.label + ' is too small. Must be min ' + data.minValue + '.'});
                            }
                            else if (data.maxValue !== undefined && data.value !== undefined && data.value > data.maxValue) {
                                data.errors.push({type: 'required', message: data.label + ' is too big. Must be max ' + data.maxValue + '.'});
                            }
                            else if (data.type == 'email' && data.value && !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.value)) {
                                data.errors.push({type: 'invalid', message: data.label + ' is invalid e-mail address.'});
                            }
                            else if (data.type == 'number' && $elem.hasClass('ng-invalid-number')) {
                                data.errors.push({type: 'invalid', message: data.label + ' must be a valid number.'});
                            }

                            if (single && !$scope.$$phase) {
                                $scope.$apply();
                            }

                            return data;
                        }

                        $scope.isValidFieldset = function (fieldsets) {
                            if (fieldsets.fields) {
                                for (var i = 0; i < fieldsets.fields.length; ++i) {
                                    if (fieldsets.fields[i] && fieldsets.fields[i].errors && fieldsets.fields[i].errors.length) {
                                        return false;
                                    }
                                }
                            }
                            return true;
                        }

                        $scope.validateFieldset = function (fieldsets, valid) {
                            if (fieldsets.fields) {
                                for (var i = 0; i < fieldsets.fields.length; ++i) {
                                    fieldsets.fields[i] = $scope.validateField(fieldsets.fields[i], false);
                                    valid = valid && !fieldsets.fields[i].errors.length;
                                }

                                if (!$scope.$$phase) {
                                    $scope.$apply();
                                }
                            }
                            return valid;
                        }

                        $scope.validate = function () {
                            var valid = true;
                            if ($scope.data && $scope.data.fieldsets) {
                                for (var i = 0; i < $scope.data.fieldsets.length; ++i) {
                                    valid = valid && $scope.validateFieldset($scope.data.fieldsets[i], valid);
                                }
                            }
                            return valid;
                        }

                        $scope.$watch('data.disabled', function (data) {
                            if ($scope.data && $scope.data.disabled !== undefined) {

                                if ($scope.data && $scope.data.fieldsets) {
                                    for (var i = 0; i < $scope.data.fieldsets.length; ++i) {
                                        if ($scope.data.fieldsets[i].fields) {
                                            for (var j = 0; j < $scope.data.fieldsets[i].fields.length; ++j) {
                                                $scope.data.fieldsets[i].fields[j].disabled = $scope.data.disabled;
                                            }
                                        }
                                    }
                                }

                            }
                        });
                        $scope.$on('validateField', function (data) {
                            data.targetScope.data = $scope.validateField(data.targetScope.data, true);
                        });
                        var fn = $parse($attrs.onSubmit);
                        $elem.bind('submit', function () {
                            $scope.$broadcast('submit');
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }

                            if (!$scope.validate()) {
                                $ionicPopup.alert({
                                    title: 'Form has errors',
                                    content: 'Please correct the errors and submit again.'
                                });
                                return false;
                            }


                            $scope.$apply(function (event) {
                                fn($scope, {$event: event});
                            });
                        });
                    }
                };
            }
        };
    }]);
