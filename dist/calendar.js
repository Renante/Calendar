var app = angular.module('rdaCalendar', ['ngSanitize']);
app.controller('rdaCalendar.Controller', function ($scope) {
    class Calendar {

        monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        onCalendarUpdated = null;
        
        constructor() {
            this.date = new Date();
        }
    
        init() {
            this.updateCalendar();
        }
    
        nextMonth() {
            this.date.setDate(1);
            this.date.setMonth(this.date.getMonth() + 1);
            this.updateCalendar();
        }
    
        prevMonth() {
            this.date.setDate(1);
            this.date.setMonth(this.date.getMonth() - 1);
            this.updateCalendar();
        }
    
        dayClick(day, callback) {
            this.resetActiveDay();
            this.days.filter(d => d.day == day.day)[0].isActive = true;
            
            if (callback) {
                callback({
                    day: day.day,
                    month: this.date.getMonth(),
                    year: this.date.getFullYear()
                });
            }
        }
        
        resetActiveDay() {
            this.days.forEach(function (day) {
                day.isActive = false;
            });
        };
    
        isCurrentMonth() {
            return new Date().getMonth() == this.date.getMonth();
        }
    
        updateCalendar(){
            this.year = this.date.getFullYear();
            this.month = this.date.getMonth();
            this.monthName = this.monthNames[this.month];
            
            let endOfMonthDate = new Date(this.year, this.month + 1, 0).getDate();
            let startOfMonth = new Date(this.year, this.month, 1);
    
            this.startDay = startOfMonth.getDay();
            this.totalDays = endOfMonthDate;
    
            this.days = [];
    
            let currentDay = this.isCurrentMonth() ? this.date.getDate() : 0;
            let activeDay = this.isCurrentMonth() ? this.date.getDate() : 1;
    
            for (let i = 1; i <= endOfMonthDate; i++) {
                this.days.push({
                    day: i,
                    isCurrent: i === currentDay,
                    isActive: activeDay === i,
                });
            }
    
            if (this.onCalendarUpdated) {
                this.onCalendarUpdated({
                    info: {
                        day: activeDay,
                        month: this.date.getMonth(),
                        year: this.date.getFullYear(),
                        days: this.days
                    }
                });
            }
        }
    }

    $scope.calendar = new Calendar();        
});

app.directive('calendar', function(){
    return {
        restrict: 'E',
        scope: {
            onDaySelected: '&',
            onCalendarUpdated: '&',
            prev: '@',
            next: '@'
        },
        templateUrl: 'calendar.html',
        controller: 'rdaCalendar.Controller',
        link: function (scope, attr) {
            
            scope.calendar.onCalendarUpdated = scope.onCalendarUpdated;
            scope.calendar.init();

            scope.$on('changeDayFormat', function (event, data) {
                var d = scope.calendar.days.filter(d => d.day == data.day)[0];
                if (d) {
                    d.dayFormat = data.dayFormat;
                    d.class = data.class;
                }
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
                <a href="" ng-click="calendar.prevMonth()" ng-bind-html="prev ? prev : 'Previous'"></a>
                <a href="" ng-click="calendar.nextMonth()" ng-bind-html="next ? next : 'Next'"</a>
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
                <div ng-repeat="day in calendar.days" class="{{ day.class }}" ng-class="{'current' : day.isCurrent, 'active' : day.isActive}" ng-click="calendar.dayClick(day, onDaySelected)">
                    <div ng-if="day.dayFormat" ng-bind-html="day.dayFormat"></div>
                    <div ng-if="!day.dayFormat">{{ day.day }}</div>
                </div>
            </div>
        </div>
    </div>`
    );
});