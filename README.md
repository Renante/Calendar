# AngularJS Calendar
A simple AngularJS Calendar that will allow you modify the individual day format.

## Usage

Install the plugin via npm.

    npm i @renante/rdacalendar

Load necessary files.

    <script src="/node_modules/angular/angular.min.js"></script>
    <script src="/node_modules/angular-sanitize/angular-sanitize.min.js"></script>
    <script src="/node_modules/@renante/rdacalendar/dist/calendar.js"></script>
    
Add calendar module as dependency.

    var app = angular.module('app', ['rdaCalendar']);

## Methods


**onCalendarUpdated**

This will fire everytime the calendar is updated (eg. when navigating months).
It will allow you to modify the individual days before it render on the calendar by setting the `dayFormat` or `class`.


    <calendar on-calendar-updated="onCalendarUpdated(info)"></calendar> 

Example:

    $scope.onCalendarUpdated = function(info) {
       angular.forEach(info.days, function(day){
           day.dayFormat = `<span class='day'>${ day.day }</span>`;
           day.class = 'pink-bg';
       });
    }


**onDaySelected**

When a day is selected, it will return the day number.

    <calendar on-day-selected="onDaySelected(day)"></calendar>
    
Example

    $scope.onDaySelected = function (day) {
        console.log(`The day selected is ${day}`);
    }
    

## Events


**changeDayFormat**

Manually change day format.
It will fire some methods like `onCalendarUpdated`.

    $scope.$broadcast('changeDayFormat', { day: 1, dayFormat: 'first day of the month' });


**updateCalendar**

Call `updateCalendar` event manually.

    $scope.$broadcast('updateCalendar');