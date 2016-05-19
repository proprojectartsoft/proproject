angular.module($APP.name).factory('StaffService', [
    '$http', '$rootScope',
    function ($http, $rootScope) {
        return {
            get_field: function (id) {
                return $http.get($APP.server + '/api/stafffield', {
                    params: {id: id},
                }).then(function (payload) {
                    return payload.data;
                });
            },
            add_field: function (data) {
                return $http.post($APP.server + '/api/stafffield', data, {
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    return response.data;
                });
            },
            update_field: function (data) {
                return $http.put($APP.server + '/api/stafffield', data, {
                }).then(function successCallback(response) {
                    return response.data;
                }, function errorCallback(response) {
                    return response.data;
                });
            },
            list_manager: function () {
                return $http.get($APP.server + '/api/staff').then(
                        function (payload) {
                            return payload.data;
                        });
            },
            upload: function (data) {
                var fd = new FormData();
                for (var key in data)
                    fd.append(key, data[key]);
                return $http.post($APP.server + 'api/stafffield/importstaffsfile', fd, {
                    headers: {'Content-Type': undefined}
                }).then(function successCallback(response) {
                    $rootScope.uploadStatus = 'ok';
                }, function errorCallback(response) {
                    $rootScope.uploadStatus = 'error';
                });
            },
        };
    }
]);