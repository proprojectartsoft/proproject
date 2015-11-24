angular.module($APP.name).controller('FormCompletedCtrl', [
    '$scope',
    '$state',
    'FormInstanceService',
    'CacheFactory',
    '$rootScope',
    '$location',
    '$stateParams',
    function ($scope, $state, FormInstanceService, CacheFactory, $rootScope, $location, $stateParams) {
        $scope.isLoaded = false;
        $scope.hasData = false;
        
        var categoriesCache = CacheFactory.get('categoriesCache');
        if (!categoriesCache || categoriesCache.length === 0) {
            categoriesCache = CacheFactory('categoriesCache');
            categoriesCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        $scope.categoryName = categoriesCache.get($stateParams.categoryId).name;
        $rootScope.categoryId = $stateParams.categoryId;
        FormInstanceService.list($rootScope.projectId, $rootScope.categoryId).then(function (data) {
            $scope.isLoaded = true;
            $scope.formInstances = data;
            if (data.length === 0) {
                $scope.hasData = 'no data';
            }
        });

        $scope.refresh = function () {
            FormInstanceService.list($rootScope.projectId, $rootScope.categoryId).then(function (data) {
                $scope.formInstances = data;
                if (data.length === 0) {
                    $scope.hasData = 'no data';
                }
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.change = function (id) {
            $rootScope.formId = id;
            FormInstanceService.get($rootScope.formId).then(function (data) {
                $rootScope.rootForm = data;
                $location.path("/app/view/" + $rootScope.projectId + "/form/" + id);
            });
        };
        $scope.test = function () {
            console.log('test');
        };
        $scope.form = function (completedFormId) {
            $state.go("app.form")
        }
    }
]);