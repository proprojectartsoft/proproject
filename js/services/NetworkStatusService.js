//angular.module($APP.name).factory('TestService', [
//    '$rootScope',
//    '$window',
//    function ($rootScope, $window) {
//        $rootScope.online = navigator.onLine;
//        $window.addEventListener("offline", function () {
//            $rootScope.$apply(function () {
//                $rootScope.online = false;
//            });
//        }, false);
//        $window.addEventListener("online", function () {
//            $rootScope.$apply(function () {
//                $rootScope.online = true;
//            });
//        }, false);
//        return $rootScope.online;
//    }
//]);

angular.module($APP.name).factory('TestService', [
    '$rootScope',
    '$window',
    function ($rootScope, $window) {
        $rootScope.online = navigator.onLine;
        $window.addEventListener("offline", function () {
            $rootScope.$apply(function () {
                $rootScope.online = false;
            });
        }, false);
        $window.addEventListener("online", function () {
            $rootScope.$apply(function () {
                $rootScope.online = true;
            });
        }, false);
        return $rootScope.online;
    }
]);