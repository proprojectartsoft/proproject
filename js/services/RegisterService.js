
angular.module($APP.name).factory('RegisterService', [
    '$http',
    function ($http) {
        return {
            list: function (projectId, categoryId) {
                return $http.get($APP.server + '/api/registernominated', {
                    params: {projectid: projectId, categoryid: categoryId},
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            },
            get: function (code) {
                return $http.get($APP.server + '/api/registernominated', {
                    params: {code: code}
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            }
        };
    }
]);