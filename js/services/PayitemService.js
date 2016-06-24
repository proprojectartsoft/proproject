angular.module($APP.name).factory('PayitemService', [
    '$http', '$rootScope',
    function ($http, $rootScope) {
        return {
            get_field: function (id) {
                return $http.get($APP.server + '/api/payitemfield', {
                    params: {id: id},
                }).then(function (payload) {
                    return payload.data;
                });
            },
            add_field: function (data) {
                return $http.post($APP.server + '/api/payitemfield', data, {
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    return response.data;
                });
            },
            update_field: function (data) {
                return $http.put($APP.server + '/api/payitemfield', data, {
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    return response.data;
                });
            },
            list_payitems: function (id) {
                return $http.get($APP.server + '/api/payitem', {
                    params: {projectId: id},
                }).then(
                        function (payload) {
                            return payload.data;
                        });
            }
        };
    }
]);