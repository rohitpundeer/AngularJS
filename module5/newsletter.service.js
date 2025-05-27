(function () {
    'use strict';
    angular.module('Newsletter').service("NewsletterService", NewsletterService);

    NewsletterService.$inject = ["$http"];
    function NewsletterService($http) {
        this.saved_info = null;
        this.validateMenuCode = function (shortName, itemNumber) {
            return $http({
                method: 'get',
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/"
                    + shortName + "/menu_items/" + itemNumber + ".json"
            }).then(function (response) {
                return response;
            });
        }

        this.completeSignup = function (data) {
            this.saved_info = data;
        }

        this.getSavedInfo = function () {
            return this.saved_info;
        }

    }
})();