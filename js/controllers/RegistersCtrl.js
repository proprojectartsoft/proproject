angular.module($APP.name).controller('RegistersCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'RegisterService',
    'CacheFactory',
    function ($scope, $rootScope, $stateParams, RegisterService, CacheFactory) {
        $scope.isLoaded = false;
        $scope.hasData = '';

        if ($stateParams.categoryId) {
            $rootScope.categoryId = $stateParams.categoryId;
            RegisterService.list($stateParams.projectId, $stateParams.categoryId).then(function (data) {
                $scope.isLoaded = true;
                $scope.registers = data;
                if (data) {
                    if (data.length === 0) {
                        $scope.hasData = 'no data';
                    }
                }
                else {
                    $scope.hasData = 'no data';
                }
            });
        }
        $scope.categoryName = $rootScope.categories[$stateParams.categoryId - 1].name;

        $scope.refresh = function () {
            RegisterService.list($stateParams.projectId, $stateParams.categoryId).then(function (data) {
                if (data) {
                    $scope.registers = data;
                    if (data.length === 0) {
                        $scope.hasData = 'no data';
                    }
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    }
]);