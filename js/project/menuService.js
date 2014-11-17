menuApp.factory("menuService", function ($http, $q, hotmenuConstants) {
    return ({
        getMenu: function () {
            return $http.get('menu.json');
        },
        getCategories: function () {
            return $http.get(hotmenuConstants.ServerApiBaseUrl + 'category');
        },
        getMenuItems: function () {
            return $http.get(hotmenuConstants.ServerApiBaseUrl + 'menuitem');
        },
        submitOrder: function (order) {
            return $http.post(hotmenuConstants.ServerApiBaseUrl + 'order', order);
        },
    });
});