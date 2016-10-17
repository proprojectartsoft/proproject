angular.module($APP.name).factory('DbService', [
  '$http','$ionicPopup','$timeout',
  function ($http, $ionicPopup, $timeout) {
    inmemdb = {};
    var testpop;

    return {
      popopen: function(title, template, noSync){
        $timeout(function () {
          if(testpop){
            testpop.close();
            $timeout(function () {
              var btns = [];
              if (!noSync){
                btns = [{
                  text: 'Ok' ,
                  type: 'button-positive'
                }
              ]
            }
            testpop = $ionicPopup.show({
              template: template,
              title: title,
              buttons: btns

            })
          });
        }
        else{
          $timeout(function () {
            var btns = [];
            if (!noSync){
              btns = [{
                text: 'Ok' ,
                type: 'button-positive'
              } ]
            }
            testpop = $ionicPopup.show({
              template: template,
              title: title,
              buttons: btns
            });

          });
        }
      });
    },
    popclose:function(){
      if(testpop){
        testpop.close();
      }
    },
    add : function(predicate, data){
      inmemdb[predicate] = data;
    },
    get : function(predicate){
      return inmemdb[predicate];
    },
    list: function(){
      return inmemdb;
    },
    list_design: function(categoryId){
      return $APP.db.executeSql('SELECT * FROM DesignsTable WHERE category_id='+categoryId, [], function(rs) {
        var aux = [];
        for(var i=0;i<rs.rows.length;i++){
          aux.push(JSON.parse(rs.rows.item(i).data));
        }
        return aux;
      }, function(error) {
        console.log('SELECT SQL DesignsTable statement ERROR: ' + error.message);
        return [];
      });
    },
    get_design: function(id){
      return $APP.db.executeSql('SELECT * FROM DesignsTable WHERE id='+$stateParams.formId, [], function(rs) {
        return JSON.parse(rs.rows.item(0).data)
      }, function(error) {
        console.log('SELECT SQL DesignsTable statement ERROR: ' + error.message);
        return {};
      });
    }

  }
}
]);
