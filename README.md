##  TS-Calendar
A Calendar/DatePicker widget written in HTML/SCSS/TypeScript with no dependencies. 

### Getting Started
Use the following steps to get started with the TS-Calendar widget

####    Option 1: Build it yourself using `npm`, `gulp` and `webpack`
*   Clone the TS-Calendar repo
*   `cd` into the TS-Calendar root folder and run `npm install`. This will install all the required `npm` modules to build & transpile the TypeScript source.
*   Run `gulp` to kick-off the default `gulp` task of building & transpiling the TypeScript into JavaScript and the SCSS into CSS using `webpack`
*   Get the output files `lib/bundle.js` & `lib/bundle.css` and copy them into your project somewhere

####    Option 2: Download the pre-compiled source from this repo
*   Navigate to the `lib` directory in this repo and download both the `bundle.css` file and the `bundle.js` file and add them to your project.

### Usage
Once you have the necessary files included in your project, we can use TS-Calendar as follows:

The `Calendar` constructor takes as parameters an HTML `input` element and an optional `Object` providing arguments to the calendar. 

First, in your `.html` page, include the necessary bundled files to use the calendar.declare an `input` element that you wish to have converted into a DatePicker.

```html
<head>
    <link rel="stylesheet" href="./path/to/bundle.css">
</head>
<body>
...
<input id='myCalendarInput' />
...

<script type='text/javascript' src="./path/to/bundle.js"></script>
```

Then, in your `index.js` or `index.ts` (if you are using TypeScript), we can use the `Calendar` constructor as follows: 

```typescript
var myCalendarInput = document.getElementById('myCalendarInput');    //  this needs to be an <input /> element
var calendar = new Calendar(myCalendarInput);
```

Optionally, we can create an `Object` and provide arguments to the `Calendar`. Supported arguments are listed below:
*   `animate`: <boolean> Option denoting whether or not to animate the calendar on open and close
*   `selectedDate`: <Date> The date selected on calendar creation.
*   `onSelectedDateChanged`: <Function> A function which gets called when the selected date changes due to user action. When using this function, a parameter will be passed in as an `Object` which contains the old selected date and the new selected date.
*   `cssClass`: <string> The css class for the root table element which holds the calendar.
*   `dayCssClass`: <string> The css class for each table cell which contains a calendar date.
*   `activeDayCssClass`: <string> The css class for the current selected date on the calendar.
*   `headerCssClass`: <string> The css class for the `<th>` section of the calendar, which contains the new month buttons and the calendar title (month + year).

We can use any/all of these options like so:

```typescript
var myCalendarInput = document.getElementById('myCalendarInput');    //  this needs to be an <input /> element
var options = {
    animate: true,
    cssClass: 'my-calendar-css-class',
    selectedDate: new Date(2016, 7, 5),
    onSelectedDateChanged: function (eventArgs) {
        console.log('Old Date:\t' + eventArgs.oldDate.toLocaleDateString());
        console.log('New Date:\t' + eventArgs.newDate.toLocaleDateString());
    }
};
var calendar = new Calendar(myCalendarInput);
```