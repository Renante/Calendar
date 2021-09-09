(()=>{var a=angular.module("rdaCalendar",["ngSanitize"]);a.controller("rdaCalendar.Controller",["$scope",function(a){a.calendar=new class{monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];onCalendarUpdated=null;constructor(){this.date=new Date}init(){this.updateCalendar()}nextMonth(){this.date.setDate(1),this.date.setMonth(this.date.getMonth()+1),this.updateCalendar()}prevMonth(){this.date.setDate(1),this.date.setMonth(this.date.getMonth()-1),this.updateCalendar()}dayClick(a,t){this.resetActiveDay(),this.days.filter((t=>t.day==a.day))[0].isActive=!0,t&&t({day:a.day,month:this.date.getMonth(),year:this.date.getFullYear()})}resetActiveDay(){this.days.forEach((function(a){a.isActive=!1}))}isCurrentMonth(){return(new Date).getMonth()==this.date.getMonth()}updateCalendar(){this.year=this.date.getFullYear(),this.month=this.date.getMonth(),this.monthName=this.monthNames[this.month];let a=new Date(this.year,this.month+1,0).getDate(),t=new Date(this.year,this.month,1);this.startDay=t.getDay(),this.totalDays=a,this.days=[];let e=this.isCurrentMonth()?this.date.getDate():0,n=this.isCurrentMonth()?this.date.getDate():1;for(let t=1;t<=a;t++)this.days.push({day:t,isCurrent:t===e,isActive:n===t});this.onCalendarUpdated&&this.onCalendarUpdated({info:{day:n,month:this.date.getMonth(),year:this.date.getFullYear(),days:this.days}})}}}]),a.directive("calendar",(function(){return{restrict:"E",scope:{onDaySelected:"&",onCalendarUpdated:"&",prev:"@",next:"@"},templateUrl:"calendar.html",controller:"rdaCalendar.Controller",link:function(a,t){a.calendar.onCalendarUpdated=a.onCalendarUpdated,a.calendar.init(),a.$on("changeDayFormat",(function(t,e){var n=a.calendar.days.filter((a=>a.day==e.day))[0];n&&(n.dayFormat=e.dayFormat,n.class=e.class)})),a.$on("updateCalendar",(function(){a.calendar.updateCalendar()}))}}})),a.run(["$templateCache",function(a){a.put("calendar.html",'<div class="calendar">\n        <div class="navigation">\n    \n            <div>\n                <span class="month">{{ calendar.monthName }}</span>\n                <span class="year">{{ calendar.year }}</span>\n            </div>\n            <div>\n                <a href="" ng-click="calendar.prevMonth()" ng-bind-html="prev ? prev : \'Previous\'"></a>\n                <a href="" ng-click="calendar.nextMonth()" ng-bind-html="next ? next : \'Next\'"></a>\n            </div>\n        </div>\n        \n        <div class="calendar__body">\n            <div class="weeks">\n                <div>SUN</div>\n                <div>MON</div>\n                <div>TUE</div>\n                <div>WED</div>\n                <div>THU</div>\n                <div>FRI</div>\n                <div>SAT</div>\n            </div>\n            <div class="days">\n                <div ng-repeat="x in [].constructor(calendar.startDay) track by $index">\n    \n                </div>\n                <div ng-repeat="day in calendar.days" class="day {{ day.class }}" ng-class="{\'current\' : day.isCurrent, \'active\' : day.isActive}" ng-click="calendar.dayClick(day, onDaySelected)">\n                    <div ng-if="day.dayFormat" ng-bind-html="day.dayFormat"></div>\n                    <div ng-if="!day.dayFormat">{{ day.day }}</div>\n                </div>\n            </div>\n        </div>\n    </div>')}])})();