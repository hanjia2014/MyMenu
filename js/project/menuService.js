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
        submitOrder: function (order) {
            //return $http({
            //    method: 'POST',
            //    url: 'http://localhost:53137/api/order',
            //    data: order,
            //    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //    transformRequest: function(obj) {
            //        var str = [];
                    
            //        for (var p in obj)
            //            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            //        return str.join("&");
            //    }
            //});
            return $http.post('http://localhost:53137/api/order', order);
        },
    });
});