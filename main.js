var app = angular.module('app', []);
app.controller('defaultController', function ($scope) {
    

    var calendar = new Calendar();
    $scope.calendar = calendar;
    $scope.calendar.init();

});

