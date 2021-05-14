class Calendar {

    monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

    constructor(){
        this._today = new Date();
        this._date = this._today;
        this._updateCalendar();
    }

    nextMonth() {
        this._date.setMonth(this._date.getMonth() + 1);
        this._updateCalendar();
    }

    prevMonth(){
        this._date.setMonth(this._date.getMonth() - 1);
        this._updateCalendar();
    }
    
    _updateCalendar() {

        this.year = this._date.getFullYear();
        this.month = this._date.getMonth();
        this.monthName = this.monthNames[this.month];
        this.date = this._date.getDate();

        let endOfMonthDate = new Date(this.year, this.month + 1, 0).getDate();
        let startOfMonth = new Date(this.year, this.month, 1);

        this.startDay = startOfMonth.getDay();
        this.totalDays = endOfMonthDate;

        this.days = [];
        for (let i = 1; i <= endOfMonthDate; i++) {
            this.days.push({
                day: i,
                active: i === this.date,
            });
        }
    }
}