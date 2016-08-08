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
	    var elCalendar = document.getElementById('calendar');
	    var options = {
	        selectedDate: new Date(2016, 8, 5),
	        onSelectedDateChanged: function (eventArgs) {
	            console.log('Old Date:\t' + eventArgs.oldDate.toLocaleDateString());
	            console.log('New Date:\t' + eventArgs.newDate.toLocaleDateString());
	        }
	    };
	    new Calendar_1.Calendar(elCalendar, options);
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
	        function Calendar(input, options) {
	            this.selectedDate = new Date();
	            this.animate = false;
	            this.cssClass = '';
	            this.headerCssClass = '';
	            this.dayCssClass = '';
	            this.activeDayCssClass = '';
	            this._cssClass = 'ts-cal';
	            this._headerCssClass = 'ts-cal-header';
	            this._dayCssClass = 'ts-cal-day';
	            this._activeDayCssClass = 'ts-cal-day-active';
	            this.months = [
	                'January', 'February', 'March', 'April',
	                'May', 'June', 'July', 'August',
	                'September', 'October', 'November', 'December',
	            ];
	            this.setElements(input);
	            this.setFields(options);
	            this.render();
	            this.isHidden = false;
	            this.toggleCalendar();
	        }
	        Calendar.prototype.setElements = function (input) {
	            this.input = input;
	            this.input.classList.add('ts-cal-input');
	            this.input.readOnly = true;
	            this.parent = this.input.parentElement;
	            this.container = document.createElement('div');
	            this.container.className = 'ts-cal-container';
	            this.inputWrapper = document.createElement('div');
	            this.inputWrapper.className = 'ts-cal-input-wrapper';
	            this.inputBtn = document.createElement('span');
	            this.inputBtn.className = 'ts-cal-input-btn';
	            this.inputBtn.onclick = this.toggleCalendar.bind(this, false);
	            this.input.parentElement.removeChild(this.input);
	            this.inputWrapper.appendChild(this.input);
	            this.inputWrapper.appendChild(this.inputBtn);
	            this.container.appendChild(this.inputWrapper);
	            this.container.style.width = this.inputWrapper.offsetWidth + 'px';
	        };
	        Calendar.prototype.setFields = function (attrs) {
	            if (isDefined(attrs)) {
	                for (var attr in attrs) {
	                    if (this[attr] !== null) {
	                        this[attr] = attrs[attr];
	                    }
	                }
	            }
	            this.setDate(this.selectedDate);
	        };
	        Calendar.prototype.getSelectedDate = function () {
	            return this.selectedDate;
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
	            this.input.value = this.selectedDate.toLocaleDateString();
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
	        Calendar.prototype.dispatchOnSelectedDateChanged = function () {
	            if (this.compareDates(this.oldSelectedDate, this.selectedDate) === 0) {
	                return;
	            }
	            if (this.onSelectedDateChanged) {
	                var event = new Event('selectedDateChanged');
	                self.addEventListener('selectedDateChanged', this.onSelectedDateChanged({
	                    oldDate: this.oldSelectedDate, newDate: this.selectedDate
	                }), false);
	                self.dispatchEvent(event);
	            }
	        };
	        Calendar.prototype.setNewDay = function (date, ev) {
	            var self = ev.target;
	            this.selectedCell.classList.remove(this._activeDayCssClass);
	            if (this.activeDayCssClass.length > 0) {
	                this.selectedCell.classList.remove(this.activeDayCssClass);
	            }
	            if (!self.classList.contains(this._dayCssClass) && self.parentElement.classList.contains(this._dayCssClass)) {
	                self = self.parentElement;
	            }
	            this.selectedCell = self;
	            this.setDate(date);
	            if (this.activeDayCssClass.length > 0) {
	                self.classList.add(this.activeDayCssClass);
	            }
	            self.classList.add(this._activeDayCssClass);
	            this.dispatchOnSelectedDateChanged();
	        };
	        Calendar.prototype.setNewMonth = function (date, ev) {
	            this.setDate(date);
	            this.container.removeChild(this.calendarWrapper);
	            this.render();
	            this.dispatchOnSelectedDateChanged();
	        };
	        Calendar.prototype.setHeaderButtonProps = function (btn, charCode, newMonth) {
	            btn.className = this._headerCssClass + this.headerCssClass;
	            var span = document.createElement('span');
	            span.innerText = String.fromCharCode(charCode);
	            span.style.transform = 'scale(2)';
	            btn.appendChild(span);
	            btn.onclick = this.setNewMonth.bind(this, this.copyDate(newMonth));
	        };
	        Calendar.prototype.toggleCalendar = function (firstShow) {
	            var doFirstShow = this.animate && isDefined(firstShow) && firstShow;
	            if (doFirstShow) {
	                this.calendarWrapper.style.display = 'none';
	            }
	            if (this.isHidden) {
	                if (this.animate) {
	                    this.calendarWrapper.className = 'ts-cal-wrapper ts-cal-animate-show';
	                }
	                else {
	                    this.calendarWrapper.classList.remove('ts-cal-hide');
	                }
	                this.inputBtn.innerText = String.fromCharCode(9650);
	            }
	            else {
	                if (this.animate) {
	                    this.calendarWrapper.className = 'ts-cal-wrapper ts-cal-animate-hide';
	                }
	                else {
	                    this.calendarWrapper.classList.add('ts-cal-hide');
	                }
	                this.inputBtn.innerText = String.fromCharCode(9660);
	            }
	            if (doFirstShow) {
	                setTimeout(function () {
	                    this.style.display = '';
	                }.bind(this.calendarWrapper), 300);
	            }
	            this.isHidden = !this.isHidden;
	        };
	        Calendar.prototype.generateHeaderRow = function (curMonth, prevMonth, nextMonth) {
	            var tr = document.createElement('tr');
	            var btnLeft = document.createElement('th');
	            this.setHeaderButtonProps(btnLeft, 8592, prevMonth);
	            var btnRight = document.createElement('th');
	            this.setHeaderButtonProps(btnRight, 8594, nextMonth);
	            var title = document.createElement('th');
	            var titleText = document.createElement('span');
	            titleText.innerText = this.months[curMonth.getUTCMonth()] + ' ' + curMonth.getUTCFullYear();
	            title.appendChild(titleText);
	            title.colSpan = 5;
	            tr.appendChild(btnLeft);
	            tr.appendChild(title);
	            tr.appendChild(btnRight);
	            return tr;
	        };
	        Calendar.prototype.generateWeekRow = function (curDate) {
	            var tr = document.createElement('tr');
	            for (var i = 0; i < 7; ++i) {
	                var td = document.createElement('td');
	                var span = document.createElement('span');
	                td.className = this._dayCssClass + this.dayCssClass;
	                span.innerText = curDate.getUTCDate().toString();
	                if (this.compareDates(curDate, this.selectedDate) === 0) {
	                    td.classList.add(this._activeDayCssClass);
	                    if (this.activeDayCssClass.length > 0) {
	                        td.classList.add(this.activeDayCssClass);
	                    }
	                    this.selectedCell = td;
	                }
	                else if (curDate.getUTCMonth() < this.selectedMonth || curDate.getUTCMonth() > this.selectedMonth) {
	                    td.onclick = this.setNewMonth.bind(this, this.copyDate(curDate));
	                }
	                else {
	                    td.onclick = this.setNewDay.bind(this, this.copyDate(curDate));
	                }
	                td.appendChild(span);
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
	            var wrapper = document.createElement('div');
	            wrapper.className = 'ts-cal-wrapper';
	            var table = document.createElement('table');
	            table.className = this._cssClass + this.cssClass;
	            var thead = document.createElement('thead');
	            thead.appendChild(this.generateHeaderRow(curMonthFirstDay, prevMonthLastDay, nextMonthFirstDay));
	            var tbody = document.createElement('tbody');
	            while (this.compareDates(startDate, endDate) < 1) {
	                tbody.appendChild(this.generateWeekRow(startDate));
	            }
	            table.appendChild(thead);
	            table.appendChild(tbody);
	            wrapper.appendChild(table);
	            this.calendar = table;
	            this.calendarWrapper = wrapper;
	            this.container.appendChild(this.calendarWrapper);
	            this.parent.appendChild(this.container);
	            this.container.style.width = this.input.offsetWidth + 'px';
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