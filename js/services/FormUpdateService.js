angular.module($APP.name).service('FormUpdateService', function ($rootScope) {
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