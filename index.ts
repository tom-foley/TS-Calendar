declare var require: any;
require('./src/styles/styles');

import { Calendar } from './src/scripts/Calendar';
let elCalendar: HTMLInputElement = <HTMLInputElement>document.getElementById('calendar');
let options = {
    selectedDate: new Date(2016, 7, 5),
    onSelectedDateChanged: function (eventArgs) {
        console.log('Old Date:\t' + eventArgs.oldDate.toLocaleDateString());
        console.log('New Date:\t' + eventArgs.newDate.toLocaleDateString());
    }
};

new Calendar(elCalendar, options);
