(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'module4//menuapp/home.html'
        }).state('categories', {
            url: '/categories',
            component: 'categories',
            resolve: {
                categories: ['MenuDataService',
                    function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
            }

        }).state('items', {
            url: '/items/{categoryShortName}',
            component: 'items',
            resolve : {
                selectedCategoryDetails: ['MenuDataService', '$stateParams',
                    function (MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
            }
        });
    }
})();