angular.module($APP.name).controller('AppCtrl', [
    '$rootScope',
    '$scope',
    'CacheFactory',
    'AuthService',
    '$state',
    function ($rootScope, $scope, CacheFactory, AuthService, $state) {
        AuthService.init();
//        ==========================================================================
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
        $rootScope.resource_list = [];
        $rootScope.$watch('projectsCache.keys()', function (newValue, oldValue) {
            angular.forEach(projectsCache.keys(), function (key) {
                $rootScope.projects.push(projectsCache.get(key));
            });
            if ($rootScope.projects[0]) {
                $rootScope.navTitle = $rootScope.projects[0].name;
                $rootScope.projectId = $rootScope.projects[0].id;
            }
        });

        $rootScope.resource_type_list = [{"id": 1, "name": "Labour"}, {"id": 2, "name": "Material"}, {"id": 3, "name": "Plant"}, {"id": 5, "name": "Management"}, {"id": 4, "name": "Subcontractor"}, {"id": 300, "name": "Misc"}];
        $rootScope.unit_list = [{"id": 1, "type": "imperial", "name": "Ea."}, {"id": 2, "type": "imperial", "name": "Days"}, {"id": 3, "type": "imperial", "name": "ft"}, {"id": 4, "type": "imperial", "name": "ft2"}, {"id": 5, "type": "imperial", "name": "ft3"}, {"id": 6, "type": "imperial", "name": "T"}, {"id": 7, "type": "imperial", "name": "Provisional Sum"}, {"id": 8, "type": "imperial", "name": "Gallons"}, {"id": 9, "type": "metric", "name": "Ea."}, {"id": 10, "type": "metric", "name": "Days"}, {"id": 11, "type": "metric", "name": "m"}, {"id": 12, "type": "metric", "name": "m2"}, {"id": 13, "type": "metric", "name": "m3"}, {"id": 14, "type": "metric", "name": "T"}, {"id": 15, "type": "metric", "name": "Provisional Sum"}, {"id": 16, "type": "metric", "name": "Litres"}, {"id": 17, "type": "imperial", "name": "hr"}, {"id": 18, "type": "metric", "name": "hr"}, {"id": 19, "type": "imperial", "name": "No."}, {"id": 20, "type": "metric", "name": "No."}];

        var resourcesCache = CacheFactory.get('resourcesCache');
        if (!resourcesCache || resourcesCache.length === 0) {
            resourcesCache = CacheFactory('resourcesCache');
            resourcesCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        var aux;        
        angular.forEach(resourcesCache.keys(), function (key) {
            aux = resourcesCache.get(key);
            $rootScope.resource_list.push(aux);
        });

    }
]);



