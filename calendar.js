var app = angular.module('rdaCalendar', []);
app.controller('rdaCalendar.Controller', function ($scope) {

});

app.directive('calendar', function(){
    return {
        restrict: 'EA',
        scope: {
            onDaySelected: '&',
            onCalendarUpdated: '&',
        },
        templateUrl: 'calendar.html',
        
        link: function (scope) {
            scope.calendar = new Calendar();
            scope.calendar.onCalendarUpdated = scope.onCalendarUpdated;
            scope.calendar.init();

            scope.$on('changeDayFormat', function (event, data) {
                var d = scope.calendar.days.filter(d => d.day == data.day)[0];
                if (d)
                    d.dayFormat = data.dayFormat;
            })

            scope.$on('updateCalendar', function () {
                scope.calendar.updateCalendar();
            })
        }
    };
});

app.run(function($templateCache){
    $templateCache.put('calendar.html',
    `<div class="calendar">
        <div class="navigation">
    
            <div>
                <span class="month">{{ calendar.monthName }}</span>
                <span class="year">{{ calendar.year }}</span>
            </div>
            <div>
                <a href="" ng-click="calendar.prevMonth()">Previous</a>
                <a href="" ng-click="calendar.nextMonth()">Next</a>
            </div>
        </div>
        
        <div class="calendar__body">
            <div class="weeks">
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
                <div>SUN</div>
            </div>
            <div class="days">
                <div ng-repeat="x in [].constructor(calendar.startDay) track by $index">
    
                </div>
                <div ng-repeat="day in calendar.days" ng-class="{'current' : day.isCurrent, 'active' : day.isActive}" ng-click="calendar.dayClick(day, onDaySelected)">
                    <div ng-if="day.dayFormat" ng-bind-html="day.dayFormat"></div>
                    <div ng-if="!day.dayFormat">{{ day.day }}</div>
                </div>
            </div>
        </div>
    </div>`
    );
});