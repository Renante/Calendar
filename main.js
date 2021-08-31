var app = angular.module('app', ['rdaCalendar']);
app.controller('defaultController', function ($scope, $timeout) {

    $scope.onCalendarUpdated = function (info) {
        angular.forEach(info.days, function (day) {
            if(day.day == 20) {
                day.dayFormat = '<span class="event">Some event here</span>';
                day.class = 'pink-bg';
            }
            else
                day.dayFormat = `<span>${day.day}</span>`;
        });
    }

    // $timeout(function () {
    //     $scope.$broadcast('changeDayFormat', { day: 22, dayFormat: '<span class="event">Some event here</span>' });
    // });

    // $timeout(function(){
    //     $scope.$broadcast('updateCalendar');
    // }, 1000);

    $scope.onDaySelected = function (day) {
        alert(day);
    }
});

