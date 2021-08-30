var app = angular.module('app', ['rdaCalendar']);
app.controller('defaultController', function ($scope) {
   $scope.onCalendarUpdated = function(info) {
       angular.forEach(info.days, function(day){
           day.dayFormat = `<span>${ day.day }</span>`;
       });
   }
});

