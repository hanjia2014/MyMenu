menuApp.factory("menuService", function ($http, $q) {
    return ({
        getMenu: function () {
            return $http.get('menu.json');
        },
    });
});