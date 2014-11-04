menuApp.controller('clientCtrl', function ($scope, menuService) {
    $scope.copyRight = "Han Jia " + new Date().getFullYear();
    $scope.order = [];
    $scope.order.totalCost = 0.0;

    $scope.mainItems = [];
    menuService.getMenu().success(function (data) {
        var dataItems = data.main.items;

        while (dataItems.length) {
            $scope.mainItems.push(dataItems.splice(0, 3));
        }

        angular.forEach($scope.mainItems, function(item) {
            item.index = $index;
        });
    });

    $scope.addToOrder = function(item) {
        if (item.isSelected) {
            $scope.order.push(item);
            $scope.order.totalCost = $scope.order.totalCost + parseFloat(item.price);
        } else {
            $scope.order.splice(item.index, 1);
            $scope.order.totalCost = $scope.order.totalCost - parseFloat(item.price);
        }
    };

    function checkNullOrEmpty(value) {
        return value == null || value == '';
    };

    $scope.toggleOrderDetails = function () {
        $scope.showOrderDetails = !$scope.showOrderDetails;
    };
});