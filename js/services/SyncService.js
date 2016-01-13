angular.module($APP.name).factory('SyncService', [
    '$http',
    'CacheFactory',
    '$state',
    '$ionicPopup',
    '$timeout',
    'FormInstanceService',
    'FormDesignService',
    'InstanceService',
    'ProjectService',
    '$rootScope',
    'CategoriesService',
    function ($http, CacheFactory, $state, $ionicPopup, $timeout, FormInstanceService, FormDesignService, InstanceService, ProjectService, $rootScope, CategoriesService) {
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
                    $rootScope.formi = forms[i];
                    if (formX) {
                        console.log('* form uploaded', forms[i]);
                        FormInstanceService.create_sync(formX).then(function (response) {
                            sync.remove($rootScope.formi);
                        });
                    }
                    if (i === forms.length - 1) {
                        $rootScope.$emit('syncUp.complete');
                    }
                }
                if (aux === forms.length) {
                }

            } else {
                $rootScope.$emit('syncUp.complete');
            }
        }

        function down() {
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

            ProjectService.list().then(function (projects) {
                if (projects) {
                    var projectsCache = CacheFactory.get('projectsCache');
                    $rootScope.projects = [];
                    $rootScope.projects = projects;
                    for (var i = 0; i < projects.length; i++) {
                        projectsCache.put(projects[i].id, projects[i]);
                    }
                    $rootScope.$broadcast('sync.projects.ready');
                }
                else {
                    $rootScope.$broadcast('syncDown.complete');
                }
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
                                $rootScope.$broadcast('syncDown.complete');
                            }
                        });
                    }
                });
            });

        }

        return {
            sync: function () {
                InstanceService.reload().success(function (x) {
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
                }).error(function (y) {
                    console.log(y)
                    $ionicPopup.alert({
                        title: 'You are Offline',
                        content: 'Please go online to sync your data.'
                    });
                });
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
