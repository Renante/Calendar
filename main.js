var app = angular.module('app', ['rdaCalendar']);
app.controller('defaultController', function ($scope, $timeout) {

    $scope.onCalendarUpdated = function (info) {
        angular.forEach(info.days, function (day) {
            day.dayFormat = `<span>${day.day}</span>`;
        });
    }

    $timeout(function () {
        $scope.$broadcast('changeDayFormat', { day: 1, dayFormat: 'first day of the month' });
    });

    $timeout(function(){
        $scope.$broadcast('updateCalendar');
    }, 1000);

    $scope.onDaySelected = function (day) {
        console.log(`Day selected ${day}`);
    }
});

