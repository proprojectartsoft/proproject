
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
angular.module($APP.name).factory('SecuredPopups', [
    '$ionicPopup',
    '$q',
    function ($ionicPopup, $q) {

        var firstDeferred = $q.defer();
        firstDeferred.resolve();

        var lastPopupPromise = firstDeferred.promise;

        // Change this var to true if you want that popups will automaticly close before opening another
        var closeAndOpen = false;

        return {
            'show': function (method, object) {
                var deferred = $q.defer();
                var closeMethod = null;
                deferred.promise.isOpen = false;
                deferred.promise.close = function () {
                    if (deferred.promise.isOpen && angular.isFunction(closeMethod)) {
                        closeMethod();
                    }
                };

                if (closeAndOpen && lastPopupPromise.isOpen) {
                    lastPopupPromise.close();
                }

                lastPopupPromise.then(function () {
                    deferred.promise.isOpen = true;
                    var popupInstance = $ionicPopup[method](object);

                    closeMethod = popupInstance.close;
                    popupInstance.then(function (res) {
                        deferred.promise.isOpen = false;
                        deferred.resolve(res);
                    });
                });

                lastPopupPromise = deferred.promise;

                return deferred.promise;
            }
        };
    }
])
angular.module($APP.name).directive('date', function ($filter) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            var dateFormat = attrs.date;
            ctrl.$parsers.push(function (viewValue)
            {
                //convert string input into moment data model
                var pDate = Date.parse(viewValue);
                if (isNaN(pDate) === false) {
                    return new Date(pDate);
                }
                return undefined;

            });
            ctrl.$formatters.push(function (modelValue)
            {
                var pDate = Date.parse(modelValue);
                if (isNaN(pDate) === false) {
                    return $filter('date')(new Date(pDate), dateFormat);
                }
                return undefined;
            });
        }
    };
})