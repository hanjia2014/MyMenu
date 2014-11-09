menuApp.controller('menuCtrl', function ($scope, $routeParams, menuService) {
    $scope.copyRight = "Han Jia " + new Date().getFullYear();
    $scope.order = [];
    $scope.menuItems = [];
    $scope.categories = [];
    var allItems = [];

    menuService.getMenu().success(function (data) {
        var dataItems = data.menu.items;

        $scope.categories = data.menu.categories;

        for (var i = 0; i < dataItems.length; i++) {
            var item = dataItems[i];
            allItems.push(item);
            $scope.menuItems.push(item);
        };
    });

    $scope.addToOrder = function (item) {
        if (item.isSelected) {
            $scope.order.push(item);
        } else {
            var index = $scope.order.indexOf(item);
            $scope.order.splice(index, 1);
        }

        $scope.getOrderCount();
    };

    $scope.getOrderCount = function () {
        $scope.order.count = 0;
        angular.forEach($scope.order, function (item) {
            $scope.order.count = $scope.order.count + parseInt(item.quantity);
        });
    };

    function checkNullOrEmpty(value) {
        return value == null || value == '';
    };

    $scope.toggleOrderDetails = function () {
        $scope.order.totalCost = 0.0;
        angular.forEach($scope.order, function (item) {
            $scope.order.totalCost = $scope.order.totalCost + parseFloat(item.price) * parseInt(item.quantity);
        });
        $scope.showOrderDetails = !$scope.showOrderDetails;
    };

    $scope.getItemByCategory = function (categoryId) {
        var items = [];
        $scope.menuItems.length = 0;

        angular.forEach(allItems, function (item) {
            if (categoryId == 0) {
                items.push(item);
            }
            else if (item.categoryId == categoryId) {
                items.push(item);
            }
        });

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            $scope.menuItems.push(item);
        };
    };
});