menuApp.controller('clientCtrl', function ($scope, menuService) {
    $scope.copyRight = "Han Jia " + new Date().getFullYear();
    //$scope.sendEmail = function () {
    //    $scope.isEmailSent = false;
    //    if (checkNullOrEmpty($scope.youName)
    //        || checkNullOrEmpty($scope.youPhone)
    //        || checkNullOrEmpty($scope.emailMessage)
    //        || checkNullOrEmpty($scope.emailAddress)) return;

    //    var emailInstance = {};
    //    emailInstance.name = $scope.youName;
    //    emailInstance.phone = $scope.youPhone;
    //    emailInstance.message = $scope.emailMessage;
    //    emailInstance.from = $scope.emailAddress;

    //    emailService.send(emailInstance).success(function () {
    //        $scope.isEmailSent = true;
    //    }).error(function () { });
    //};
    $scope.mainItems = [];
    menuService.getMenu().success(function (data) {
        var dataItems = data.main.items;

        while (dataItems.length) {
            $scope.mainItems.push(dataItems.splice(0, 3));
        }
    });

    function checkNullOrEmpty(value) {
        return value == null || value == '';
    };
});