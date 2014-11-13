menuApp.factory("menuService", function ($http, $q) {
    return ({
        getMenu: function () {
            return $http.get('menu.json');
        },
        getCategories: function () {
            return $http.get('http://localhost:88/api/category');
        },
        getMenuItems: function () {
            return $http.get('http://localhost:88/api/menuitem');
        },
    });
});