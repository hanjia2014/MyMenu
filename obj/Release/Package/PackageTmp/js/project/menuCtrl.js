menuApp.controller('menuCtrl', function ($scope, $routeParams, menuService) {
    $('#note').hide();
    $scope.copyRight = "Han Jia " + new Date().getFullYear();
    $scope.order = [];
    $scope.menuItems = [];
    $scope.categories = [];
    $scope.submitOrder = {};
    $scope.submitOrder.items = [];
    var allItems = [];

    //talk to server
    menuService.getCategories().success(function (data) {
        var categories = data;
    });

    menuService.getMenuItems().success(function (data) {
        var items = data;
    });

    //

    menuService.getMenu().success(function (data) {
        var dataItems = data.menu.items;

        $scope.categories = data.menu.categories;

        for (var i = 0; i < dataItems.length; i++) {
            var item = dataItems[i];
            item.quantity = 1;
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
            item.quantity = 1;
        }

        $scope.getOrderCount();
    };

    $scope.getOrderCount = function () {
        $scope.order.count = 0;
        angular.forEach($scope.order, function (item) {
            $scope.order.count = $scope.order.count + parseInt(item.quantity);
        });

        counter($scope.order.count);
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


    function counter(count) {
        if (count > 0)
            $('.order').addClass('selected');
        else
            $('.order').removeClass('selected');
        $('.order').attr('data-counter', count);
    }

    $scope.submit = function() {
        angular.forEach($scope.order, function(item) {
            if (item.quantity > 1) {
                for (var i = 0; i < item.quantity; i++) {
                    $scope.submitOrder.items.push({
                        id: item.id,
                        name: item.name,
                        categoryId: item.categoryId,
                        price: item.price
                    });
                }
            } else {
                $scope.submitOrder.items.push({
                    id: item.id,
                    name: item.name,
                    categoryId: item.categoryId,
                    price: item.price
                });
            }
        });
        $scope.submitOrder.submitTime = new Date();
        //submit
    };
});