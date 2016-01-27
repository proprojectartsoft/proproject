angular.module($APP.name).directive('viewField', ['$http', '$compile', '$parse', 'ConvertersService',
    function ($http, $compile, $parse, ConvertersService) {
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