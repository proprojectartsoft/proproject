angular.module($APP.name).controller('RegistersCtrl', [
    '$scope',
    '$state',
    '$rootScope',
    '$stateParams',
    'RegisterService',
    '$location',
    'CacheFactory',
    function ($scope, $state, $rootScope, $stateParams, RegisterService, $location, CacheFactory) {
        $scope.isLoaded = false;
        $scope.hasData = '';
        
        if ($stateParams.categoryId) {
            $rootScope.categoryId = $stateParams.categoryId;
            RegisterService.list($rootScope.projectId, $rootScope.categoryId).then(function (data) {
                $scope.isLoaded = true;
                $scope.registers = data;
                if (data.length === 0) {
                    $scope.hasData = 'no data';
                }
            });
        }
        var categoriesCache = CacheFactory.get('categoriesCache');
        if (!categoriesCache || categoriesCache.length === 0) {
            categoriesCache = CacheFactory('categoriesCache');
            categoriesCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        $scope.categoryName = categoriesCache.get($stateParams.categoryId).name;
        $scope.refresh = function () {
            RegisterService.list($rootScope.projectId, $rootScope.categoryId).then(function (data) {
                $scope.registers = data;
                if (data.length === 0) {
                    $scope.hasData = 'no data';
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        }        
    }
]);