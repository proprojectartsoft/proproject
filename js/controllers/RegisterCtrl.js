angular.module($APP.name).controller('RegisterCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'RegisterService',
    '$stateParams',
    '$location',
    'FormInstanceService',
    'CacheFactory',
    function ($scope, $rootScope, $stateParams, RegisterService, $stateParams, $location, FormInstanceService, CacheFactory) {
        RegisterService.get($rootScope.formName).then(function (data) {
            $scope.listHelp = [];
            $scope.data = data;
            $scope.num = $scope.data.records.values.length;
//            $scope.data.records.names = [];
//            for (var i = 0; i < $scope.data.records.values[0].length; i++) {
//                $scope.data.records.names.push($scope.data.records.values[0][i].key);
//                $scope.listHelp.push({'name': $scope.data.records.values[0][i].key, 'index': i});
//            }
        });

        $scope.dateToString = function (val) {
            var date = new Date(parseInt(val));
            return date.toString();
        };

        $scope.refresh = function () {
            RegisterService.get($rootScope.formName).then(function (data) {
                $scope.listHelp = [];
                $scope.data = data;
                $scope.num = $scope.data.records.values.length;
                // $scope.data.records.names = [];
                // for (var i = 0; i < $scope.data.records.values[0].length; i++) {
                //     $scope.data.records.names.push($scope.data.records.values[0][i].key);
                //     $scope.listHelp.push({'name': $scope.data.records.values[0][i].key, 'index': i});
                // }
            });
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.help = function (label, register) {
            for (var i = 0; i < register.length; i++) {
                if (register[i].key === label) {
                    return register[i].value;
                }
            }
            return '-';
        };
        $scope.increment = function (x) {
            console.log(x);
        }

        $scope.back = function () {
//            $location.path("/app/view/" + $rootScope.projectId + "/form/1");
            console.log($stateParams);
        };
        $scope.change = function (reg) {
            $rootScope.formId = $scope.help('instance_id', reg);
            FormInstanceService.get($rootScope.formId).then(function (data) {
                $rootScope.rootForm = data;
                $location.path("/app/view/" + $rootScope.projectId + "/register/" + $rootScope.formId);
            });
        }
    }
]);
