menuApp.factory("menuService", function ($http, $q) {
    return ({
        getMenu: function () {
            return $http.get('menu.json');
        },
        getCategories: function () {
            return $http.get('http://menuserver.azurewebsites.net/api/category');
        },
        getMenuItems: function () {
            return $http.get('http://menuserver.azurewebsites.net/api/menuitem');
        },
        submitOrder: function (order) {
            return $http.post('http://menuserver.azurewebsites.net/api/order', order);
        },
    });
});