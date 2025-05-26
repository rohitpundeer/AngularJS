(function () {
    'use strict';
    angular.module('MenuApp')
    .component("items", {
        bindings: {
            selectedCategoryDetails : '<'
        },
        templateUrl: "module4/menuapp/items.html"
    })
})();