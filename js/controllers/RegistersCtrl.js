angular.module($APP.name).controller('RegistersCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$stateParams',
    'RegisterService',
    '$location',
    '$timeout',
    function ($scope, $state, $rootScope, $stateParams, RegisterService, $location, $timeout) {
        $scope.isLoaded = false;
        $scope.hasData = false;
        if ($stateParams.categoryId) {
            $rootScope.categoryId = $stateParams.categoryId;
            RegisterService.list($rootScope.projectId, $rootScope.categoryId).then(function (data) {
                $timeout(function () {
                    $scope.isLoaded = true;
                }, 1000);
                $scope.registers = data;
                if (data.length !== 0) {
                    $scope.hasData = true;
                }
            });
        }
        $scope.refresh = function () {
            RegisterService.list($rootScope.projectId, $rootScope.categoryId).then(function (data) {
                $scope.registers = data;
                if (data.length !== 0) {
                    $scope.hasData = true;
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
        $scope.change = function (code) {
            $rootScope.formName = code;
            $location.path("/app/register/" + $rootScope.projectId + "/" + $rootScope.formId);
        };
        $scope.back = function () {
            console.log('registers:', $rootScope.projectId, $rootScope.categoryId);
        };
        $scope.register = function () {
            $state.go("app.register");
        };
    }
]);