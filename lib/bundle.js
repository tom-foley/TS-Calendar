/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Calendar_1) {
	    "use strict";
	    __webpack_require__(2);
	    new Calendar_1.Calendar(document.getElementById('calendar'));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    function isDefined(obj) {
	        return typeof (obj) !== 'undefined' && obj !== null;
	    }
	    var Calendar = (function () {
	        function Calendar(container, options) {
	            this.calendarCssClass = 'ts-calendar';
	            this.calendayDayCssClass = 'ts-calendar-day';
	            this.calendarDayActiveCssClass = 'ts-calendar-day-active';
	            this.months = [
	                'January', 'February', 'March', 'April',
	                'May', 'June', 'July', 'August',
	                'September', 'October', 'November', 'December',
	            ];
	            this.container = container;
	            this.setFields(options);
	            this.render();
	        }
	        Calendar.prototype.setFields = function (attrs) {
	            if (isDefined(attrs)) {
	                var key = void 0;
	                key = 'selectedDate';
	                if (isDefined(attrs[key])) {
	                    this.setDate(attrs[key]);
	                }
	                else {
	                    this.setDate(new Date(2016, 6, 15));
	                }
	                key = 'calendarCssClass';
	                if (isDefined(attrs[key])) {
	                    this.calendarCssClass = attrs[key];
	                }
	                key = 'calendayDayCssClass';
	                if (isDefined(attrs[key])) {
	                    this.calendayDayCssClass = attrs[key];
	                }
	                key = 'calendarSelectedDayCssClass';
	                if (isDefined(attrs[key])) {
	                    this.calendarDayActiveCssClass = attrs[key];
	                }
	            }
	            else {
	                this.setDate(new Date());
	            }
	        };
	        Calendar.prototype.setDate = function (date) {
	            this.oldSelectedDate = this.selectedDate;
	            if (typeof (date) === 'object') {
	                this.selectedDate = date;
	            }
	            else if (typeof (date) === 'string') {
	                this.selectedDate = new Date(date);
	            }
	            this.selectedDay = this.selectedDate.getUTCDate();
	            this.selectedMonth = this.selectedDate.getUTCMonth();
	            this.selectedYear = this.selectedDate.getUTCFullYear();
	        };
	        Calendar.prototype.copyDate = function (source) {
	            return new Date(source.getUTCFullYear(), source.getUTCMonth(), source.getUTCDate());
	        };
	        Calendar.prototype.compareDates = function (date1, date2) {
	            if (date1.getUTCFullYear() < date2.getUTCFullYear()) {
	                return -1;
	            }
	            else if (date1.getUTCFullYear() === date2.getUTCFullYear()) {
	                if (date1.getUTCMonth() < date2.getUTCMonth()) {
	                    return -1;
	                }
	                else if (date1.getUTCMonth() === date2.getUTCMonth()) {
	                    if (date1.getUTCDate() < date2.getUTCDate()) {
	                        return -1;
	                    }
	                    else if (date1.getUTCDate() === date2.getUTCDate()) {
	                        return 0;
	                    }
	                    else {
	                        return 1;
	                    }
	                }
	                else {
	                    return 1;
	                }
	            }
	            else {
	                return 1;
	            }
	        };
	        Calendar.prototype.setNewDay = function (date, ev) {
	            var self = ev.target;
	            this.selectedCell.classList.remove(this.calendarDayActiveCssClass);
	            this.selectedCell = self;
	            this.setDate(date);
	            self.classList.add(this.calendarDayActiveCssClass);
	        };
	        Calendar.prototype.setNewMonth = function (date, ev) {
	            this.setDate(date);
	            this.container.removeChild(this.calendar);
	            this.render();
	        };
	        Calendar.prototype.generateHeaderRow = function (curMonth, prevMonth, nextMonth) {
	            var tr = document.createElement('tr');
	            var btnLeft = document.createElement('th');
	            btnLeft.colSpan = 1;
	            btnLeft.innerText = 'L';
	            btnLeft.onclick = this.setNewMonth.bind(this, this.copyDate(prevMonth));
	            var btnRight = document.createElement('th');
	            btnRight.colSpan = 1;
	            btnRight.innerText = 'R';
	            btnRight.onclick = this.setNewMonth.bind(this, this.copyDate(nextMonth));
	            var title = document.createElement('th');
	            title.colSpan = 5;
	            title.innerText = this.months[curMonth.getUTCMonth()] + ' ' + curMonth.getUTCFullYear();
	            tr.appendChild(btnLeft);
	            tr.appendChild(title);
	            tr.appendChild(btnRight);
	            return tr;
	        };
	        Calendar.prototype.generateWeekRow = function (curDate) {
	            var tr = document.createElement('tr');
	            for (var i = 0; i < 7; ++i) {
	                var td = document.createElement('td');
	                td.className = this.calendayDayCssClass;
	                td.innerText = curDate.getUTCDate().toString();
	                if (this.compareDates(curDate, this.selectedDate) === 0) {
	                    td.classList.add(this.calendarDayActiveCssClass);
	                    this.selectedCell = td;
	                }
	                else if (curDate.getUTCMonth() < this.selectedMonth || curDate.getUTCMonth() > this.selectedMonth) {
	                    td.onclick = this.setNewMonth.bind(this, this.copyDate(curDate));
	                }
	                else {
	                    td.onclick = this.setNewDay.bind(this, this.copyDate(curDate));
	                }
	                tr.appendChild(td);
	                curDate.setUTCDate(curDate.getUTCDate() + 1);
	            }
	            return tr;
	        };
	        Calendar.prototype.render = function () {
	            var prevMonthLastDay = new Date(this.selectedYear, this.selectedMonth, 0);
	            var curMonthFirstDay = new Date(this.selectedYear, this.selectedMonth, 1);
	            var curMonthLastDay = new Date(curMonthFirstDay.getUTCFullYear(), curMonthFirstDay.getUTCMonth() + 1, 0);
	            var nextMonthFirstDay = new Date(curMonthFirstDay.getUTCFullYear(), curMonthFirstDay.getUTCMonth() + 1, 1);
	            var startDate, endDate;
	            if (curMonthFirstDay.getUTCDay() === 0) {
	                startDate = curMonthFirstDay;
	            }
	            else {
	                startDate = new Date(prevMonthLastDay.getUTCFullYear(), prevMonthLastDay.getUTCMonth(), prevMonthLastDay.getUTCDate() - prevMonthLastDay.getUTCDay());
	            }
	            if (curMonthLastDay.getUTCDay() === 0) {
	                endDate = curMonthLastDay;
	            }
	            else {
	                endDate = new Date(nextMonthFirstDay.getUTCFullYear(), nextMonthFirstDay.getUTCMonth(), 7 - nextMonthFirstDay.getUTCDay());
	            }
	            var table = document.createElement('table');
	            table.className = this.calendarCssClass;
	            var thead = document.createElement('thead');
	            thead.appendChild(this.generateHeaderRow(curMonthFirstDay, prevMonthLastDay, nextMonthFirstDay));
	            var tbody = document.createElement('tbody');
	            while (this.compareDates(startDate, endDate) < 1) {
	                tbody.appendChild(this.generateWeekRow(startDate));
	            }
	            table.appendChild(thead);
	            table.appendChild(tbody);
	            this.calendar = table;
	            this.container.appendChild(table);
	        };
	        return Calendar;
	    }());
	    exports.Calendar = Calendar;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    return __webpack_require__(3);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);