var today = new Date();
//Uncomment to test different dates
//today.setDate(13);
//today.setMonth(1); //Remember here that 0 is January
//today.setFullYear(2018);

//start at first day of month if checkbox ticked
if (document.getElementById("monthStart").checked == false){
    today.setDate(1);
}

//select this year or next year
if (document.getElementById("yearSelect").checked == true){
    today.setFullYear(today.getFullYear()+1);
}

//get the month the user wants to use
var month = document.getElementById("monthSelect").value;
if (month != "current"){
    today.setMonth(month);
}

//get the date format the user wants to use
var dateFormat = document.getElementById("dateFormatSelect").value;

//get today's date (and set variables)
var day = today.getDay();
var d = today.getDate();
var m = today.getMonth()+1; 	//January was 0 but is now 1
var yyyy = today.getFullYear();
var yy = yyyy - 2000;			//makes date two digit (16) rather than 2016
//dd and mm values are set later
var dd = "";                    //d is day with no 0 padding, dd has padding
var mm = "";                    //m is month with no 0 padding, mm has padding

//puts days of the week into an array so you print name not number
var dayName = [];
dayName[0]=  "Sunday";
dayName[1] = "Monday";
dayName[2] = "Tuesday";
dayName[3] = "Wednesday";
dayName[4] = "Thursday";
dayName[5] = "Friday";
dayName[6] = "Saturday";

//Pick correct number of days for each month
//30 days has September (9), April (4), June (6) and November (11)
//February has 28 except leap years	
var monthLength = 0;
if (m == 9 || m == 4 || m == 6 || m == 11){
    monthLength = 30;
}
else if(m == 2){
    monthLength = 28;
    //Leap years are every four years, if year is divisible by 4 then it is a leap year
    if (yy%4 ==0){
        monthLength = 29;
    }
}
else{
    monthLength = 31;
}

while (d<=monthLength){
    //add 0 padding for dd and mm when the values are less than 10
    dd = startZero(d);
    mm = startZero(m);

    //change numbers into names of days
    var dayOfWeek = dayName[day]; 
    //output date in the correct format
    var today = "";
    console.log("dateformat: " + dateFormat);
    switch (dateFormat){
        case "0":
            console.log("0");
            today = d+"/"+m+"/"+yy+" ("+dayOfWeek+")";
        break;
        case "1":
            console.log("1");
            today = d+"/"+m+"/"+yyyy+" ("+dayOfWeek+")";
        break;
        case "2":
            console.log("2");
            today = dd+"/"+mm+"/"+yy+" ("+dayOfWeek+")";
        break;
        case "3":
            console.log("3");
            today = dd+"/"+mm+"/"+yyyy+" ("+dayOfWeek+")";
        break;
        case "4":
            console.log("4");
            today = yyyy+"-"+mm+"-"+dd+" ("+dayOfWeek+")";
        break; 
        default:
            console.log("5");
            today = d+"/"+m+"/"+yy+" ("+dayOfWeek+")";
    }
    
    //printed with last output into <p> labelled output
    output.innerHTML += today + "<br>";

    //move onto the next day
    d++;
    day++;
    //loop into next week when week ends
    if (day>6){
        day = 0;
    }
}

//Add zeros onto the start of a number if it's less than 10
function startZero(number){
    var paddedNumber = "";
    if (number < 10){
        paddedNumber = "0" + number;
    }
    else{
        paddedNumber = number
    }
    return paddedNumber;
}