angular.module($APP.name).factory('ProjectService', [
    '$http',
    'CacheFactory',
    function ($http, CacheFactory) {
        return {
            list: function () {
                return $http.get($APP.server + '/api/project', {}).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                });
            },
            list_current: function (active) {
                return $http.get($APP.server + '/api/project/list', {
                    params: {active: active}
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            },
            clearProjCache: function () {
                var projectsCache = CacheFactory.get('projectsCache');
                if (!projectsCache || projectsCache.length === 0) {
                    projectsCache = CacheFactory('projectsCache');
                    projectsCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                var list = projectsCache.keys();
                for (var i = 0; i < list.length; i++) {
                    projectsCache.remove(list[i]);
                }
            }

        };
    }
]);