angular.module($APP.name).controller('FormsCtrl', [
    '$scope',
    '$location',
    'FormDesignService',
    '$rootScope',
    'FormInstanceService',
    'CacheFactory',
    '$ionicPopup',
    function ($scope, $location, FormDesignService, $rootScope, FormInstanceService, CacheFactory, $ionicPopup) {
        $scope.isLoaded = false;
        $scope.hasData = false;

        FormDesignService.list($rootScope.categoryId).then(function (data) {
            $scope.isLoaded = true;
            $scope.formDesigns = data;
            if (data.length !== 0) {
                $scope.hasData = true;
            }
        }, function errorCallback(response) {
            var designsListCache = CacheFactory.get('designsListCache');
            if (!designsListCache || designsListCache.length === 0) {
                designsListCache = CacheFactory('designsListCache');
                designsListCache.setOptions({
                    storageMode: 'localStorage'
                });
            }
            $scope.formDesigns = designsListCache.get($rootScope.categoryId);
        });

        $scope.refresh = function () {
            FormDesignService.list($rootScope.categoryId).then(function (data) {
                $scope.formDesigns = data;
                if (data.length !== 0) {
                    $scope.hasData = true;
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.change = function (id, name) {
            $rootScope.formId = id;
            $rootScope.formName = name;
            
            $location.path("/app/form/" + $rootScope.projectId + "/" + id);
        }
        $scope.back = function () {
            console.log('forms:', $rootScope.projectId, $rootScope.categoryId);
        };

    }
]);