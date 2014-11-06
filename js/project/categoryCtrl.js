menuApp.controller('categoryCtrl', function ($scope, $routeParams, menuService) {

    $scope.order = [];

    $scope.menuItems = [];
    $scope.categories = [];
    var dataItems = [];

    var categoryId = $routeParams.categoryId;
    if (categoryId) {
        $scope.categoryId = categoryId;
    }

    menuService.getMenu().success(function (data) {
        dataItems = data.menu.items;
        $scope.categories = data.menu.categories;

        while (dataItems.length) {
            $scope.menuItems.push(dataItems.splice(0, 3));
        }
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
});