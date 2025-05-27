(function () {
    'use strict';
    angular.module('MenuApp')
    .component("categories", {
        bindings: {
            categories: '<'
        },
        templateUrl: "module4/menuapp/categories.html"
    })
})();