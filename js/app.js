
var $APP = $APP || {}; // App namespace

$APP.server = 'http://artvm23.vmnet.ro';
 // $APP.server = 'http://app.proproject.io';
//$APP.server = 'http://10.29.254.110'
//$APP.server = 'http://localhost'
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
    'angular-cache'
]);
angular.module($APP.name).run(function ($ionicPlatform, $rootScope, CategoriesService, CacheFactory) {

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
                    reload: true,
                    views: {
                        'menuContent': {
                            templateUrl: "view/form.html",
                            controller: 'FormCtrl'
                        }
                    }
                })
                .state('app.formInstance', {
                    url: "/view/:projectId/:type/:formId",
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
                    url: "/register/:projectId/:code",
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

