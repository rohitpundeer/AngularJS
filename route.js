(function () {
    'use strict';

    angular.module('AngularJsApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider']
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('toomuch', {
            url: '/toomuch',
            templateUrl: 'module1/too-much.html'
        }).state('checkout', {
            url: '/shopping-list-checkout',
            templateUrl: 'module2/checkout.html'
        }).state('menusearch', {
            url: '/menu-search',
            templateUrl: 'module3/menu-search.html'
        }).state('restaurantmenu', {
            abstract: true,
            templateUrl: 'module4/menuapp/menuapp.html'
        }).state('restaurantmenu.home', {
            url: '/',
            templateUrl: 'module4/menuapp/home.html'
        }).state('restaurantmenu.categories', {
            url: '/categories',
            component: 'categories',
            resolve: {
                categories: ['MenuDataService',
                    function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
            }
        }).state('restaurantmenu.items', {
            url: '/items/{categoryShortName}',
            component: 'items',
            resolve: {
                selectedCategoryDetails: ['MenuDataService', '$stateParams',
                    function (MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                    }]
            }
        }).state('module5', {
            abstract:true,
            templateUrl: 'module5/newsletter.html'
        })
        .state('module5.newsletter', {
            url: '/newsletter',
            component:'newsletterhome' 
        }).state('module5.signup', {
            url: '/signup',
            component: 'signup'
        }).state('module5.myinfo', {
            url: '/myinfo',
            component: 'myinfo'
        });
    }
})();