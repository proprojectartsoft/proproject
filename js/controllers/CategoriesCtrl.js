angular.module($APP.name).controller('CategoriesCtrl', [
    '$scope',
    '$rootScope',
    'ProjectService',
    'CacheFactory',
    function ($scope, $rootScope, ProjectService, CacheFactory) {

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
        if (!$rootScope.projects) {
            ProjectService.list().then(function (data) {
                $rootScope.online = true;
                $rootScope.projects = data;
                $rootScope.navTitle = data[0].name;
                $rootScope.projectId = data[0].id;
            });
        }
        $scope.change = function (id, name) {
            $rootScope.categoryId = id;
            $rootScope.categoryName = name;
        };
        $rootScope.$broadcast('startloading');
    }
]);