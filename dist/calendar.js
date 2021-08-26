/// <reference path="date.ts"/>
/// <reference path="day.ts"/>
var Calendar = /** @class */ (function () {
    function Calendar() {
        this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        this.date = new Date();
        this.onCalendarUpdated = null;
        this.initialLoad = true;
        this.date = new Date();
    }
    Calendar.prototype.init = function () {
        this.updateCalendar();
    };
    Calendar.prototype.nextMonth = function () {
        this.date.setMonth(this.date.getMonth() + 1);
        this.updateCalendar();
    };
    Calendar.prototype.prevMonth = function () {
        this.date.setMonth(this.date.getMonth() - 1);
        this.updateCalendar();
    };
    Calendar.prototype.dayClick = function (day, callback) {
        this.resetActiveDay();
        this.days.filter(function (d) { return d.day == day.day; })[0].isActive = true;
        if (callback) {
            callback({
                day: day.day,
                month: this.date.getMonth(),
                year: this.date.getFullYear()
            });
        }
    };
    Calendar.prototype.resetActiveDay = function () {
        this.days.forEach(function (day) {
            day.isActive = false;
        });
    };
    ;
    Calendar.prototype.isCurrentMonth = function () {
        return new Date().getMonth() == this.date.getMonth();
    };
    Calendar.prototype.updateCalendar = function () {
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.monthName = this.monthNames[this.month];
        var endOfMonthDate = new Date(this.year, this.month + 1, 0).getDate();
        var startOfMonth = new Date(this.year, this.month, 1);
        this.startDay = startOfMonth.getDay();
        this.totalDays = endOfMonthDate;
        this.days = new Array();
        var currentDay = this.isCurrentMonth() ? this.date.getDate() : 0;
        var activeDay = this.isCurrentMonth() ? this.date.getDate() : 1;
        for (var i = 1; i <= endOfMonthDate; i++) {
            var d = {
                day: i,
                isCurrent: i === currentDay,
                isActive: activeDay === i
            };
            this.days.push(d);
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
    };
    return Calendar;
}());
