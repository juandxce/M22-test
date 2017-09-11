var passDate = function(e) {
  e.preventDefault();
  //get the containers and values from index.html (month and year of the strings)
  var initialDate = document.getElementById('start-date').value;
  var endingDate = document.getElementById('end-date').value;

  var startingMonth = parseInt(document.getElementById('start-date').value.substring(0,2));
  var startingYear = parseInt(document.getElementById('start-date').value.substring(3));

  var endingMonth = parseInt(document.getElementById('end-date').value.substring(0,2));
  var endingYear = parseInt(document.getElementById('end-date').value.substring(3));

  var mainContainer = document.getElementById('main-calendar-container');
  var invalidDate = document.getElementById('validation');

  //form date validation with simple regex
  if((initialDate.match(/1[0-2]\-[1-2][0,9][0-9]{2}|0[1-9]\-[1-2][0,9][0-9]{2}/gi))&&
    (endingDate.match(/1[0-2]\-[1-2][0,9][0-9]{2}|0[1-9]\-[1-2][0,9][0-9]{2}/gi))&&
    ((startingYear<endingYear)||(startingYear==endingYear&&startingMonth<=endingMonth))&&
    (startingYear>1900&&endingYear<2100)){
    //append a month container for each month
    invalidDate.innerHTML = "";
    mainContainer.innerHTML="";//reset mainContainer
    for(var year=startingYear; year<=endingYear; year++){
      for(var month=(year == startingYear)?startingMonth:1; month<=12; month++){
        if(month == endingMonth && year == endingYear){
          createMonth(month, year);
          break;
        }
        createMonth(month, year);
      }
    }
  }else{ invalidDate.innerHTML="Por favor introduzca un intervalo válido"}
}

//function that returns a container with the month on it
var createMonth = function(month, year) {
  var d = new Date();
  var month_name = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var month = month-1; //0-11
  var year = year;
  var first_date = month_name[month] + " " + 1 + " " + year;
  var tmp = new Date(first_date).toDateString();
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

  //displays the date in a table, like a calendar
  var tempDateTable = document.createElement("div");
  tempDateTable.className='calendar-dates';
  tempDateTable.appendChild(calendar);

  //creates the outer div and appends the table and title to it
  var tempMonth = document.createElement("div");
  tempMonth.className = selectedRows<=5? 'calendar-container':'sm';
  tempMonth.appendChild(tempDateString);
  tempMonth.appendChild(tempDateTable);
  tempMonth.style.width = Math.floor(100/selectedRows)  + "%";

  document.getElementById("main-calendar-container").appendChild(tempMonth);
} //end createMonth

//returns table with a month days
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


var submitForm = document.getElementById('submit');
submitForm.addEventListener('click', passDate, false);
