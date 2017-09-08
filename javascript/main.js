var passDate = function(e) {
  e.preventDefault();
  var startingMonth = document.getElementById('start-month').value;
  console.log(startingMonth);
  var startingYear = document.getElementById('start-year').value;
  console.log(startingYear);
  var endingMonth = document.getElementById('end-month').value;
  console.log(endingMonth);
  var endingYear = document.getElementById('end-year').value;
  console.log(endingYear);
  var mainContainer = document.getElementById('main-calendar-container');
  //append a month container for each month
  for(i=startingYear; i<=endingYear; i++){
      console.log(i);
    for(j=startingMonth; j<=12; j++){
      if(j == endingMonth && i == endingYear){
        break
      }
        //mainContainer.appendChild(j);
        console.log(j);
    }
  }
}

var submitForm = document.getElementById('submit');
submitForm.addEventListener('click', passDate, false);

//function that returns a container with the month on it
var createMonth = function(month, year) {
  var d = new Date();
  var month_name = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  var month = month-1; //0-11
  var year = year; //2014
  var first_date = month_name[month] + " " + 1 + " " + year;
  //September 1 2014
  var tmp = new Date(first_date).toDateString();
  //Mon Sep 01 2014 ...
  var first_day = tmp.substring(0, 3); //Mon
  var day_name = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
  ];
  var day_no = day_name.indexOf(first_day); //1
  var days = new Date(year, month + 1, 0).getDate(); //30
  //Tue Sep 30 2014 ...
  var calendar = get_calendar(day_no, days);
  document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
  document.getElementById("calendar-dates").appendChild(calendar);
}

function get_calendar(day_no, days) {
  var table = document.createElement('table');
  var tr = document.createElement('tr');

  //row for the day letters
  for (var c = 0; c <= 6; c++) {
    var td = document.createElement('td');
    td.innerHTML = "SMTWTFS" [c];
    tr.appendChild(td);
  }
  table.appendChild(tr);

  //create 2nd row
  tr = document.createElement('tr');
  var c;
  for (c = 0; c <= 6; c++) {
    if (c == day_no) {
      break;
    }
    var td = document.createElement('td');
    td.innerHTML = "";
    tr.appendChild(td);
  }

  var count = 1;
  for (; c <= 6; c++) {
    var td = document.createElement('td');
    td.innerHTML = count;
    count++;
    tr.appendChild(td);
  }
  table.appendChild(tr);

  //rest of the date rows
  for (var r = 3; r <= 7; r++) {
    tr = document.createElement('tr');
    for (var c = 0; c <= 6; c++) {
      if (count > days) {
        table.appendChild(tr);
        return table;
      }
      var td = document.createElement('td');
      td.innerHTML = count;
      count++;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

createMonth(01, 2008);
