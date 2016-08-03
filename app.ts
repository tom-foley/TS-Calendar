declare var require: any;
require('./src/styles/styles');

import { Calendar } from './src/scripts/Calendar';

new Calendar(document.getElementById('calendar'));
