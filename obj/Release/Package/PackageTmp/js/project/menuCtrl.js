menuApp.controller('menuCtrl', function ($scope, $routeParams, menuService) {
    $('#note').hide();
    $scope.copyRight = "Han Jia " + new Date().getFullYear();
    $scope.order = [];
    $scope.menuItems = [];
    $scope.categories = [];
    $scope.submitOrder = {};
    $scope.submitOrder.Items = [];
    var allItems = [];

    function getDateTime(dateValue) {
        var value = '\/Date(0)\/';
        if (dateValue) {
            value = '\/Date(' + Date.parse(dateValue) + ')\/';
        }
        return value;
    };

    //talk to server
    menuService.getCategories().success(function (data) {
        $scope.categories = data;
        if ($scope.categories.length > 0) {
            $scope.categories.push({ Id: 0, Name: 'All' });
        }
    });

    menuService.getMenuItems().success(function (data) {
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            item.Quantity = 1;
            allItems.push(item);
            $scope.menuItems.push(item);
        };
    });

    $scope.addToOrder = function (item) {
        if (item.IsSelected) {
            $scope.order.push(item);
        } else {
            var index = $scope.order.indexOf(item);
            $scope.order.splice(index, 1);
            item.Quantity = 1;
        }

        $scope.getOrderCount();
    };

    $scope.getOrderCount = function () {
        $scope.order.count = 0;
        angular.forEach($scope.order, function (item) {
            $scope.order.count = $scope.order.count + parseInt(item.Quantity);
        });

        counter($scope.order.count);
    };

    function checkNullOrEmpty(value) {
        return value == null || value == '';
    };

    $scope.toggleOrderDetails = function () {
        $scope.order.TotalCost = 0.0;
        angular.forEach($scope.order, function (item) {
            $scope.order.TotalCost = $scope.order.TotalCost + parseFloat(item.Price) * parseInt(item.Quantity);
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
            else if (item.CategoryId == categoryId) {
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

    function generateNewId() {
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return guid;
    };

    $scope.submit = function () {
        var orderId = generateNewId();
        $scope.submitOrder.Id = orderId;
        //$scope.submitOrder.Time = new Date();
        $scope.submitOrder.Status = "In Progress";


        angular.forEach($scope.order, function(item) {
            if (item.Quantity > 1) {
                for (var i = 0; i < item.Quantity; i++) {
                    $scope.submitOrder.Items.push({
                        OrderId: orderId,
                        MenuItemId: item.Id,
                        MenuItemName: item.Name,
                        CategoryId: item.CategoryId,
                        Price: item.Price
                    });
                }
            } else {
                $scope.submitOrder.Items.push({
                    OrderId: orderId,
                    MenuItemId: item.Id,
                    MenuItemName: item.Name,
                    CategoryId: item.CategoryId,
                    Price: item.Price
                });
            }
        });
        //submit
        menuService.submitOrder($scope.submitOrder).success(function (data) {
            //$scope.submitOrder = {};
            //$scope.submitOrder.Items.length = 0;
        }).error(function (data, status, headers, config) {
            
        });
    };
});