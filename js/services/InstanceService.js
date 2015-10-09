angular.module($APP.name).service('InstanceService', [
    '$http',
    function ($http) {
        return {
            me: function () {
                return $http.get($APP.server + '/api/me').then(
                        function (payload) {
                            return payload.data;
                        }
                );
            }
        };
    }
]);