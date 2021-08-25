/// <reference path="date.ts"/>
/// <reference path="day.ts"/>

class Calendar {

    monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    _date: Date = new Date();
    days: Day[];

    year: number;
    month: number;
    monthName: string;

    startDay: number;
    totalDays: number;

    onCalendarUpdated = null;
    
    initialLoad: boolean = true;


    constructor() {
        this._date = new Date();
    }

    init(): void {
        this.updateCalendar();
    }

    nextMonth(): void {
        this._date.setMonth(this._date.getMonth() + 1);
        this.updateCalendar();
    }

    prevMonth(): void {
        this._date.setMonth(this._date.getMonth() - 1);
        this.updateCalendar();
    }

    dayClick(day: _Date, callback: Function): void {
        this.resetActiveDay();
        this.days.filter(d => d.day == day.day)[0].isActive = true;
        
        if (callback) {
            
            callback({
                day: day.day,
                month: this._date.getMonth(),
                year: this._date.getFullYear()
            });
        }
    }
    
    private resetActiveDay(): void {
        this.days.forEach(function (day) {
            day.isActive = false;
        });
    };

    private isCurrentMonth(): boolean {
        return new Date().getMonth() == this._date.getMonth();
    }

    updateCalendar(): void {

        this.year = this._date.getFullYear();
        this.month = this._date.getMonth();
        this.monthName = this.monthNames[this.month];
        
        let endOfMonthDate = new Date(this.year, this.month + 1, 0).getDate();
        let startOfMonth = new Date(this.year, this.month, 1);

        this.startDay = startOfMonth.getDay();
        this.totalDays = endOfMonthDate;

        this.days = new Array<Day>();

        let currentDay = this.isCurrentMonth() ? this._date.getDate() : 0;
        let activeDay = this.isCurrentMonth() ? this._date.getDate() : 1;

        for (let i = 1; i <= endOfMonthDate; i++) {
            let d: Day = {
                day: i,
                isCurrent: i === currentDay,
                isActive: activeDay === i,
            };
            
            this.days.push(d);
        }

        if (this.onCalendarUpdated) {
            this.onCalendarUpdated({
                info: {
                    day: activeDay,
                    month: this._date.getMonth(),
                    year: this._date.getFullYear(),
                    days: this.days
                }
            });
        }
        
    }
}

