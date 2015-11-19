angular.module($APP.name).factory('SyncService', [
    '$http',
    'CacheFactory',
    '$q',
    '$ionicPopup',
    '$timeout',
    'FormInstanceService',
    'FormDesignService',
    'RegisterService',
    'ProjectService',
    '$rootScope',
    'CategoriesService',
    function ($http, CacheFactory, $q, $ionicPopup, $timeout, FormInstanceService, FormDesignService, RegisterService, ProjectService, $rootScope, CategoriesService) {
        var projectsReadyDestroyer = function () {
        };
        var categoriesReadyDestroyer = function () {
        };
        var designReadyDestroyer = function () {
        };
        var designCountReadyDestroyer = function () {
        };
        var designFCountReadyDestroyer = function () {
        };
        function up() {
            console.log("Calling up function");
            var sync = CacheFactory.get('sync');
            console.log('SYNC');
            if (!sync || sync.length === 0) {
                sync = CacheFactory('sync');
            }
            var forms = sync.keys();
            if (forms.length) {
                var aux = 0;
                for (var i = 0; i < forms.length; i++) {
                    var formX = sync.get(forms[i]);
                    if (formX) {
                        console.log('* form uploaded', forms[i]);
                        FormInstanceService.create(formX, true).then(function (response) {
                            sync.remove(forms[i]);
//                            aux++
                        });
                    }
//                    console.log(i, form.length)
                    if (i === forms.length - 1) {
                        $rootScope.$emit('syncUp.complete');
                    }
                }
                if (aux === forms.length) {
                    sync.remove("3");
                }

            } else {
                // No forms to send - sync up is complete
                console.log('sync up is complete - no forms to send');
                $rootScope.$emit('syncUp.complete');
            }
        }

        function down() {
            console.log("Calling down function");
            //PROJECT CACHE
            var projectsCache = CacheFactory.get('projectsCache');
            if (projectsCache) {
                projectsCache.destroy();
                projectsCache = CacheFactory('projectsCache');
                projectsCache.setOptions({
                    storageMode: 'localStorage'
                });
            } else {
                projectsCache = CacheFactory('projectsCache');
                projectsCache.setOptions({
                    storageMode: 'localStorage'
                });
            }





            //USER CACHE
            var settings = CacheFactory.get('settings');
            if (!settings || settings.length === 0) {
                settings = CacheFactory('settings');
                settings.setOptions({
                    storageMode: 'localStorage'
                });
            }
            $rootScope.currentUser = settings.get('user');

            $rootScope.projects = [];

            ProjectService.list().then(function (projects) {
                $rootScope.projects = projects;
                for (var i = 0; i < projects.length; i++) {
                    projectsCache.put(projects[i].id, projects[i]);
                }
                $rootScope.$broadcast('sync.projects.ready');
            });
            projectsReadyDestroyer = $rootScope.$on('sync.projects.ready', function () {
//                CATEGORIES CACHE
                var categoriesCache = CacheFactory.get('categoriesCache');
                if (!categoriesCache) {
                    categoriesCache = CacheFactory('categoriesCache');
                    categoriesCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                $rootScope.categories = [];
                CategoriesService.list().then(function (categories) {
                    angular.forEach(categories, function (ctg) {
                        categoriesCache.put(ctg.id, ctg);
                        $rootScope.categories.push(ctg);
                    });

                    $rootScope.$emit('sync.categories.ready');
                });
            });


            categoriesReadyDestroyer = $rootScope.$on('sync.categories.ready', function () {
                $rootScope.designFCount = 0;
                $rootScope.designTotal = 0;
                $rootScope.designCount = 0;
                $rootScope.categSw = 0;
                $rootScope.sw = 0;

                angular.forEach($rootScope.categories, function (ctg) {
                    FormDesignService.list(ctg.id).then(function (formDesigns) {
                        $rootScope.designFCount++;
                        $rootScope.designTotal += formDesigns.length;
                    })
                });
                $rootScope.$watch('designFCount', function () {
                    if ($rootScope.sw === 0) {
                        $rootScope.sw++;
                        $rootScope.$emit('sync.design.ready');
                    }
                });
            });
//            $rootScope.$on('sync.design.ready', function () {
//                $rootScope.instanceFCount = 0;
//                $rootScope.instanceTotal = 0;
//                $rootScope.sw = 0;
//
//                angular.forEach($rootScope.projects, function (prj) {
//                    FormInstanceService.list(prj.id).then(function (formInstance) {
//                        $rootScope.instanceFCount++;
//                        $rootScope.instanceTotal += formInstance.length;
//                    })
//                });
//                $rootScope.$watch('instanceFCount', function () {
//                    if ($rootScope.instanceFCount === $rootScope.projects.length && $rootScope.sw === 0) {
//                        $rootScope.sw++;
//                        $rootScope.$emit('sync.instance.ready');
//                    }
//                });
//            });
//            $rootScope.$on('sync.instance.ready', function () {
//                $rootScope.registerFCount = 0;
//                $rootScope.registerTotal = 0;
//                $rootScope.sw = 0;
//
//                angular.forEach($rootScope.projects, function (prj) {
//                    RegisterService.list(prj.id).then(function (formRegister) {
//                        $rootScope.registerFCount++;
//                        $rootScope.registerTotal += formRegister.length;
//                    })
//                });
//                $rootScope.$watch('registerFCount', function () {
//                    if ($rootScope.registerFCount === $rootScope.projects.length && $rootScope.sw === 0) {
//                        $rootScope.sw++;
//                        $rootScope.$emit('size.ready');
//                    }
//                });
//            });
            designReadyDestroyer = $rootScope.$on('sync.design.ready', function () {
                $rootScope.designCount = 0;
                $rootScope.designFCount = 0;
                //DESIGNS CACHE
                var designsCache = CacheFactory.get('designsCache');
                if (designsCache) {
                    var list = designsCache.keys();
                    for (var i = 0; i < list.length; i++) {
                        designsCache.remove(list[i]);
                    }
                }
                else {
                    designsCache = CacheFactory('designsCache');
                    designsCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                angular.forEach($rootScope.categories, function (ctg) {
                    FormDesignService.list(ctg.id).then(function (formDesigns) {
                        $rootScope.designFCount++;
                        for (var k = 0; k < formDesigns.length; k++) {
                            FormDesignService.get(formDesigns[k].id).then(function (design) {
                                designsCache.put(design.id, design);
                                $rootScope.designCount++;
                            });
                        }
                    })
                });
                designFCountReadyDestroyer = $rootScope.$watch('designFCount', function () {
                    if ($rootScope.designFCount === $rootScope.categories.length) {
                        designCountReadyDestroyer = $rootScope.$watch('designCount', function () {
                            if ($rootScope.designCount === $rootScope.designTotal) {
                                console.log('wut')
//                                $rootScope.$broadcast('sync.design.ready')
                                $rootScope.$broadcast('syncDown.complete');
                            }
                        });
                    }
                });
            });

        }




        return {
            sync: function () {
                // Once sync up has complete, start syncing down.

                // First remove the listener, if it exists. Then add.
                $rootScope.$$listeners['syncUp.complete'] = undefined;
                $rootScope.$on('syncUp.complete', function (event, args) {
                    console.log("syncUp complete");
                    projectsReadyDestroyer();
                    categoriesReadyDestroyer();
                    designReadyDestroyer();
                    designFCountReadyDestroyer();
                    designCountReadyDestroyer();
                    down();
                });

                // First remove the listener, if it exists. Then add.
                $rootScope.$$listeners['syncDown.complete'] = undefined;
                $rootScope.$on('syncDown.complete', function (event, args) {
                    console.log("syncDown complete");
                    // Close the sync progress popup
                    $rootScope.syncPopup.close();
                });

                if (window.navigator.onLine) {

                    // Open a popup to block the UI
                    $rootScope.syncPopup = $ionicPopup.alert({
                        title: "Syncing",
                        template: "<center><ion-spinner icon='android'></ion-spinner></center>",
                        content: "",
                        buttons: []
                    });

                    // We need to delay slightly to allow popup above to instantiate
                    $timeout(function () {
                        console.log("STARTING SYNC");
                        up();
                    }, 200);

                    // We will call Sync.down() once Sync.up() has completed.
                    //Sync.down();
                }
                else {
                    $ionicPopup.alert({
                        title: 'You are Offline',
                        content: 'Please go online to sync your data.'
                    });
                }
            },
            upSync: function () {
                console.log("Calling up factory method");
                up();
            },
            downSync: function () {
                console.log("Calling down factory method");
                down();
            },
            numNonSynced: function () {
                var sync = $angularCacheFactory('sync');
                if (!sync || sync.length == 0) {
                    return 0;
                }
                return sync.keys().length;
            }
        };
    }
]);
