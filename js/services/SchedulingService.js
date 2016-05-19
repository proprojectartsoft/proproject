angular.module($APP.name).factory('SchedulingService', [
    '$http', '$rootScope',
    function ($http, $rootScope) {
        return {
            get_field: function (id) {
                return $http.get($APP.server + '/api/schedulingfield', {
                    params: {id: id},
                }).then(function (payload) {
                    return payload.data;
                });
            },
            add_field: function (data) {
                return $http.post($APP.server + '/api/schedulingfield', data, {
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    return response.data;
                });
            },
            update_field: function (data) {
                return $http.put($APP.server + '/api/schedulingfield', data, {
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    return response.data;
                });
            }
        };
    }
]);