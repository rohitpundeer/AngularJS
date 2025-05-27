(function () {
    'use strict';
    angular.module('AngularJsApp')
        .controller('AppController', AppController)
        .controller('TooMuchController', TooMuchController)
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .controller('NarrowItDownController', NarrowItDownController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    /// All Controller Definations Goes Here   
    AppController.$inject = ["$scope", "$state"];
    function AppController($scope, $state) {

        $scope.btnReviewModule1Clicked = function () {
             $state.go("toomuch");
        }

        $scope.btnReviewModule2Clicked = function () {
             $state.go("checkout");
        }

        $scope.btnReviewModule3Clicked = function () {
             $state.go("menusearch");
        }

        $scope.btnReviewModule4Clicked = function () {
             $state.go("restaurantmenu.home");
        }

        $scope.btnReviewModule5Clicked = function () {
             $state.go("module5.newsletter");
        }
    }

    TooMuchController.$inject = ["$scope"];
    function TooMuchController($scope) {
        $scope.items = "";
        $scope.message = "";
        $scope.isError = false;
        $scope.CheckIfTooMuch = function () {
            var items = $scope.items && $scope.items.length > 0 ? $scope.items.split(",") : [];
            var counter = 0;
            for (var i = 0; i < items.length; i++) {
                if (items[i].trim().length > 0) {
                    counter++;
                }
                if (counter > 3) {
                    break;
                }
            }
            if (counter > 3) {
                $scope.isError = false;
                $scope.message = "Too Much!";
            }
            else if (counter > 0 && counter <= 3) {
                $scope.isError = false;
                $scope.message = "Enjoy!";
            }
            else {
                $scope.isError = true;
                $scope.message = "Please enter data first!";
            }
        }
    }

    ToBuyController.$inject = ["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService) {
        this.toBuyList = ShoppingListCheckOffService.getToBuyList();
        this.buyClicked = function (index) {
            ShoppingListCheckOffService.buyClicked(index);
        }
    }

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.alreadyBoughtList = ShoppingListCheckOffService.getAlreadyBoughtList();
        this.reset = function () {
            ShoppingListCheckOffService.resetLists();
        }
    }

    NarrowItDownController.$inject = ["MenuSearchService"];
    function NarrowItDownController(MenuSearchService) {
        var nidCtrl = this;
        nidCtrl.searchText = "";
        nidCtrl.message = "";
        nidCtrl.foundItems = [];
        nidCtrl.narrowItDownClicked = function () {
            nidCtrl.message = "";
            if (!nidCtrl.searchText?.trim()) {
                nidCtrl.foundItems = [];
                nidCtrl.message = "Nothing found!";
                return;
            }
            var promise = MenuSearchService.getMatchedMenuItems(nidCtrl.searchText.trim());

            promise.then(function (found) {
                nidCtrl.foundItems = found;
                if (nidCtrl.foundItems.length === 0) {
                    nidCtrl.message = "Nothing found!";
                }
            }).catch(function (error) {
                console.log("Error : " + error);
                nidCtrl.message = "Nothing found!";
            });
        }
        this.removeMenuItem = function (index) {
            nidCtrl.foundItems.splice(index, 1);
        }
    }

    /// Services Goes Here 
    function ShoppingListCheckOffService() {
        var toBuyList = [{ name: "Cookies", quantity: 10 },
        { name: "Soda", quantity: 5 },
        { name: "Juice", quantity: 7 },
        { name: "Apples", quantity: 20 },
        { name: "Coffee", quantity: 15 }
        ];
        var alreadyBoughtList = [];

        this.getToBuyList = function () {
            return toBuyList;
        }

        this.getAlreadyBoughtList = function () {
            return alreadyBoughtList;
        }

        this.buyClicked = function (index) {
            alreadyBoughtList.push(toBuyList[index]);
            toBuyList.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ["$http", "$filter"];
    function MenuSearchService($http, $filter) {

        this.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'get',
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
            }).then(function (response) {
                var data = [];
                angular.forEach(response.data, function (category) {
                    angular.forEach(category.menu_items, function (item) {
                        if ((item.name.toLowerCase()).indexOf(searchTerm.toLowerCase()) > -1)
                            data.push(item);
                    });
                });
                return data;
            });
        }
    }

    function FoundItems() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            }
        }
        return ddo;
    }
})();