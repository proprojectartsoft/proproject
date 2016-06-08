angular.module($APP.name).service('UserService', [
    '$http',
    '$rootScope',
    '$location',
    function ($http, $rootScope, $location) {
        return {
            update: function (dataIn) {
                return $http({
                    method: 'PUT',
                    url: $APP.server + '/api/user',
                    data: dataIn
                }).then(function (response) {
                    return response;
                });
            },
            update_free: function (dataIn) {
                return $http({
                    method: 'PUT',
                    url: $APP.server + '/api/user/share',
                    data: dataIn
                }).then(function (response) {
                    return response;
                });
            },
            create: function (dataIn) {
                dataIn.active = true;
                return $http({
                    method: 'POST',
                    url: $APP.server + '/api/user',
                    data: dataIn
                }).then(function (response) {
//                    if (response == -1) {
//                        SweetAlert.swal("Error!", "User already exist.", "error");
//                    }
                    return response.data;
                });
            },
            signUp: function (dataIn) {
                console.log(dataIn)
                return $http({
                    method: 'POST',
                    url: $APP.server + '/pub/signup',
                    data: dataIn
                }).success(function (response) {
                    $location.path('/login.html');
                }).error(function (response) {
                });
            },
            list: function () {
                return $http.get($APP.server + '/api/user').then(
                        function (payload) {
                            return payload.data;
                        });
            },
            get: function (id) {
                return $http.get($APP.server + '/api/user', {
                    params: {id: id},
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            },
            list_customer: function (customer_id) {
                return $http.get($APP.server + '/api/user/company', {
                    params: {customer_id: customer_id},
                }).then(
                        function (payload) {
                            return payload.data;
                        }
                );
            },
            cust_settings: function (id) {
                return $http.get($APP.server + '/api/companysettings', {
                    params: {customer_id: id}
                }).then(function (payload) {
                    return payload.data;
                });
            }
        };
    }
]);