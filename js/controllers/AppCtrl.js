angular.module($APP.name).controller('AppCtrl', [
    '$rootScope',
    '$scope',
    'CacheFactory',
    function ($rootScope, $scope, CacheFactory) {
        var getAndroidVersion = function (ua) {
            ua = (ua || navigator.userAgent).toLowerCase();
            var match = ua.match(/android\s([0-9\.]*)/);
            return match ? match[1] : false;
        };

        getAndroidVersion(); //"4.2.1"
        parseInt(getAndroidVersion(), 10); //4
        parseFloat(getAndroidVersion()); //4.2
        $rootScope.androidOk = parseFloat(getAndroidVersion()) > 4.4;

        var settings = CacheFactory.get('settings');
        if (!settings || settings.length === 0) {
            settings = CacheFactory('settings');
            settings.setOptions({
                storageMode: 'localStorage'
            });
        }
        $scope.user = settings.get("user");

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



