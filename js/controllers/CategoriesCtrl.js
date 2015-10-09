angular.module($APP.name).controller('CategoriesCtrl', [
    '$scope',
    '$rootScope',
    'CategoriesService',
    'CacheFactory',
    function ($scope, $rootScope, CategoriesService, CacheFactory) {

        //Load the categories list from cache if exist
//        if (!$scope.categories) {
//            var projectsCache = CacheFactory.get('projectsCache');
//            if (projectsCache) {console.log(CacheFactory.get('categoriesCache'));}            
//            if (!CacheFactory.get('categoriesCache')) {
//                CategoriesService.list().then(function (data) {
//                    $scope.categories = data;
//                });
//            }
//            else {
//                $scope.categories = [];
//                var categoriesCache = CacheFactory.get('categoriesCache');
//                console.log(categoriesCache);
//                for (var i = 0; i < categoriesCache.keys().length; i++) {
//                    $scope.categories.push(categoriesCache.get([i]));
//                }
//            }
//        }

        $scope.change = function (id, name) {
            $rootScope.categoryId = id;
            $rootScope.categoryName = name;
        };
        $rootScope.$broadcast('startloading');
    }
]);