(function () {
    'use strict';
    angular.module('Newsletter').component('myinfo', {
        templateUrl: "module5/my-info.html",
        controller: MyInfoController
    });

    MyInfoController.$inject = ["NewsletterService"];
    function MyInfoController(NewsletterService) {
        var scope = this;
        scope.savedInfo = null;
        scope.savedInfo = NewsletterService.getSavedInfo();
        var short_name = scope.savedInfo?.favouriteItem?.short_name || "";
        if (short_name) {
            scope.image_url = "images/L10.jpg";
        }
    }
})();