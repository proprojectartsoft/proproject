angular.module($APP.name).controller('AppCtrl', [
    '$rootScope',
    '$state',
    'AuthService',
    'ProjectService',
    '$scope',
    '$ionicSideMenuDelegate',
    'CacheFactory',
    'SyncService',
    'CategoriesService',
    function ($rootScope, $state, AuthService, ProjectService, $scope, $ionicSideMenuDelegate, CacheFactory, SyncService, CategoriesService) {
        var settings = CacheFactory.get('settings');
        if (!settings || settings.length === 0) {
            settings = CacheFactory('settings');
            settings.setOptions({
                storageMode: 'localStorage'
            });
        }
        $scope.user = settings.get("user");

        var categoriesCache = CacheFactory('categoriesCache');
        categoriesCache.setOptions({
            storageMode: 'localStorage'
        });
        $rootScope.categories = [];
        angular.forEach(categoriesCache.keys(), function (key) {
            $rootScope.categories.push(categoriesCache.get(key));
        });

        var projectsCache = CacheFactory('projectsCache');
        projectsCache.setOptions({
            storageMode: 'localStorage'
        });
        $rootScope.projects = [];
        $rootScope.$watch('projectsCache.keys()', function (newValue, oldValue) {
            angular.forEach(projectsCache.keys(), function (key) {
                $rootScope.projects.push(projectsCache.get(key));
            });
            if ($rootScope.projects[0]) {
                $rootScope.navTitle = $rootScope.projects[0].name;
                $rootScope.projectId = $rootScope.projects[0].id;
            }
        });
    }
]);



