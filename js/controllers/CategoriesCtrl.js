angular.module($APP.name).controller('CategoriesCtrl', [
    '$scope',
    '$rootScope',
    'ProjectService',
    'CacheFactory',
    function ($scope, $rootScope, ProjectService, CacheFactory) {

//        var categoriesCache = CacheFactory.get('categoriesCache');
//        if (!categoriesCache || categoriesCache.length === 0) {
//            categoriesCache = CacheFactory('categoriesCache');
//            categoriesCache.setOptions({
//                storageMode: 'localStorage'
//            });
//        }
//        $rootScope.categories = [];
//        angular.forEach(categoriesCache.keys(), function (key) {
//            $rootScope.categories.push(categoriesCache.get(key));
//        });
//
//        $scope.change = function (id, name) {
//            $rootScope.categoryId = id;
//            $rootScope.categoryName = name;
//        };
//        console.log($rootScope.categories);

    }
]);

//
//

//            $rootScope.$on('sync.design.ready', function () {
//                $rootScope.instanceFCount = 0;
//                $rootScope.instanceTotal = 0;
//                $rootScope.instanceCount = 0;
//                //DESIGNS CACHE
//                var instanceCache = CacheFactory.get('instanceCache');
//                if (instanceCache) {
////                    designsCache.destroy();
////                    designsCache = CacheFactory('designsCache');
////                    designsCache.setOptions({
////                        storageMode: 'localStorage'
////                    });
//                    var list = instanceCache.keys();
//                    for (var i = 0; i < list.length; i++) {
//                        instanceCache.remove(list[i]);
//                    }
//                }
//                else {
//                    instanceCache = CacheFactory('instanceCache');
//                    instanceCache.setOptions({
//                        storageMode: 'localStorage'
//                    });
//                }
//                angular.forEach($rootScope.projects, function (proj) {
//                    FormInstanceService.list(proj.id).then(function (formInstance) {
//                        $rootScope.instanceFCount++;
//                        $rootScope.instanceTotal += formInstance.length;
//                        for (var k = 0; k < formInstance.length; k++) {
//                            FormInstanceService.get(formInstance[k].id).then(function (design) {
//                                instanceCache.put(design.id, design);
//                                $rootScope.instanceCount++;
//                            });
//                        }
//                    })
//                });
//                $rootScope.$watch('instanceFCount', function () {
//                    if ($rootScope.instanceFCount === $rootScope.projects.length) {
//                        $rootScope.$watch('instanceCount', function () {
////                            console.log($rootScope.designCount, $rootScope.designTotal)
//                            if ($rootScope.instanceCount === $rootScope.instanceTotal) {
////                                $rootScope.$broadcast('sync.design.ready')
//                                $rootScope.$broadcast('syncDown.complete');
//                            }
//                        });
//                    }
//                });
//            });
//
//            $rootScope.$on('sync.design.ready', function () {
//                $rootScope.instanceFCount = 0;
//                $rootScope.instanceTotal = 0;
//                $rootScope.instanceCount = 0;
//                //INSTANCE CACHE
//                var instanceCache = CacheFactory.get('instanceCache');
//                if (instanceCache) {
////                    instanceCache.destroy();
////                    instanceCache = CacheFactory('instanceCache');
////                    instanceCache.setOptions({
////                        storageMode: 'localStorage'
////                    });
//                    var list = instanceCache.keys();
//                    for (var i = 0; i < list.length; i++) {
//                        instanceCache.remove(list[i]);
//                    }
//                }
//                else {
//                    instanceCache = CacheFactory('instanceCache');
//                    instanceCache.setOptions({
//                        storageMode: 'localStorage'
//                    });
//                }
//                angular.forEach($rootScope.projects, function (proj) {
//                    FormInstanceService.list(proj.id).then(function (formInstance) {
//                        $rootScope.instanceFCount++;
//                        $rootScope.instanceTotal += formInstance.length;
//                        console.log($rootScope.instanceTotal)
//                        for (var k = 0; k < formInstance.length; k++) {
//                            FormInstanceService.get(formInstance[k].id).then(function (instance) {
//                                instanceCache.put(instance.id, instance);
//                                $rootScope.instanceCount++;
//                            });
//                        }
//                    })
//                });
//                $rootScope.$watch('instanceFCount', function () {
//                    if ($rootScope.instanceFCount === $rootScope.projects.length) {
//                        $rootScope.$watch('instanceCount', function () {
////                            console.log($rootScope.instanceCount, $rootScope.instanceTotal)
//                            if ($rootScope.instanceCount === $rootScope.instanceTotal) {
////                                $rootScope.$broadcast('sync.instance.ready')
//                                $rootScope.$broadcast('syncDown.complete');
//                            }
//                        });
//                    }
//                });
//            });
//            $rootScope.$on('sync.instance.ready', function () {
//                $rootScope.registerFCount = 0;
//                $rootScope.registerTotal = 0;
//                $rootScope.registerCount = 0;
//                //REGISTER CACHE
//                var registerCache = CacheFactory.get('registerCache');
//                if (registerCache) {
////                    registerCache.destroy();
////                    registerCache = CacheFactory('registerCache');
////                    registerCache.setOptions({
////                        storageMode: 'localStorage'
////                    });
//                    var list = registerCache.keys();
//                    for (var i = 0; i < list.length; i++) {
//                        registerCache.remove(list[i]);
//                    }
//                }
//                else {
//                    registerCache = CacheFactory('registerCache');
//                    registerCache.setOptions({
//                        storageMode: 'localStorage'
//                    });
//                }
//                //REGISTERS CACHE
//                var registersCache = CacheFactory.get('registersCache');
//                if (registersCache) {
////                    registersCache.destroy();
////                    registersCache = CacheFactory('registersCache');
////                    registersCache.setOptions({
////                        storageMode: 'localStorage'
////                    });
//                    var list = registersCache.keys();
//                    for (var i = 0; i < list.length; i++) {
//                        registersCache.remove(list[i]);
//                    }
//                }
//                else {
//                    registersCache = CacheFactory('registersCache');
//                    registersCache.setOptions({
//                        storageMode: 'localStorage'
//                    });
//                }
//                angular.forEach($rootScope.projects, function (proj) {
//                    RegisterService.list(proj.id).then(function (formRegister) {
//                        registersCache.put(proj.id, formRegister);
//                        $rootScope.registerFCount++;
//                        $rootScope.registerTotal += formRegister.length;
//                        for (var k = 0; k < formRegister.length; k++) {
//                            RegisterService.get(formRegister[k].code).then(function (register) {
//                                registerCache.put(register.code, register);
//                                $rootScope.registerCount++;
//                            });
//                        }
//                    });
//                });
//                $rootScope.$watch('registerFCount', function () {
//                    if ($rootScope.registerFCount === $rootScope.projects.length) {
//                        $rootScope.$watch('registerCount', function () {
////                            console.log($rootScope.registerCount, $rootScope.registerTotal)
//                            if ($rootScope.registerCount === $rootScope.registerTotal) {
//                                $rootScope.$broadcast('syncDown.complete')
//                            }
//                        });
//                    }
//                });
//            });
