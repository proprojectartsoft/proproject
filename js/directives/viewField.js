angular.module($APP.name).directive('viewField', ['$http', '$compile', '$parse',
    function ($http, $compile, $parse) {
        return {
            templateUrl: 'view/form/_viewform.html',
            restrict: 'EA',
            scope: {
                data: '='
            },
            link: function ($scope, $elem, $attrs) {
                $scope.value = $scope.data.value;
                $scope.dirty = false;
                $scope.submit = false;
                $scope.hash = "H" + $scope.$id;

                if ($scope.data.type === "time") {
                    if ($scope.data.field_values[0]) {
                        console.log($scope.data.field_values)
                        if ($scope.data.field_values[0].value === '0') {
                            $scope.data.field_values[0].value = '-';
                        }
                    }
                }
                if ($scope.data.type === "date") {
                    if ($scope.data.field_values[0]) {
                        console.log($scope.data.field_values[0]) 
                        if ($scope.data.field_values[0].value === '0') {
                            $scope.data.field_values[0].value = '-';
                        }
                    }
                }

                $scope.$on('submit', function () {
                    $scope.submit = true;
                });

                $scope.$watch('data.value', function (data) {
                    if ($scope.value != $scope.data.value) {
                        $scope.dirty = true;
                    }
                    if ((!$scope.data.value && $scope.dirty) || $scope.submit) {
                        $scope.$emit('validateField', $scope.data);
                    }
                });

            }
        };
    }
]);