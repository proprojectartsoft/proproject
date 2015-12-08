angular.module($APP.name).controller('FormsCtrl', [
    '$scope',
    '$stateParams',
    'FormDesignService',
    '$rootScope',
    'FormInstanceService',
    'CacheFactory',
    '$ionicPopup',
    '$timeout',
    function ($scope, $stateParams, FormDesignService, $rootScope, FormInstanceService, CacheFactory, $ionicPopup, $timeout) {
        $scope.isLoaded = false;
        $scope.hasData = '';
        $scope.categoryId = $stateParams.categoryId;

        var designsCache = CacheFactory.get('designsCache');
        if (!designsCache || designsCache.length === 0) {
            designsCache = CacheFactory('designsCache');
            designsCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        var aux;
        $rootScope.formDesigns = [];
        angular.forEach(designsCache.keys(), function (key) {
            aux = designsCache.get(key);
            if (aux.category_id === parseInt($stateParams.categoryId)) {
                $rootScope.formDesigns.push(aux);
            }
        });

        var categoriesCache = CacheFactory.get('categoriesCache');
        if (!categoriesCache || categoriesCache.length === 0) {
            categoriesCache = CacheFactory('categoriesCache');
            categoriesCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        $scope.categoryName = categoriesCache.get($stateParams.categoryId).name;

        $scope.refresh = function () {
            FormDesignService.list($stateParams.categoryId).then(function (data) {
                $rootScope.formDesigns = data;
                if (data.length === 0) {
                    $scope.hasData = 'no data';
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.back = function () {
            console.log('forms:', $rootScope.projectId, $rootScope.categoryId);
        };
    }
]);