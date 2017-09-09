var passDate = function(e) {
  e.preventDefault();
  //get the containers and values from index.html
  var startingMonth = document.getElementById('start-month').value;
  var startingYear = document.getElementById('start-year').value;
  var endingMonth = document.getElementById('end-month').value;
  var endingYear = document.getElementById('end-year').value;
  var mainContainer = document.getElementById('main-calendar-container');
  var invalidDate = document.getElementById('validation')

  if(startingYear < endingYear || (startingYear == endingYear && startingMonth <= endingMonth)){
    //append a month container for each month
    invalidDate.innerHTML = "";
    for(i=startingYear; i<=endingYear; i++){
      for(j=startingMonth; j<=12; j++){
        if(j == endingMonth && i == endingYear){
          createMonth(j, i);
          break;
        }
        createMonth(j, i);
      }
    }
  }else{ invalidDate.innerHTML="Por favor introduzca un intervalo válido"}

}






var submitForm = document.getElementById('submit');
submitForm.addEventListener('click', passDate, false);

//function that returns a container with the month on it
var createMonth = function(month, year) {
  var d = new Date();
  var month_name = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var month = month-1; //0-11
  var year = year;
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
  var calendar = get_calendar(day_no, days);
  var selectedRows = document.getElementById('rows-selected').value;

  //displays the date in a "string" way
  var tempDateString = document.createElement("div");
  tempDateString.className='calendar-month-year';
  tempDateString.innerHTML = `<span>${month_name[month]} ${year}</span>`;

  //displays the date in a table, kinda like a calendar
  var tempDateTable = document.createElement("div");
  tempDateTable.className='calendar-dates';
  tempDateTable.appendChild(calendar);
  // tempDateTable.style["max-width"] = Math.floor(90/selectedRows)  + "%";

  //creates the outer div and appends the table and title to it
  var tempMonth = document.createElement("div");
  tempMonth.className = selectedRows<=5? 'calendar-container':'sm';
  tempMonth.appendChild(tempDateString);
  tempMonth.appendChild(tempDateTable);
  tempMonth.style.width = Math.floor(100/selectedRows)  + "%";

  document.getElementById("main-calendar-container").appendChild(tempMonth);
  console.log(calendar);
  console.log(month_name[month] + " " + year);

}



function get_calendar(day_no, days) {
  var table = document.createElement('table');
  var tr = document.createElement('tr');

  //row for the day letters
  for (var c = 0; c <= 6; c++) {
    var td = document.createElement('td');
    td.innerHTML = "dlmmjvs" [c];
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
  tr="";

  //rest of the date rows
  for (var r = 3; r <= 7; r++) {
    tr = document.createElement('tr');
    for (var c = 0; c <= 6; c++) {
      if (count > days && c>=7) {
        table.appendChild(tr);
        return table;
      }else if(count <= days){
        var td = document.createElement('td');
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
      }else{ //fill the white spaces with empty td's
        var td = document.createElement('td');
        td.innerHTML = '';
        count++;
        tr.appendChild(td);
      }

    }
    table.appendChild(tr);
  }

  return table;

}
