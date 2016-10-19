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
    }
  }
}
]);
