angular.module($APP.name).service('FieldUpdateService', function ($rootScope) {
    var productList = [];

    var addProduct = function (newObj) {
        productList = newObj;
    };

    var getProducts = function () {
        return productList;
    };

    return {
        addProduct: addProduct,
        getProducts: getProducts
    };

});