angular.module($APP.name).factory('ReloadMeService', [
    'CacheFactory',
    function (CacheFactory) {

        var reloadCache = CacheFactory.get('reloadCache');

        // Check to make sure the cache doesn't already exist
        if (!reloadCache) {
            reloadCache = CacheFactory('reloadCache');
            reloadCache.setOptions({
                storageMode: 'localStorage'
            });
        }

        return {
            set: function (user, password) {
                reloadCache.put('reload', {
                    username: user,
                    password: password
                });
            },
            get: function () {
                
                return reloadCache.get('reload');
            },
            clear: function () {
                reloadCache.destroy();
            }
        };

    }
]);