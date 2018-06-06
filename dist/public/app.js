var jetbrains = angular.module("jetbrains", []);

jetbrains.controller("AppCtrl", function ($http) {
    var app = this;
    var url ="http://localhost:3000"


    app.saveProduct = function (newProduct) {
        $http({method: 'POST', url: url+"/add", data:{name:newProduct}}).then( function () {
            loadProduct()
        })
    };
    function loadProduct() {
        $http({method: 'GET', url: url}).then(function successCallback(products) {
            app.products = products.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
    loadProduct()
});