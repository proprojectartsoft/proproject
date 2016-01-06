
angular.module($APP.name).factory('RegisterService', [
    '$http',
    function ($http) {
        return {
            list: function (projectId, categoryId) {
                return $http.get($APP.server + '/api/newregister', {
                    params: {projectid: projectId, categoryid: categoryId},
                }).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                });
            },
            get: function (code) {
                return $http.get($APP.server + '/api/newregister', {
                    params: {code: code}
                }).then(
                        function (payload) {
                            return payload.data;
                        }, function (err) {
                });
            }
        };
    }
]);