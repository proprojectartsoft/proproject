angular.module($APP.name).controller('FormsCtrl', [
    '$scope',
    '$location',
    'FormDesignService',
    '$rootScope',
    'FormInstanceService',
    'CacheFactory',
    '$ionicPopup',
    '$timeout',
    function ($scope, $location, FormDesignService, $rootScope, FormInstanceService, CacheFactory, $ionicPopup, $timeout) {
        $scope.isLoaded = false;
        $scope.hasData = '';

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
            if (aux.category_id === $rootScope.categoryId) {
                $rootScope.formDesigns.push(aux);
            }
        });

        $scope.refresh = function () {
            FormDesignService.list($rootScope.categoryId).then(function (data) {
                $rootScope.formDesigns = data;
                if (data.length === 0) {
                    $scope.hasData = 'no data';
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.change = function (id) {
            $rootScope.formData = designsCache.get(id);
            $location.path("/app/form/" + $rootScope.projectId + "/" + id);
        }
        $scope.back = function () {
            console.log('forms:', $rootScope.projectId, $rootScope.categoryId);
        };

    }
]);