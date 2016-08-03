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
	    __webpack_require__(3);
	    new Calendar_1.Calendar(document.getElementById('calendar'));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, HTMLElementBuilder_1) {
	    "use strict";
	    var style = HTMLElementBuilder_1.HTMLStyleAttr;
	    var event = HTMLElementBuilder_1.HTMLEventAttr;
	    var Month = (function () {
	        function Month(index, shortName, longName) {
	            this.index = index;
	            this.shortName = shortName;
	            this.longName = longName;
	        }
	        return Month;
	    }());
	    var Calendar = (function () {
	        function Calendar(container, options) {
	            this.months = [
	                new Month(0, 'Jan', 'January'), new Month(1, 'Feb', 'February'), new Month(2, 'Mar', 'March'),
	                new Month(3, 'Apr', 'April'), new Month(4, 'May', 'May'), new Month(5, 'Jun', 'June'),
	                new Month(6, 'Jul', 'July'), new Month(7, 'Aug', 'August'), new Month(8, 'Sep', 'September'),
	                new Month(9, 'Oct', 'October'), new Month(10, 'Nov', 'November'), new Month(11, 'Dec', 'December'),
	            ];
	            this.container = container;
	            this.builder = new HTMLElementBuilder_1.HTMLElementBuilder();
	            if (HTMLElementBuilder_1.isDefined(options)) {
	                var attr = void 0;
	                attr = 'selectedDate';
	                if (HTMLElementBuilder_1.isDefined(options[attr])) {
	                    this.setDate(options[attr]);
	                }
	                else {
	                    this.setDate(new Date(2016, 6, 15));
	                }
	            }
	            else {
	                this.setDate(new Date(2016, 6, 15));
	            }
	            this.render();
	        }
	        Calendar.prototype.setDate = function (date) {
	            if (typeof (date) === 'object') {
	                this.selectedDate = date;
	            }
	            else if (typeof (date) === 'string') {
	                this.selectedDate = new Date(date);
	            }
	            this.selectedDay = this.selectedDate.getUTCDate();
	            this.selectedMonth = this.selectedDate.getUTCMonth();
	            this.selectedYear = this.selectedDate.getUTCFullYear();
	            console.log('Day:\t' + this.selectedDay + '\tMonth:\t' + this.selectedMonth + '\tYear:\t' + this.selectedYear);
	        };
	        Calendar.prototype.generateWeekRow = function (curDate) {
	            var tr = document.createElement('tr');
	            var day = 0;
	            while (day <= 6) {
	                var td = document.createElement('td');
	                td.innerText = curDate.getUTCDate().toString();
	                tr.appendChild(td);
	                curDate.setUTCDate(curDate.getUTCDate() + 1);
	                day++;
	            }
	            return tr;
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
	        Calendar.prototype.render = function () {
	            var startDate, endDate;
	            var prevMonthLastDay = new Date(this.selectedYear, this.selectedMonth, 0);
	            var curMonthFirstDay = new Date(this.selectedYear, this.selectedMonth, 1);
	            var curMonthLastDay = new Date(curMonthFirstDay.getUTCFullYear(), curMonthFirstDay.getUTCMonth(), 0);
	            var nextMonthFirstDay = new Date(curMonthFirstDay.getUTCFullYear(), curMonthFirstDay.getUTCMonth() + 1, 1);
	            if (curMonthFirstDay.getUTCDay() === 0) {
	                console.log('Start Date = 0');
	                startDate = curMonthFirstDay;
	            }
	            else {
	                console.log('Start Date > 0');
	                startDate = new Date(prevMonthLastDay.getUTCFullYear(), prevMonthLastDay.getUTCMonth(), prevMonthLastDay.getUTCDate() - prevMonthLastDay.getUTCDay());
	            }
	            if (curMonthLastDay.getUTCDay() === 6) {
	                console.log('End Date = 6');
	                endDate = curMonthLastDay;
	            }
	            else {
	                console.log('End Date < 6');
	                endDate = new Date(nextMonthFirstDay.getUTCFullYear(), nextMonthFirstDay.getUTCMonth(), 7 - nextMonthFirstDay.getUTCDay());
	            }
	            console.log(startDate);
	            console.log(endDate);
	            var table = this.builder.createEl({
	                type: 'table',
	                styles: [
	                    new style('width', '100%')
	                ]
	            });
	            while (this.compareDates(startDate, endDate) < 1) {
	                table.appendChild(this.generateWeekRow(startDate));
	            }
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
	    function isDefined(obj) {
	        return typeof (obj) !== 'undefined' && obj !== null;
	    }
	    exports.isDefined = isDefined;
	    function addHTMLEvent(el, attr) {
	        if (el.addEventListener) {
	            el.addEventListener(attr.eventName, attr.eventFn, false);
	        }
	        else if (el.attachEvent) {
	            el.attachEvent(attr.eventName, attr.eventFn);
	        }
	    }
	    var HTMLStyleAttr = (function () {
	        function HTMLStyleAttr(name, value) {
	            this.styleName = name;
	            this.styleValue = value;
	        }
	        return HTMLStyleAttr;
	    }());
	    exports.HTMLStyleAttr = HTMLStyleAttr;
	    var HTMLEventAttr = (function () {
	        function HTMLEventAttr(name, fn) {
	            this.eventName = name;
	            this.eventFn = fn;
	        }
	        return HTMLEventAttr;
	    }());
	    exports.HTMLEventAttr = HTMLEventAttr;
	    var HTMLElementBuilder = (function () {
	        function HTMLElementBuilder() {
	        }
	        HTMLElementBuilder.prototype.createEl = function (props) {
	            var currAttr;
	            var el = null;
	            currAttr = 'type';
	            if (isDefined(props[currAttr]) && props[currAttr].length > 0) {
	                el = document.createElement(props[currAttr]);
	            }
	            else {
	                return el;
	            }
	            currAttr = 'styles';
	            if (isDefined(props[currAttr]) && props[currAttr].length > 0) {
	                var styleName = void 0;
	                var styleValue = void 0;
	                var styles = props[currAttr];
	                for (var i = 0; i < styles.length; ++i) {
	                    styleName = styles[i].styleName;
	                    styleValue = styles[i].styleValue;
	                    if (isDefined(el.style[styleName])) {
	                        el.style[styleName] = styleValue;
	                    }
	                }
	            }
	            currAttr = 'events';
	            if (isDefined(props[currAttr]) && props[currAttr].length > 0) {
	                var events = props[currAttr];
	                for (var i = 0; i < events.length; ++i) {
	                    addHTMLEvent(el, events[i]);
	                }
	            }
	            currAttr = 'children';
	            if (isDefined(props[currAttr]) && props[currAttr].length > 0) {
	                var child = void 0;
	                var children = props[currAttr];
	                for (var i = 0; i < children.length; ++i) {
	                    child = this.createEl(children[i]);
	                    if (isDefined(child)) {
	                        el.appendChild(child);
	                    }
	                }
	            }
	            return el;
	        };
	        return HTMLElementBuilder;
	    }());
	    exports.HTMLElementBuilder = HTMLElementBuilder;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    return __webpack_require__(4);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);