angular.module($APP.name).factory('CategoriesService', [
    '$http',
    'CacheFactory',
    function ($http, CacheFactory) {
        return {
            list: function () {
                return $http.get($APP.server + '/api/categories').then(
                        function (payload) {
//                            var categoriesCache = CacheFactory.get('categoriesCache');
//                            if (!categoriesCache || categoriesCache.length === 0) {
//                                categoriesCache = CacheFactory('categoriesCache');
//                                categoriesCache.setOptions({
//                                    storageMode: 'localStorage'
//                                });
//                            }
//                            for (var i = 0; i < payload.data.length; i++) {
//                                categoriesCache.put(payload.data[i].id, payload.data[i]);
//                            }
                            return payload.data;
                        }
                );
            },
            clearCategCache: function () {
                var categoriesCache = CacheFactory.get('categoriesCache');
                if (!categoriesCache || categoriesCache.length === 0) {
                    categoriesCache = CacheFactory('categoriesCache');
                    categoriesCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                var list = categoriesCache.keys();
                for (var i = 0; i < list.length; i++) {
                    categoriesCache.remove(list[i]);
                }
            }
        };
    }
]);