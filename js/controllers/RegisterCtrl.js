angular.module($APP.name).controller('RegisterCtrl', [
    '$scope',
    '$rootScope',
    '$stateParams',
    'RegisterService',
    '$stateParams',
    '$location',
    'FormInstanceService',
    'CacheFactory',
    function ($scope, $rootScope, $stateParams, RegisterService, $stateParams, $location, FormInstanceService, CacheFactory) {
        
        $rootScope.categoryId = $stateParams.categoryId;
        RegisterService.get($stateParams.code).then(function (data) {
            $scope.listHelp = [];
            $scope.data = data;
            $scope.num = $scope.data.records.values.length;
        });
        var categoriesCache = CacheFactory.get('categoriesCache');
        if (!categoriesCache || categoriesCache.length === 0) {
            categoriesCache = CacheFactory('categoriesCache');
            categoriesCache.setOptions({
                storageMode: 'localStorage'
            });
        }

        $scope.dateToString = function (val) {
            var date = new Date(parseInt(val));
            return date.toString();
        };

        $scope.refresh = function () {
            RegisterService.get($rootScope.formName).then(function (data) {
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
        $scope.increment = function (x) {
            console.log(x);
        }

        $scope.back = function () {
            console.log($stateParams);
        };
        $scope.change = function (reg) {
            $rootScope.formId = $scope.help('instance_id', reg);
            FormInstanceService.get($rootScope.formId).then(function (data) {
                $rootScope.rootForm = data;
                $location.path("/app/view/" + $rootScope.projectId + "/register/" + $rootScope.formId);
            });
        }
    }
]);
