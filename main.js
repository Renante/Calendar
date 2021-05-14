var app = angular.module('app', []);
app.controller('defaultController', function () {
    var vm = this;

    var calendar = new Calendar();
    vm.calendar = calendar;

});

