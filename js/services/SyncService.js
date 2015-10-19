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
    function ($http, CacheFactory, $q, $ionicPopup, $timeout, FormInstanceService, FormDesignService, RegisterService, ProjectService, $rootScope) {
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
                        $rootScope.$broadcast('syncUp.complete');
                    }
                }
                if (aux === forms.length) {
                    sync.remove("3");
                }

            } else {
                // No forms to send - sync up is complete
                console.log('sync up is complete - no forms to send');
                $rootScope.$broadcast('syncUp.complete');
            }
        }

        function down() {
            console.log("Calling down function");
//
            var list, aux = 0, x = [];
//
            ProjectService.list().then(function (projects) {
                list = projects;
                $rootScope.projects = projects;
                $rootScope.$broadcast('syncDown.complete');
                $rootScope.$broadcast('sync.projects.ready');
            });
            $rootScope.formregisters = false;
            $rootScope.forminstances = false;
            $rootScope.formdesign = false;
            $rootScope.$on('sync.projects.ready', function () {
                var designsCache = CacheFactory.get('designsCache');
                if (designsCache) {
                    designsCache.destroy();
                }
                var designsListCache = CacheFactory.get('designsListCache');
                if (designsListCache) {
                    designsListCache.destroy();
                }

                var settings = CacheFactory.get('settings');
                if (!settings || settings.length === 0) {
                    settings = CacheFactory('settings');
                    settings.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                $rootScope.currentUser = settings.get('user');
                console.log(settings.get("user"));
                var designsCache = CacheFactory.get('designsCache');
                if (!designsCache || designsCache.length === 0) {
                    designsCache = CacheFactory('designsCache');
                    designsCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }
                var designsListCache = CacheFactory.get('designsListCache');
                if (!designsListCache || designsListCache.length === 0) {
                    designsListCache = CacheFactory('designsListCache');
                    designsListCache.setOptions({
                        storageMode: 'localStorage'
                    });
                }

                angular.forEach($rootScope.categories, function (categ) {                    
                    FormDesignService.list(categ.id).then(function (formDesigns) {
                        designsListCache.put(categ.id, formDesigns);
                        console.log(designsListCache, categ.id, formDesigns)
                        for (var k = 0; k < formDesigns.length; k++) {
                            FormDesignService.get(formDesigns[k].id).then(function (design) {
                                designsCache.put(design.id, design);
                            });
                        }
                    })
                });

            });
//
//            $rootScope.$on('sync.formdesign.ready', function () {
//                aux++;
//                if (aux === (list.length * 6)) {
//                    dataCache.put('offlineData', x);            
//                }
//
//
//            });

        }




        return {
            sync: function () {
                // Once sync up has complete, start syncing down.

                // First remove the listener, if it exists. Then add.
                $rootScope.$$listeners['syncUp.complete'] = undefined;
                $rootScope.$on('syncUp.complete', function (event, args) {
                    console.log("syncUp complete");
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