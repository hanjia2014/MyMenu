menuApp.controller('clientCtrl', function ($scope, menuService) {
    $scope.copyRight = "Han Jia " + new Date().getFullYear();
    $scope.order = [];

    $scope.mainItems = [];
    menuService.getMenu().success(function (data) {
        var dataItems = data.main.items;

        while (dataItems.length) {
            $scope.mainItems.push(dataItems.splice(0, 3));
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