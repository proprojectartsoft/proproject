angular.module($APP.name).service('ShareService', [
    '$http',
    '$rootScope',
    '$location',
    function ($http, $rootScope, $location) {
        return {
            form: {
                delete: function (id) {
                    return $http({
                        method: 'DELETE',
                        url: $APP.server + '/api/share',
                        params: {id: id}
                    }).then(function (response) {
                        return response.data;
                    });
                },
                create: function (id, email) {
                    return $http({
                        method: 'POST',
                        url: $APP.server + '/api/share',
                        params: {formId: id, email: email}
                    }).then(function (response) {
                        return response.data;
                    });
                },
                list: function (shared) {
                    return $http.get($APP.server + '/api/share', {
                        params: {shared: shared}
                    }).then(function (payload) {
                        return payload.data;
                    }
                    );
                }
            },
            comment: {
                create: function (dataIn) {
                    return $http({
                        method: 'POST',
                        url: $APP.server + '/api/sharedcomment',
                        data: dataIn
                    }).then(function (payload) {
                        return payload.data;
                    });
                },
                list: function (id) {
                    return $http.get($APP.server + '/api/sharedcomment', {
                        params: {id: id}
                    }).then(function (payload) {
                        return payload.data;
                    });
                }
            }
        };
    }
]);