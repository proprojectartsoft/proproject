
var $APP = $APP || {}; // App namespace
// $APP.server = 'http://app.preprod.proproject.io/';
$APP.server = 'http://artvm23.vmnet.ro';
//$APP.server = 'http://proproject.artsoft-consult.ro';
$APP.name = 'proproject';
$APP.mobile = true;
$APP.CONFIG;
$APP.DEBUG = true;
$APP.shareUrl = 'https://app.proproject.co.uk/form/';


angular.module($APP.name, [
    'ionic',
    'ionic-datepicker',
    'ionic-timepicker',
    'angularMoment',
    'angular-cache',
    'ngCordova'
]);
angular.module($APP.name).run(function ($ionicPlatform, CacheFactory) {

    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
            StatusBar.overlaysWebView(false);
        }
        var sync = CacheFactory.get('sync');
        if (!sync) {
            sync = CacheFactory('sync');
        }
        sync.setOptions({
            storageMode: 'localStorage'
        });


    });

});
angular.module($APP.name).config([
    '$stateProvider',
    'CacheFactoryProvider',
    '$urlRouterProvider',
    function ($stateProvider, CacheFactoryProvider, $urlRouterProvider) {

        angular.extend(CacheFactoryProvider.defaults, {maxAge: 15 * 60 * 1000});
        $stateProvider
                .state('app', {
                    url: "/app",
                    abstract: true,
                    templateUrl: "view/menu.html",
                    controller: 'NavCtrl'
                })
                .state('app.categories', {
                    url: "/categories/:projectId",
                    params: {
                        projectId: null
                    },
                    views: {
                        'menuContent': {
                            templateUrl: "view/categories.html",
                            controller: 'CategoriesCtrl'
                        }
                    }
                })
                .state('app.about', {
                    url: "/about",
                    views: {
                        'menuContent': {
                            templateUrl: "view/about.html",
                            controller: 'AboutCtrl'
                        }
                    }
                })

                .state('app.forms', {
                    url: "/category/:projectId/:categoryId",
                    params: {
                        projectId: null,
                        categoryId: null
                    },
                    reload: true,
                    views: {
                        'menuContent': {
                            templateUrl: "view/forms.html",
                            controller: "FormsCtrl"
                        }
                    }
                })
                .state('app.form', {
                    url: "/form/:projectId/:formId",
                    params: {
                        projectId: null,
                        formId: null
                    },
                    reload: true,
                    views: {
                        'menuContent': {
                            templateUrl: "view/form.html",
                            controller: 'FormCtrl'
                        }
                    }
                })
                .state('app.edit', {
                    url: "/edit/:projectId/:formId",
                    params: {
                        projectId: null,
                        formId: null
                    },
                    reload: true,
                    views: {
                        'menuContent': {
                            templateUrl: "view/edit.html",
                            controller: 'EditCtrl'
                        }
                    }
                })
                .state('app.formInstance', {
                    url: "/view/:projectId/:type/:formId",
                    params: {
                        projectId: null,
                        type: null,
                        formId: null
                    },
                    reload: true,
                    views: {
                        'menuContent': {
                            templateUrl: "view/form-instance.html",
                            controller: 'FormInstanceCtrl'
                        }
                    }
                })
                .state('app.completed', {
                    url: "/view/:projectId/:categoryId",
                    params: {
                        projectId: null,
                        categoryId: null
                    },
                    reload: true,
                    views: {
                        'menuContent': {
                            templateUrl: "view/completed.html",
                            controller: 'FormCompletedCtrl'
                        }
                    }
                })
                .state('app.registers', {
                    url: "/registers/:projectId/:categoryId",
                    params: {
                        projectId: null,
                        categoryId: null
                    },
                    reload: true,
                    cache: false,
                    views: {
                        'menuContent': {
                            templateUrl: "view/registers.html",
                            controller: "RegistersCtrl"
                        }
                    }
                })
                .state('app.register', {
                    url: "/register/:projectId/:categoryId/:code",
                    params: {
                        categoryId: null,
                        projectId: null,
                        code: null
                    },
                    reload: true,
                    views: {
                        'menuContent': {
                            templateUrl: "view/register.html",
                            controller: 'RegisterCtrl'
                        }
                    }
                })
                .state('login', {
                    url: "/login",
                    templateUrl: "view/login.html",
                    controller: "LoginCtrl"
                });
        $urlRouterProvider.otherwise('/login'); //hardcoded for start
    }
]);

