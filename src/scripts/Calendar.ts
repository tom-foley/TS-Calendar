function isDefined(obj) {
    return typeof (obj) !== 'undefined' && obj !== null;
}

export class Calendar {
    //  Elements
    container: HTMLElement;
    calendar: HTMLTableElement;
    selectedCell: HTMLTableCellElement;

    //  Fields
    selectedDay: number;
    selectedMonth: number;
    selectedYear: number;
    selectedDate: Date;
    oldSelectedDate: Date;
    calendarCssClass: string = 'ts-calendar';
    calendayDayCssClass: string = 'ts-calendar-day';
    calendarDayActiveCssClass: string = 'ts-calendar-day-active';

    //  Custom Events  
    onSelectedDateChanged: any;

    months: Array<string> = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December',
    ];


    constructor(container: HTMLElement, options?: Object) {
        this.container = container;
        this.setFields(options);
        this.render();
    }


    private setFields(attrs: Object) {
        if (isDefined(attrs)) {
            let key: string;

            key = 'selectedDate';
            if (isDefined(attrs[key])) {
                this.setDate(attrs[key]);
            } else {
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

            key = 'onSelectedDateChanged';
            if (isDefined(attrs[key])) {
                this.onSelectedDateChanged = attrs[key];
            }
        } else {
            this.setDate(new Date());
        }
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


    private setNewDay(date, ev): void {
        let self = ev.target;
        this.selectedCell.classList.remove(this.calendarDayActiveCssClass);
        this.selectedCell = self;
        this.setDate(date);
        self.classList.add(this.calendarDayActiveCssClass);
    }


    private setNewMonth(date, ev): void {
        this.setDate(date);
        this.container.removeChild(this.calendar);
        this.render();
    }


    private generateHeaderRow(curMonth: Date, prevMonth: Date, nextMonth: Date): HTMLTableRowElement {
        let tr: HTMLTableRowElement = document.createElement('tr');

        let btnLeft: HTMLTableHeaderCellElement = document.createElement('th');
        btnLeft.colSpan = 1;
        btnLeft.innerText = 'L';
        btnLeft.onclick = this.setNewMonth.bind(this, this.copyDate(prevMonth));

        let btnRight: HTMLTableHeaderCellElement = document.createElement('th');
        btnRight.colSpan = 1;
        btnRight.innerText = 'R';
        btnRight.onclick = this.setNewMonth.bind(this, this.copyDate(nextMonth));

        let title: HTMLTableHeaderCellElement = document.createElement('th');
        title.colSpan = 5;
        title.innerText = this.months[curMonth.getUTCMonth()] + ' ' + curMonth.getUTCFullYear();

        tr.appendChild(btnLeft);
        tr.appendChild(title);
        tr.appendChild(btnRight);
        return tr;
    }


    private generateWeekRow(curDate: Date): HTMLTableRowElement {
        let tr: HTMLTableRowElement = document.createElement('tr');

        for (let i: number = 0; i < 7; ++i) {
            let td: HTMLTableCellElement = document.createElement('td');
            td.className = this.calendayDayCssClass;
            td.innerText = curDate.getUTCDate().toString();

            if (this.compareDates(curDate, this.selectedDate) === 0) {
                td.classList.add(this.calendarDayActiveCssClass);
                this.selectedCell = td;
            } else if (curDate.getUTCMonth() < this.selectedMonth || curDate.getUTCMonth() > this.selectedMonth) {
                td.onclick = this.setNewMonth.bind(this, this.copyDate(curDate));
            } else {
                td.onclick = this.setNewDay.bind(this, this.copyDate(curDate));
            }

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

        let table: HTMLTableElement = document.createElement('table');
        table.className = this.calendarCssClass;

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
        this.calendar = table;
        this.container.appendChild(table);
    }
}
