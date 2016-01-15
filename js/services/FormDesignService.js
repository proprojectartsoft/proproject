angular.module($APP.name).factory('FormDesignService', [
    '$http',
    function ($http) {

        return {
            get: function (id) {
                return $http.get($APP.server + '/api/formdesign', {
                    params: {id: id}
                }).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                });
            },
            list: function (categoryId) {
                return $http.get($APP.server + '/api/formdesign', {
                    params: {categoryId: categoryId}
                }).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                });
            },
            list_mobile: function () {
                return $http.get($APP.server + '/api/formdesign/mobilelist', {
                }).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                });
            },
            checkpermission: function (id) {
                return $http.get($APP.server + '/api/formdesign/checkpermission', {
                    params: {id: id}
                }).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                }, function(result){
                    console.log('sadsadkbasndkasn')
                });
            }
        };
    }
]);
