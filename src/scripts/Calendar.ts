import { HTMLElementBuilder, HTMLEventAttr, HTMLStyleAttr, isDefined } from './HTMLElementBuilder';

const style = HTMLStyleAttr;
const event = HTMLEventAttr;

class Month {
    index: number;
    shortName: string;
    longName: string;

    constructor(index: number, shortName: string, longName: string) {
        this.index = index;
        this.shortName = shortName;
        this.longName = longName;
    }
}

export class Calendar {
    selectedDate: Date;

    selectedDay: number;
    selectedMonth: number;
    selectedYear: number;

    container: HTMLElement;
    builder: any;
    months: Array<Month> = [
        new Month(0, 'Jan', 'January'), new Month(1, 'Feb', 'February'), new Month(2, 'Mar', 'March'),
        new Month(3, 'Apr', 'April'), new Month(4, 'May', 'May'), new Month(5, 'Jun', 'June'),
        new Month(6, 'Jul', 'July'), new Month(7, 'Aug', 'August'), new Month(8, 'Sep', 'September'),
        new Month(9, 'Oct', 'October'), new Month(10, 'Nov', 'November'), new Month(11, 'Dec', 'December'),
    ];

    constructor(container: HTMLElement, options?: Object) {
        this.container = container;
        this.builder = new HTMLElementBuilder();

        if (isDefined(options)) {
            let attr: string;
            attr = 'selectedDate';
            if (isDefined(options[attr])) {
                this.setDate(options[attr]);
            } else {
                this.setDate(new Date(2016, 6, 15));
            }
        } else {
            this.setDate(new Date(2016, 6, 15));
        }

        this.render();
    }


    private setDate(date: Date | string) {
        if (typeof (date) === 'object') {
            this.selectedDate = <Date>date;
        } else if (typeof (date) === 'string') {
            this.selectedDate = new Date(<string>date);
        }

        this.selectedDay = this.selectedDate.getUTCDate();
        this.selectedMonth = this.selectedDate.getUTCMonth();
        this.selectedYear = this.selectedDate.getUTCFullYear();
        console.log('Day:\t' + this.selectedDay + '\tMonth:\t' + this.selectedMonth + '\tYear:\t' + this.selectedYear);
    }


    private generateWeekRow(curDate: Date): HTMLTableRowElement {
        let tr: HTMLTableRowElement = document.createElement('tr');
        let day = 0;
        while (day <= 6) {
            let td: HTMLTableCellElement = document.createElement('td');
            td.innerText = curDate.getUTCDate().toString();
            tr.appendChild(td);
            curDate.setUTCDate(curDate.getUTCDate() + 1);
            day++;
        }

        return tr;
    }


    private compareDates(date1: Date, date2: Date) {
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


    private render() {
        let startDate: Date, endDate: Date;
        let prevMonthLastDay: Date = new Date(this.selectedYear, this.selectedMonth, 0);
        let curMonthFirstDay: Date = new Date(this.selectedYear, this.selectedMonth, 1);
        let curMonthLastDay: Date = new Date(curMonthFirstDay.getUTCFullYear(), curMonthFirstDay.getUTCMonth(), 0);
        let nextMonthFirstDay: Date = new Date(curMonthFirstDay.getUTCFullYear(), curMonthFirstDay.getUTCMonth() + 1, 1);

        if (curMonthFirstDay.getUTCDay() === 0) {
            console.log('Start Date = 0');
            startDate = curMonthFirstDay;
        } else {
            console.log('Start Date > 0');
            startDate = new Date(
                prevMonthLastDay.getUTCFullYear(),
                prevMonthLastDay.getUTCMonth(),
                prevMonthLastDay.getUTCDate() - prevMonthLastDay.getUTCDay()
            );
        }

        if (curMonthLastDay.getUTCDay() === 6) {
            console.log('End Date = 6');
            endDate = curMonthLastDay;
        } else {
            console.log('End Date < 6');
            endDate = new Date(
                nextMonthFirstDay.getUTCFullYear(),
                nextMonthFirstDay.getUTCMonth(),
                7 - nextMonthFirstDay.getUTCDay()
            );
        }

        console.log(startDate);
        console.log(endDate);

        let table: HTMLElement = this.builder.createEl({
            type: 'table',
            styles: [
                new style('width', '100%')
            ]
        });

        while (this.compareDates(startDate, endDate) < 1) {
            table.appendChild(this.generateWeekRow(startDate));
        }

        this.container.appendChild(table);
    }
}
