
angular.module($APP.name).directive('fs', [
    '$rootScope',
    function ($rootScope) {
        return {
            restrict: 'EA',
            scope: {
                data: '='
            },
            link: function ($scope, $elem, $attrs) {
                $scope.safeApply = function (fn) {
                    var phase = this.$root.$$phase;
                    if (phase == '$apply' || phase == '$digest') {
                        if (fn && (typeof (fn) === 'function')) {
                            fn();
                        }
                    } else {
                        this.$apply(fn);
                    }
                };

                $scope.isFieldInFieldset = function (hashKey) {
                    if ($scope.data.fields && $scope.data.fields.length) {
                        for (var i = 0; i < $scope.data.fields.length; ++i) {
                            if ($scope.data.fields[i].$$hashKey == hashKey) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                $rootScope.$on('invalidField', function (event, data) {
                    if ($scope.data) {
                        if (!$scope.data.errors) {
                            $scope.data.errors = [];
                        }
                        $scope.safeApply(function () {
                            if ($scope.data.errors.indexOf(data.$$hashKey) == -1 && $scope.isFieldInFieldset(data.$$hashKey)) {
                                $scope.data.errors.push(data.$$hashKey);
                            }
                        });
                    }
                });

                $rootScope.$on('validField', function (event, data) {
                    if ($scope.data && $scope.data.errors && $scope.data.errors.length) {
                        $scope.safeApply(function () {
                            var i = $scope.data.errors.indexOf(data.$$hashKey);
                            if (i >= 0) {
                                $scope.data.errors.splice(i, 1);
                            }
                        });
                    }
                });

            }
        };
    }
]);
