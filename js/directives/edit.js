angular.module($APP.name).directive('edit', [
    '$rootScope',
    function ($rootScope) {

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
                if ($scope.data.type === "select") {
                    $scope.data.value = $scope.data.field_values[0];
                    for (var i = 0; i < $scope.data.option_instances.length; i++) {
                        if ($scope.data.field_values[0] && $scope.data.field_values[0].value === $scope.data.option_instances[i].value) {
                            $scope.data.value = $scope.data.option_instances[i];
                            $scope.data.value = 'x';
                        }
                    }
                }
                if ($scope.data.type === "number" && $scope.data.field_values[0]) {
                    $scope.data.field_values[0].value = parseInt($scope.data.field_values[0].value);
                }
                if ($scope.data.type === "checkbox_list") {
                    for (var i = 0; i < $scope.data.option_instances.length; i++) {
                        if ($scope.data.option_instances[i].value === "true") {
                            $scope.data.option_instances[i].value = true;
                        }
                    }
                }
                if ($scope.data.type === "checkbox") {
                    if ($scope.data.field_values[0]) {
                        if ($scope.data.field_values[0].value === "true") {
                            $scope.data.field_values[0].value = true;
                        }
                        else {
                            $scope.data.field_values[0].value = false;
                        }
                    }
                }
                if ($scope.data.type === "date") {
                    if ($scope.data.field_values[0]) {
                        var aux = $scope.data.field_values[0].value.substr(0, 4)
                        var fix = $scope.data.field_values[0].value.substr(3, 2) + '-' + $scope.data.field_values[0].value.substr(0, 2) + '-' + $scope.data.field_values[0].value.substr(6, 4);
                        if ($scope.data.field_values[0].value !== '0' && $scope.data.field_values[0].value !== 0 && aux !== '1969') {
                            $scope.data.field_values[0].value = new Date(fix)
                        }
                        else {
                            $scope.data.field_values[0].value = new Date(null);
                        }
                    }
                }
                if ($scope.data.type === "time") {
                    if ($scope.data.field_values[0]) {
                        var aux = $scope.data.field_values[0].value.substr(0, 4)
                        if ($scope.data.field_values[0].value !== '0' && $scope.data.field_values[0].value !== 0 && aux !== '1969') {
                            $scope.data.field_values[0].value = new Date("01 " + $scope.data.field_values[0].value)
                        }
                        else {
                            $scope.data.field_values[0].value = new Date(null);
                        }
                    }
                }

                if ($scope.data.type === "signature") {
                    console.log('signature', $scope.data)

                }
                $scope.$on('submit', function () {
                    if ($scope.data.type === "signature") {
                        $scope.data.value = $scope.data.field_values[0].value;
                    }

                    if ($scope.data.type === "checkbox") {
                        $scope.data.value = $scope.data.value ? true : false;
                    }
                    if ($scope.data.type === "select") {
                        console.log($scope.data)
                        for (var i = 0; i < $scope.data.option_instances.length; i++) {
                            if ($scope.data.field_values[0].value === $scope.data.option_instances[i].value) {
                                $scope.data.value = $scope.data.option_instances[i].value;                                
                            }
                        }
                    }

                    if ($scope.data.type === "checkbox_list") {
//                        $scope.data.value = $scope.data.value ? true : false;
//                        var list = [];
//                        for(var i=0;i< $scope.data.option_designs.length;i++){
//                            if($scope.data.option_designs[i].value === 'true' || $scope.data.option_designs[i].value === true){
//                                list.push($scope.)
//                            }
//                        }
                    }
                    if ($scope.data.type === "text") {
                        console.log('here');
                    }
                    if ($scope.data.type === "radio") {
//                        console.log($scope.data);
                    }
                    $scope.submit = true;
                });

//                $scope.$watch('data.errors', function (data) {
//                    if (data && data.length) {
//                        angular.element($elem[0].firstChild).addClass('has-error');
//                        $rootScope.$emit('invalidField', $scope.data);
//                    }
//                    else {
//                        angular.element($elem[0].firstChild).removeClass('has-error');
//                        $rootScope.$emit('validField', $scope.data);
//                    }
//                });

//                $scope.$watch('data.value', function (data) {
//                    if ($scope.value !== $scope.data.value) {
//                        $scope.dirty = true;
//                    }
//                    if ((!$scope.data.value && $scope.dirty) || $scope.submit || ($scope.data.value && $scope.data.errors && $scope.data.errors.length)) {
//                        $scope.$emit('validateField', $scope.data);
//                    }
//                });
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
