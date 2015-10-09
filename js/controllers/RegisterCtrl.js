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
            $scope.data = data;
            $scope.num = $scope.data.records.values.length;
        });

        $scope.dateToString = function (val) {
            var date = new Date(parseInt(val));
            return date.toString();
        };

        $scope.refresh = function () {
            RegisterService.get($rootScope.formName).then(function (data) {
                $scope.data = data;
                $scope.num = $scope.data.records.values.length;
            });
            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.back = function () {
//            $location.path("/app/view/" + $rootScope.projectId + "/form/1");
            console.log($stateParams);
        };
        $scope.change = function (id) {
            $rootScope.formId = id;
            FormInstanceService.get($rootScope.formId).then(function (data) {
                $rootScope.rootForm = data;
                $location.path("/app/view/" + $rootScope.projectId + "/register/" + id);
            });
        }
    }
]);