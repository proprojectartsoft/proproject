
angular.module($APP.name).factory('SyncService', [
  '$q',
  '$rootScope',
  '$http',
  '$timeout',
  '$cordovaSQLite',
  '$interval',
  'DbService',
  'ResourceService',
  'ProjectService',
  'FormDesignService',
  'UserService',
  'AuthService',
  '$ionicPopup',
  '$rootScope',
  '$state',
  'FormInstanceService',
  function ($q, $rootScope, $http, $timeout,  $cordovaSQLite, $interval, DbService, ResourceService, ProjectService, FormDesignService, UserService, AuthService, $ionicPopup, $rootScope, $state, FormInstanceService) {
    function servresp(name, timer, start, response){
      this.name = name;
      this.timer = timer;
      this.response = response;
    }

    var getme = function(){
      return $http.get($APP.server + '/api/me')
      .success(function(user) {
        return user.data;
      })
      .error(function(data, status) {
        return status;
      })
    }
    var setme = function(user){
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
      })
      .success(function(user) {
        return user.data;
      })
      .error(function(data, status) {
        console.log(data, status)
        return status;
      })
    }
    var down = function(){
      AuthService.version().then(function(result){
        localStorage.setObject('ppversion',result);
      })
      //Designs
      var designs = function(){
        var obj = new servresp('designs',0,[]);
        var ping = $interval(function () {
          obj.timer += 1;
        }, 1);
        return FormDesignService.list_mobile().then(function(result){
          if(result){
            $interval.cancel(ping)
            obj.response = result;
            $APP.db.transaction(function(tx) {
              tx.executeSql('DROP TABLE IF EXISTS DesignsTable');
              tx.executeSql('CREATE TABLE IF NOT EXISTS DesignsTable (id int primary key, name text, guidance text, category_id int, permission int, data text)');
              angular.forEach(result,function(form){
                tx.executeSql('INSERT INTO DesignsTable VALUES (?,?,?,?,?,?)', [form.id,form.name,form.guidance,form.category_id,form.permission, JSON.stringify(form)]);
              });
            }, function(error) {
              console.log('Transaction ERROR: ' + error.message);
            }, function() {
            });
            return obj;
          }
        });
      }
      //Projects
      var projects = function(){
        var obj = new servresp('projects',0,[]);
        var ping = $interval(function () {
          obj.timer += 1;
        }, 1);
        return ProjectService.list_current(true).then(function(result){
          if(result){
            DbService.add('projects',result);
            $interval.cancel(ping)
            obj.response = result;
            var id = localStorage.getObject('ppprojectId');
            var name = localStorage.getObject('ppnavTitle');
            var sw = false;
            $rootScope.projects = result;
            if (id && name) {
              angular.forEach(result, function (proj) {
                if (proj.id === id && proj.name === name) {
                  sw = true;
                }
              });
            }
            if (sw === true && id && name) {
              $rootScope.navTitle = name;
              $rootScope.projectId = id;
            } else {
              $rootScope.navTitle = result[0].name;
              $rootScope.projectId = result[0].id;
              localStorage.setObject('ppnavTitle', result[0].name);
              localStorage.setObject('ppprojectId', result[0].id);
            }


            $APP.db.transaction(function(tx) {
              tx.executeSql('DROP TABLE IF EXISTS ProjectsTable');
              tx.executeSql('CREATE TABLE IF NOT EXISTS ProjectsTable (id int primary key, name text)');
              angular.forEach(result,function(project){
                tx.executeSql('INSERT INTO ProjectsTable VALUES (?,?)', [project.id,project.name]);
              });
            }, function(error) {
              console.log('Transaction ERROR: ' + error.message);
            }, function() {
            });
            return obj;
          }
        });
      }
      //Designs
      var custsett = function(){
        var obj = new servresp('custsett',0,[]);
        var ping = $interval(function () {
          obj.timer += 1;
        }, 1);
        return UserService.cust_settings().then(function(result){
          if(result){
            DbService.add('custsett',result);
            $interval.cancel(ping)
            obj.response = result;
            $APP.db.transaction(function(tx) {
              tx.executeSql('DROP TABLE IF EXISTS CustsettTable');
              tx.executeSql('CREATE TABLE IF NOT EXISTS CustsettTable (id int primary key, name text, value text)');
              angular.forEach(result,function(sett){
                tx.executeSql('INSERT INTO CustsettTable VALUES (?,?,?)', [sett.id,sett.name,sett.value]);
              });
            }, function(error) {
              console.log('Transaction ERROR: ' + error.message);
            }, function() {
            });
            return obj;
          }
        });
      }
      var resources = function(){
        var obj = new servresp('resources',0,[]);
        var ping = $interval(function () {
          obj.timer += 1;
        }, 1);
        return ResourceService.list_manager().then(function(result){
          if(result){
            DbService.add('resources',result);
            $interval.cancel(ping)
            obj.response = result;
            $APP.db.transaction(function(tx) {
              tx.executeSql('DROP TABLE IF EXISTS ResourcesTable');
              tx.executeSql('CREATE TABLE IF NOT EXISTS ResourcesTable (id int primary key, name text, data text)');
              angular.forEach(result,function(res){
                tx.executeSql('INSERT INTO ResourcesTable VALUES (?,?,?)', [res.id,res.name,JSON.stringify(res)]);
              });
            }, function(error) {
              console.log('Transaction ERROR: ' + error.message);
            }, function() {
            });
            return obj;
          }
        });
      }
      var unit = function(){
        var obj = new servresp('unit',0,[]);
        var ping = $interval(function () {
          obj.timer += 1;
        }, 1);
        return ResourceService.list_unit().then(function(result){
          if(result){
            DbService.add('unit',result);
            $interval.cancel(ping)
            obj.response = result;
            $rootScope.unit_list = result;
            $APP.db.transaction(function(tx) {
              tx.executeSql('DROP TABLE IF EXISTS UnitTable');
              tx.executeSql('CREATE TABLE IF NOT EXISTS UnitTable (id int primary key, name text, type text)');
              angular.forEach(result,function(unit){
                tx.executeSql('INSERT INTO UnitTable VALUES (?,?,?)', [unit.id,unit.name,unit.type]);
              });
            }, function(error) {
              console.log('Transaction ERROR: ' + error.message);
            }, function() {
            });
            return obj;
          }
        });
      }
      var doRequest = [designs(), projects(), custsett(),resources(), unit()]

      forms = localStorage.getObject('ppfsync');
      pics = localStorage.getObject('pppsync');
      if (forms) {
        var upRequests = [];
        angular.forEach(forms, function (form) {
          picX = false;
          formX = form.form;
          angular.forEach(pics, function (pic) {
            if(pic.id === form.id){
              picX = pic.imgs;
            }
          })
          if (formX) {
            var help1 = angular.copy(formX);
            var help2 = angular.copy(picX);
            upRequests.push(FormInstanceService.create_sync(help1, help2).then(function () {
              console.log('help', help1, help2)
            }));
          }
        });
        doRequest = doRequest.concat(upRequests);
      }


      asyncCall(doRequest,
        function error(result) {
          console.log('Some error occurred, but we get going:', result);
        },
        function success(result) {
          DbService.popclose();
          console.log(result)
        }
      );
    }
    var load = function(){
      var aux;
      $APP.db.executeSql('SELECT * FROM DesignsTable', [], function(rs) {
        aux = [];
        for(var i=0;i<rs.rows.length;i++){
          aux.push(JSON.parse(rs.rows.item(i).data));
        }
      }, function(error) {
        console.log('SELECT SQL DesignsTable statement ERROR: ' + error.message);
      });
      $APP.db.executeSql('SELECT * FROM ProjectsTable', [], function(rs) {
        $rootScope.projects = [];
        for(var i=0;i<rs.rows.length;i++){
          $rootScope.projects.push(rs.rows.item(i));
        }
        var id = localStorage.getObject('ppprojectId');
        var name = localStorage.getObject('ppnavTitle');
        var sw = false;
        if (id && name) {
          for(var i=0;i<rs.rows.length;i++){
            if (rs.rows.item(i).id === id && rs.rows.item(i).name === name) {
              sw = true;
            }
          }
        }
        if (sw === true && id && name) {
          $rootScope.navTitle = name;
          $rootScope.projectId = id;
        } else {
          $rootScope.navTitle = rs.rows.item(0).name;
          $rootScope.projectId = rs.rows.item(0).id;
          localStorage.setObject('ppnavTitle', rs.rows.item(0).name);
          localStorage.setObject('ppprojectId', rs.rows.item(0).id);
        }

        DbService.add('projects',aux);
      }, function(error) {
        console.log('SELECT SQL ProjectsTable statement ERROR: ' + error.message);
      });
      $APP.db.executeSql('SELECT * FROM CustsettTable', [], function(rs) {
        aux = [];
        for(var i=0;i<rs.rows.length;i++){
          aux.push(rs.rows.item(i));
        }
        DbService.add('custsett',aux);
      }, function(error) {
        console.log('SELECT SQL CustsettTable statement ERROR: ' + error.message);
      });
      $APP.db.executeSql('SELECT * FROM ResourcesTable', [], function(rs) {
        aux = [];
        for(var i=0;i<rs.rows.length;i++){
          aux.push(rs.rows.item(i));
        }
        DbService.add('resources',aux);
      }, function(error) {
        console.log('SELECT SQL ResourcesTable statement ERROR: ' + error.message);
      });
      $APP.db.executeSql('SELECT * FROM UnitTable', [], function(rs) {
        aux = [];
        for(var i=0;i<rs.rows.length;i++){
          aux.push(JSON.parse(rs.rows.item(i).data));
        }
        $rootScope.unit_list = aux;
        DbService.add('unit',aux);
      }, function(error) {
        console.log('SELECT SQL UnitTable statement ERROR: ' + error.message);
      });
      $state.go('app.categories', {'projectId': $rootScope.projectId});
    }
    var close = function(){
      var ppremember = localStorage.getObject('ppremember');
      if(ppremember){
        localStorage.clear();
        localStorage.setObject('ppremember', ppremember)
      }
      // });
    }
    var asyncCall =function (listOfPromises, onErrorCallback, finalCallback) {
      listOfPromises = listOfPromises || [];
      onErrorCallback = onErrorCallback || angular.noop;
      finalCallback = finalCallback || angular.noop;
      var newListOfPromises = listOfPromises.map(function (promise) {
        return promise.catch(function (reason) {
          onErrorCallback(reason);
          return {'rejected_status': reason.status};
        });
      });
      $q.all(newListOfPromises).then(finalCallback, function (result) {
        console.log(result)
      }, function (result) {
        console.log(result)
      });

    }
    return {
      sync:function(){
        $timeout(function () {
          if(navigator.onLine){
            getme()
            .success(function(data) {
              AuthService.version().then(function(result){
                if(!localStorage.getItem('ppversion') || localStorage.getItem('ppversion') < result){
                  $state.go('app.categories', {'projectId': $rootScope.projectId});
                  DbService.popopen('Sync',"<center><ion-spinner icon='android'></ion-spinner></center>", true)
                  down();
                }
                else{
                  $state.go('app.categories', {'projectId': $rootScope.projectId});
                  load();
                  DbService.popclose();
                }
              })
            })
            .error(function(data, status) {
              if(navigator.onLine){
                if(status === 403){
                  //TO DO autologin
                  var user = localStorage.getObject('ppreload');
                  if(user){
                    $state.go('app.categories', {'projectId': $rootScope.projectId});
                    DbService.popopen('Sync',"<center><ion-spinner icon='android'></ion-spinner></center>", true)
                    setme(user)
                    .success(function(user){
                      $rootScope.currentUser = {
                        id: user.data.id,
                        username: user.data.username,
                        role_id: user.data.role.id,
                        role_title: user.data.role.title,
                        active: user.data.active
                      };
                      down();
                    })
                  }
                  else{
                    DbService.popclose();
                  }
                }
                else{
                  load();
                  $timeout(function () {
                    DbService.popopen('Error',"<center>Server is offline</center>")
                    console.log('Server is offline');
                  },1000)
                }
              }
              else{
                load();
                $timeout(function () {
                  DbService.popopen('Error',"<center>You are offline</center>")
                },300)
              }
            })
          }
          else{
            load();
            $timeout(function () {
              DbService.popopen('Error',"<center>You are offline</center>")
            },300)
          }
        });
      },
      sync_button:function(){
        $timeout(function () {
          if(navigator.onLine){
            $state.go('app.categories', {'projectId': $rootScope.projectId});
            DbService.popopen('Sync',"<center><ion-spinner icon='android'></ion-spinner></center>", true)
            getme()
            .success(function(data) {
              down();
            })
            .error(function(data, status) {
              if(navigator.onLine){
                if(status === 403){
                  //TO DO autologin
                  console.log('you have been disconnected');
                  var user = localStorage.getObject('ppreload');
                  if(user){
                    $state.go('app.categories', {'projectId': $rootScope.projectId});
                    setme(user)
                    .success(function(user){
                      $rootScope.currentUser = {
                        id: user.data.id,
                        username: user.data.username,
                        role_id: user.data.role.id,
                        role_title: user.data.role.title,
                        active: user.data.active
                      };
                      down();
                    })
                  }
                }
                else{
                  load();
                  $timeout(function () {
                    DbService.popopen('Error',"<center>Server is offline</center>")
                    console.log('Server is offline');
                  },100)
                }
              }
              else{
                load();
                $timeout(function () {
                  DbService.popopen('Error',"<center>You are offline</center>")
                },100)
              }
            })
          }
          else{
            load();
            $timeout(function () {
              DbService.popopen('Error',"<center>You are offline</center>")
            },100)
          }
        });
      },
      sync_local:function(){
        testConnection()
        load();
      },
      sync_force:function(){
        $timeout(function () {
          down()
        });
      },
      sync_close:function(){
        close();
      }
    }
  }
]);
