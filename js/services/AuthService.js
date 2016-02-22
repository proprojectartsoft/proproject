angular.module($APP.name).factory('AuthService', [
    '$http',
    '$location',
    '$state',
    '$rootScope',
    'CacheFactory',
    '$ionicPopup',
    'SyncService',
    function ($http, $location, $state, $rootScope, CacheFactory, $ionicPopup, SyncService) {
        var userRoles = {
            'pub': {
                'title': 'pub',
                'access': 0
            },
            'user': {
                'title': 'user',
                'access': 1
            },
            'super': {
                'title': 'super',
                'access': 2
            },
            'admin': {
                'admin': 'admin',
                'access': 3
            }
        };
        $rootScope.currentUser = {
            username: '',
            role: userRoles.pub
        };
        var settingsCache = CacheFactory.get('settings');
        if (!settingsCache) {
            settingsCache = CacheFactory('settings');
            settingsCache.setOptions({
                storageMode: 'localStorage'
            });
        }

        function changeUser(user) {
            $rootScope.currentUser = user;
            var settingsCache = CacheFactory.get('settings');
            if (!settingsCache) {
                settingsCache = CacheFactory('settings');
                settingsCache.setOptions({
                    storageMode: 'localStorage'
                });
            }
            settingsCache.put("user", user);
        }
        var showAlert1 = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Offline',
                template: 'Could not connect to the cloud'
            });
        };
        var showAlert2 = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Offline',
                template: 'Server offline'
            });
        };
        var showAlert3 = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Try again',
                template: 'Incorrect user data'
            });
        };

        return {
            authorize: function (access, role) {
                var ok;
                if (role.title === undefined) {
                    role = $rootScope.currentUser.role;
                    if (!role.title)
                        role = userRoles.pub;
                    ok = 0;
                } else {
                    if (role.title === userRoles.user.title) {
                        if (access.title === userRoles.user.title) {
                            ok = true;
                        }
                    }
                    if (role.title === userRoles.super.title) {
                        if (access.title === userRoles.super.title) {
                            ok = true;
                        }
                    }
                    if (role.title === userRoles.admin.title) {
                        if (access.title === userRoles.admin.title) {
                            ok = true;
                        }
                    }
                }
                return ok;
            },
            init: function (accessLevel) {
                $http.get($APP.server + '/api/me', {withCredentials: true}).success(function (user) {
                    changeUser(user);
                    var role = $rootScope.currentUser.role;
                    if (!role)
                        role = userRoles.pub;
                    if (!(accessLevel.title === role.title)) {
                        $state.go('login');
                    } else {
                    }

                }).error(function (data, status, headers, config) {
                    if (status === 403) {
                        $location.path('/login');
                    } else if (status === 502) {
                        $rootScope.online = false;
                    }
                });
            },
            meTest: function () {
                $http.get($APP.server + '/api/me', {withCredentials: true}).success(function (user) {
                });
            },
            isLoggedIn: function (user) {
                var ok = false;
                if (user === undefined)
                    user = $rootScope.currentUser;
                if (user.username === $rootScope.currentUser.username) {
                    ok = true;
                }
                return ok;
            },
            autoLogFix: function () {
                var settingsCache = CacheFactory.get('settings');
                if (!settingsCache) {
                    settingsCache = CacheFactory('settings');
                    settingsCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                $rootScope.currentUser = settingsCache.get("user");
                var reloadCache = CacheFactory.get('reloadCache');
                if (!reloadCache) {
                    reloadCache = CacheFactory('reloadCache');
                    reloadCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                $rootScope.currentUser = settingsCache.get("user");
                var user = reloadCache.get("reload");
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
                }).then(function (user) {
                    changeUser(user.data.data);
                    $rootScope.online = true;
                }, function errorCallback(response) {
                    if (response.status === 502 || response.status === 0) {
                        if ($rootScope.online) {
                            $rootScope.online = false;
                            alert('Server offline');
                        }
                    }
                });
            },
            isLoggedInCache: function () {
                var settingsCache = CacheFactory.get('settings');
                if (!settingsCache) {
                    settingsCache = CacheFactory('settings');
                    settingsCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                $rootScope.currentUser = settingsCache.get("user");
                var reloadCache = CacheFactory.get('reloadCache');
                if (!reloadCache) {
                    reloadCache = CacheFactory('reloadCache');
                    reloadCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                $rootScope.currentUser = settingsCache.get("user");
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
                        changeUser(user.data.data);
                        $rootScope.online = true;
                        $state.go('app.categories');
                    }, function errorCallback(response) {
                        if (response.status === 0) {
                            if ($rootScope.online) {
                                showAlert1.show();
                                $rootScope.online = false;
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
                        if (response.status === 400) {
                            alert('Incorrect user data');
                        }
                    });
                }
            },
            isLoggedInWithCallback: function () {
                var loggedIn = this.isLoggedIn;
                $http.get($APP.server + '/api/me', {withCredentials: true}).success(function (user) {
                    if (loggedIn(user)) {
                    } else {
                        $location.path('/login');
                    }
                }).error(function (data, status, headers, config) {
                    if (status === 403) {
                        $location.path('/login');
                    } else if (status === 502) {
                        $rootScope.online = false;
                    }
                });
            },
            login: function (user, success, error) {
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
                }).then(function (data) {
                    changeUser(data.data.data);
                    $rootScope.online = true;
                    return data.data.data;
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
            me: function () {
                return $http.get($APP.server + '/api/me').then(function (user) {
                    return user.data;
                }, function errorCallback(response) {
                    $rootScope.online = false;

                });
            },
            logout: function () {
                CacheFactory.destroy('reloadCache');
                return $http.post($APP.server + '/pub/logout', {}).success(function () {

                    changeUser({
                        username: '',
                        role: userRoles.pub
                    });
                }).error(function (error) {
                    return error;
                });
            },
            forgotpassword: function (email) {
                return $http.post($APP.server + '/pub/forgetpassword', '', {
                    params: {'email': email}
                }).then(function (payload) {
                    return payload.data;
                });
            },
            version: function () {
                return $http.get($APP.server + '/api/userversion/session', '', {
                }).then(function (payload) {
                    return payload.data;
                });
            },
            userRoles: userRoles,
            user: $rootScope.currentUser
        };
    }
]);