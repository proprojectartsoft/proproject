angular.module($APP.name).factory('ProjectService', [
    '$http',
    'CacheFactory',
    function ($http, CacheFactory) {
        return {
            list: function () {
                return $http.get($APP.server + '/api/project', {}).then(
                        function (payload) {
//                            var projectsCache = CacheFactory.get('projectsCache');
//                            if (!projectsCache || projectsCache.length === 0) {
//                                projectsCache = CacheFactory('projectsCache');
//                                projectsCache.setOptions({
//                                    storageMode: 'localStorage'
//                                });
//                            }
//                            for (var i = 0; i < payload.data.length; i++) {
//                                projectsCache.put(payload.data[i].id, payload.data[i]);
//                            }
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