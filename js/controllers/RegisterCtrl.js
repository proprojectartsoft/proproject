angular.module($APP.name).controller('RegisterCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'RegisterService',
    '$stateParams',
    '$location',
    'FormInstanceService',
    '$ionicSideMenuDelegate',
    '$ionicHistory',
    function ($scope, $rootScope, $stateParams, RegisterService, $stateParams, $location, FormInstanceService, $ionicSideMenuDelegate, $ionicHistory) {
        $rootScope.categoryId = $stateParams.categoryId;
        
        $scope.$on('$ionicView.enter', function () {
            $ionicHistory.clearHistory();
            $ionicSideMenuDelegate.canDragContent(false);
        });
        
        $rootScope.slideHeader = false;
        $rootScope.slideHeaderPrevious = 0;
        $rootScope.slideHeaderHelper = false;
        
        RegisterService.get($stateParams.code, $stateParams.projectId).then(function (data) {
            $scope.listHelp = [];
            $scope.data = data;
            $scope.parsedData = $scope.transform(data.records)
            $scope.num = $scope.data.records.values.length;
        });
        $scope.dateToString = function (val) {
            var date = new Date(parseInt(val));
            return date.toString();
        };

        $scope.refresh = function () {
            RegisterService.get($stateParams.code, $stateParams.projectId).then(function (data) {
                $scope.listHelp = [];
                $scope.data = data;
                $scope.num = $scope.data.records.values.length;
            });
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.help = function (label, register) {
            for (var i = 0; i < register.length; i++) {
                if (register[i].key === label) {
                    return register[i].value;
                }
            }
            return '-';
        };

        $scope.change = function (id) {
            $rootScope.formId = id;
            console.log(id)
            FormInstanceService.get($rootScope.formId).then(function (data) {
                $rootScope.rootForm = data;
                $location.path("/app/view/" + $rootScope.projectId + "/register/" + $rootScope.formId);
            });
        };

        $scope.transform = function (data) {
            var list = [];
            var aux;
            angular.forEach(data.values, function (register) {
                aux = {};
                angular.forEach(register, function (reg) {
                    if (reg.key === 'Date completed') {
                        aux['date_completed'] = reg.value;
                    }
                    else {
                        aux[reg.key] = reg.value;
                    }
                });
                list.push(aux);
            });
            return list;
        };
    }
]);
