angular.module($APP.name).factory('AuthService', [
    '$http',
    '$location',
    '$state',
    '$rootScope',
    'CacheFactory',
    '$ionicPopup',
    function ($http, $location, $state, $rootScope, CacheFactory, $ionicPopup) {
        var settingsCache = CacheFactory.get('settings');
        return {
            init: function () {
                $http.get($APP.server + '/api/me', {withCredentials: true}).success(function (user) {
                    $rootScope.online = true;
                    $rootScope.currentUser = {
                        id: user.id,
                        username: user.username,
                        role_id: user.role.id,
                        role_title: user.role.title,
                        active: user.active
                    };
                    $state.go("app.categories");
                }).error(function (data, status, headers, config) {
                    if (status === 403) {
                        var reloadCache = CacheFactory.get('reloadCache');
                        if (!reloadCache) {
                            reloadCache = CacheFactory('reloadCache');
                            reloadCache.setOptions({
                                storageMode: 'localStorage'
                            });
                        }
                        var user = reloadCache.get("reload");
                        if (user) {
                            $http({
                                method: 'POST',
                                url: $APP.server + '/pub/login',
                                withCredentials: true,
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Accept': 'application/json;odata=verbose'
                                },
                                transformRequest: function (obj) {
                                    return 'login.user.name=' + user.username + '&login.user.password=' + user.password + '&user=true';
                                },
                                data: user
                            }).then(function (user) {

                                console.log(user)
                                if (!user.role) {
                                    user = user.data.data;
                                }
                                $rootScope.currentUser = {
                                    id: user.id,
                                    username: user.username,
                                    role_id: user.role.id,
                                    role_title: user.role.title,
                                    active: user.active
                                };

                                settingsCache = CacheFactory.get('settings');
                                if (!settingsCache) {
                                    settingsCache = CacheFactory('settings');
                                    settingsCache.setOptions({
                                        storageMode: 'localStorage'
                                    });
                                }
                                settingsCache.put("user", $rootScope.currentUser)
                                $rootScope.online = true;
                                $state.go('app.categories');
                            }, function errorCallback(response) {
                                if (response.status === 0) {
                                    if ($rootScope.online) {
                                        showAlert1.show();
                                        $rootScope.online = false;
                                    }
                                    settingsCache = CacheFactory.get('settings');
                                    if (!settingsCache) {
                                        settingsCache = CacheFactory('settings');
                                        settingsCache.setOptions({
                                            storageMode: 'localStorage'
                                        });
                                    }
                                    $rootScope.currentUser = settingsCache.get("user");
                                    if ($rootScope.currentUser) {
                                        $state.go("app.categories");
                                    }
                                }
                                if (response.status === 502) {
                                    if ($rootScope.online) {
                                        $rootScope.online = false;
                                        alert('Server offline');
                                    }
                                }
                            });
                        } else {
                            var settingsCache = CacheFactory.get('settings');
                            if (settingsCache) {
                                settingsCache.destroy();
                            }
                            $state.go("login");
                        }
                        $rootScope.online = true;
                    } else if (status === 502) {
                        $rootScope.online = false;
                    }
                });
            },
            login: function (user) {
                return $http({
                    method: 'POST',
                    url: $APP.server + '/pub/login',
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json;odata=verbose'
                    },
                    transformRequest: function (obj) {
                        return 'login.user.name=' + user.username + '&login.user.password=' + user.password + '&user=true';
                    },
                    data: user
                }).then(function (payload) {
                    $rootScope.online = true;
                    console.log(payload.data.data)
                    $rootScope.currentUser = {
                        id: payload.data.data.id,
                        username: payload.data.data.username,
                        role_id: payload.data.data.role.id,
                        role_title: payload.data.data.role.title,
                        active: payload.data.data.active
                    };

                    var settingsCache = CacheFactory.get('settings');
                    if (!settingsCache) {
                        settingsCache = CacheFactory('settings');
                        settingsCache.setOptions({
                            storageMode: 'localStorage'
                        });
                    }
                    settingsCache.put("user", $rootScope.currentUser)

                    return payload.data.data;
                }, function errorCallback(response) {
                    if (response.status === 0) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Offline',
                            template: 'No internet connection',
                        });
                        alertPopup.then(function (res) {
                        });
                    }
                    if (response.status === 502) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Offline',
                            template: 'Server offline',
                        });
                        alertPopup.then(function (res) {
                        });
                    }
                    if (response.status === 400) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: 'Incorrect user data.',
                        });
                        alertPopup.then(function (res) {
                        });
                    }
                    if (response.status === 401) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: 'Your account has been de-activated. Contact your supervisor for further information.',
                        });
                        alertPopup.then(function (res) {
                        });
                    }
                });

            },
            logout: function () {
                return $http.post($APP.server + '/pub/logout', {}).success(function () {

                }).error(function (error) {
                    return 'error';
                });
            },
            version: function () {
                return $http.get($APP.server + '/api/userversion/session', '', {
                }).then(function (payload) {
                    return payload.data;
                });
            },
            me: function () {
                return $http.get($APP.server + '/api/me').then(function (user) {
                    $rootScope.online = true;
                    return user.data;
                }, function errorCallback(response) {
                    $rootScope.online = false;
                });
            }
        }
    }
]);