angular.module($APP.name).factory('FormDesignService', [
    '$http',
    function ($http) {

        return {
            get: function (id) {
                return $http.get($APP.server + '/api/formdesign', {
                    params: {id: id},
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            },
            list: function (categoryId) {
                return $http.get($APP.server + '/api/formdesign', {
                    params: {categoryId: categoryId}
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            }
        };
    }
]);
