angular.module($APP.name).controller('AppCtrl', [
    '$rootScope',
    '$scope',
    'CacheFactory',
    'AuthService',
    '$state',
    function ($rootScope, $scope, CacheFactory, AuthService, $state) {
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
        $rootScope.unit_list = [];
        $rootScope.custSett = [];

        $rootScope.$watch('projectsCache.keys()', function (newValue, oldValue) {
            angular.forEach(projectsCache.keys(), function (key) {
                $rootScope.projects.push(projectsCache.get(key));
            });
            if ($rootScope.projects[0]) {
                $rootScope.navTitle = $rootScope.projects[0].name;
                $rootScope.projectId = $rootScope.projects[0].id;
            }
        });

        $rootScope.resource_type_list = [{"id": 1, "name": "Labour"}, {"id": 2, "name": "Material"}, {"id": 3, "name": "Plant"}, {"id": 5, "name": "Management"}, {"id": 4, "name": "Subcontractor"}, {"id": 300, "name": "Operative"}];
        $rootScope.abs_list = [{"id": 1, "reason": "Annual Leave"}, {"id": 2, "reason": "Inclement Weather"}, {"id": 3, "reason": "Job not ready"}, {"id": 4, "reason": "Material Unavailable"}, {"id": 5, "reason": "No show"}, {"id": 6, "reason": "On other site"}, {"id": 7, "reason": "Public Holiday"}, {"id": 8, "reason": "Sick Leave"}, {"id": 9, "reason": "Training"}, {"id": 10, "reason": "Unfavourable site conditions"}];

        var resourcesCache = CacheFactory.get('resourcesCache');
        if (!resourcesCache || resourcesCache.length === 0) {
            resourcesCache = CacheFactory('resourcesCache');
            resourcesCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        var aux;
        console.log(resourcesCache.keys())
        angular.forEach(resourcesCache.keys(), function (key) {
            aux = resourcesCache.get(key);
            $rootScope.resource_list.push(aux);
        });

        var unitCache = CacheFactory.get('unitCache');
        if (!unitCache || unitCache.length === 0) {
            unitCache = CacheFactory('unitCache');
            unitCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        angular.forEach(unitCache.keys(), function (key) {
            aux = unitCache.get(key);
            $rootScope.unit_list.push(aux);
        });

        var custSettCache = CacheFactory.get('custSettCache');
        if (!custSettCache || custSettCache.length === 0) {
            custSettCache = CacheFactory('custSettCache');
            custSettCache.setOptions({
                storageMode: 'localStorage'
            });
        }
        angular.forEach(custSettCache.keys(), function (key) {
            aux = custSettCache.get(key);
            $rootScope.custSett[aux.name] = aux.value;
        });
        console.log($rootScope.custSett)

    }
]);



