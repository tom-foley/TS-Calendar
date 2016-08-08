function isDefined(obj) {
    return typeof (obj) !== 'undefined' && obj !== null;
}

export class Calendar {
    //  Elements
    private input: HTMLInputElement;
    private parent: HTMLElement;
    private container: HTMLDivElement;
    private calendar: HTMLTableElement;
    private calendarWrapper: HTMLDivElement;
    private inputBtn: HTMLSpanElement;
    private inputWrapper: HTMLDivElement;
    private selectedCell: HTMLTableCellElement;

    //  Fields
    private selectedDate: Date = new Date();
    private oldSelectedDate: Date;

    private selectedDay: number;
    private selectedMonth: number;
    private selectedYear: number;

    public animate: boolean = false;
    private isHidden: boolean;

    public cssClass: string = '';
    public headerCssClass: string = '';
    public dayCssClass: string = '';
    public activeDayCssClass: string = '';
    private _cssClass: string = 'ts-cal';
    private _headerCssClass: string = 'ts-cal-header';
    private _dayCssClass: string = 'ts-cal-day';
    private _activeDayCssClass: string = 'ts-cal-day-active';


    //  Custom Events  
    public onSelectedDateChanged: any;

    private months: Array<string> = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];


    constructor(input: HTMLInputElement, options?: Object) {
        this.setElements(input);
        this.setFields(options);
        this.render();
        this.isHidden = false;
        this.toggleCalendar();
    }


    private setElements(input: HTMLInputElement) {
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
    }


    private setFields(attrs: Object) {
        if (isDefined(attrs)) {
            for (var attr in attrs) {
                if (this[attr] !== null) {
                    this[attr] = attrs[attr];
                }
            }
        }

        this.setDate(this.selectedDate);
    }


    private getSelectedDate() {
        return this.selectedDate;
    }


    private setDate(date: Date | string): void {
        this.oldSelectedDate = this.selectedDate;

        if (typeof (date) === 'object') {
            this.selectedDate = <Date>date;
        } else if (typeof (date) === 'string') {
            this.selectedDate = new Date(<string>date);
        }

        this.selectedDay = this.selectedDate.getUTCDate();
        this.selectedMonth = this.selectedDate.getUTCMonth();
        this.selectedYear = this.selectedDate.getUTCFullYear();
        this.input.value = this.selectedDate.toLocaleDateString();
    }


    private copyDate(source: Date): Date {
        return new Date(source.getUTCFullYear(), source.getUTCMonth(), source.getUTCDate());
    }


    private compareDates(date1: Date, date2: Date): number {
        if (date1.getUTCFullYear() < date2.getUTCFullYear()) {
            return -1;
        } else if (date1.getUTCFullYear() === date2.getUTCFullYear()) {
            if (date1.getUTCMonth() < date2.getUTCMonth()) {
                return -1;
            } else if (date1.getUTCMonth() === date2.getUTCMonth()) {
                if (date1.getUTCDate() < date2.getUTCDate()) {
                    return -1;
                } else if (date1.getUTCDate() === date2.getUTCDate()) {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                return 1;
            }
        } else {
            return 1;
        }
    }


    private dispatchOnSelectedDateChanged(): void {
        if (this.compareDates(this.oldSelectedDate, this.selectedDate) === 0) {
            return;
        }

        if (this.onSelectedDateChanged) {
            var event = new Event('selectedDateChanged');
            self.addEventListener('selectedDateChanged',
                this.onSelectedDateChanged({
                    oldDate: this.oldSelectedDate, newDate: this.selectedDate
                }), false
            );
            self.dispatchEvent(event);
        }
    }


    private setNewDay(date, ev): void {
        let self = ev.target;
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
    }


    private setNewMonth(date, ev): void {
        this.setDate(date);
        this.container.removeChild(this.calendarWrapper);
        this.render();
        this.dispatchOnSelectedDateChanged();
    }


    private setHeaderButtonProps(btn: HTMLTableHeaderCellElement, charCode: number, newMonth: Date): void {
        btn.className = this._headerCssClass + this.headerCssClass;

        let span: HTMLSpanElement = document.createElement('span');
        span.innerText = String.fromCharCode(charCode);
        span.style.transform = 'scale(2)';
        btn.appendChild(span);
        btn.onclick = this.setNewMonth.bind(this, this.copyDate(newMonth));
    }


    private toggleCalendar(firstShow?: boolean): void {
        const doFirstShow: boolean = this.animate && isDefined(firstShow) && firstShow;
        if (doFirstShow) {
            this.calendarWrapper.style.display = 'none';
        }

        if (this.isHidden) {
            if (this.animate) {
                this.calendarWrapper.className = 'ts-cal-wrapper ts-cal-animate-show';
            } else {
                this.calendarWrapper.classList.remove('ts-cal-hide');
            }

            this.inputBtn.innerText = String.fromCharCode(9650);
        } else {
            if (this.animate) {
                this.calendarWrapper.className = 'ts-cal-wrapper ts-cal-animate-hide';
            } else {
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
    }


    private generateHeaderRow(curMonth: Date, prevMonth: Date, nextMonth: Date): HTMLTableRowElement {
        let tr: HTMLTableRowElement = document.createElement('tr');

        let btnLeft: HTMLTableHeaderCellElement = document.createElement('th');
        this.setHeaderButtonProps(btnLeft, 8592, prevMonth);

        let btnRight: HTMLTableHeaderCellElement = document.createElement('th');
        this.setHeaderButtonProps(btnRight, 8594, nextMonth);

        let title: HTMLTableHeaderCellElement = document.createElement('th');
        let titleText: HTMLSpanElement = document.createElement('span');
        titleText.innerText = this.months[curMonth.getUTCMonth()] + ' ' + curMonth.getUTCFullYear();

        title.appendChild(titleText);
        title.colSpan = 5;

        tr.appendChild(btnLeft);
        tr.appendChild(title);
        tr.appendChild(btnRight);
        return tr;
    }


    private generateWeekRow(curDate: Date): HTMLTableRowElement {
        let tr: HTMLTableRowElement = document.createElement('tr');

        for (let i: number = 0; i < 7; ++i) {
            let td: HTMLTableCellElement = document.createElement('td');
            let span: HTMLSpanElement = document.createElement('span');
            td.className = this._dayCssClass + this.dayCssClass;
            span.innerText = curDate.getUTCDate().toString();

            if (this.compareDates(curDate, this.selectedDate) === 0) {
                td.classList.add(this._activeDayCssClass);
                if (this.activeDayCssClass.length > 0) {
                    td.classList.add(this.activeDayCssClass);
                }
                this.selectedCell = td;
            } else if (curDate.getUTCMonth() < this.selectedMonth || curDate.getUTCMonth() > this.selectedMonth) {
                td.onclick = this.setNewMonth.bind(this, this.copyDate(curDate));
            } else {
                td.onclick = this.setNewDay.bind(this, this.copyDate(curDate));
            }

            td.appendChild(span);
            tr.appendChild(td);
            curDate.setUTCDate(curDate.getUTCDate() + 1);
        }

        return tr;
    }


    private render() {
        const prevMonthLastDay: Date = new Date(this.selectedYear, this.selectedMonth, 0);
        const curMonthFirstDay: Date = new Date(this.selectedYear, this.selectedMonth, 1);
        const curMonthLastDay: Date = new Date(curMonthFirstDay.getUTCFullYear(), curMonthFirstDay.getUTCMonth() + 1, 0);
        const nextMonthFirstDay: Date = new Date(curMonthFirstDay.getUTCFullYear(), curMonthFirstDay.getUTCMonth() + 1, 1);

        let startDate: Date, endDate: Date;
        if (curMonthFirstDay.getUTCDay() === 0) {
            startDate = curMonthFirstDay;
        } else {
            startDate = new Date(
                prevMonthLastDay.getUTCFullYear(),
                prevMonthLastDay.getUTCMonth(),
                prevMonthLastDay.getUTCDate() - prevMonthLastDay.getUTCDay()
            );
        }

        if (curMonthLastDay.getUTCDay() === 0) {
            endDate = curMonthLastDay;
        } else {
            endDate = new Date(
                nextMonthFirstDay.getUTCFullYear(),
                nextMonthFirstDay.getUTCMonth(),
                7 - nextMonthFirstDay.getUTCDay()
            );
        }

        let wrapper: HTMLDivElement = document.createElement('div');
        wrapper.className = 'ts-cal-wrapper';

        let table: HTMLTableElement = document.createElement('table');
        table.className = this._cssClass + this.cssClass;

        let thead: HTMLTableSectionElement = document.createElement('thead');
        thead.appendChild(
            this.generateHeaderRow(curMonthFirstDay, prevMonthLastDay, nextMonthFirstDay)
        );

        let tbody: HTMLTableSectionElement = document.createElement('tbody');
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
    }
}
