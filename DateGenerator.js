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


//get today's date
var day = today.getDay();
var dd = today.getDate();
var mm = today.getMonth()+1; 	//January was 0 but is now 1
var yyyy = today.getFullYear();
yy = yyyy - 2000;				//makes date two digit (16) rather than 2016

//puts days of the week into an array so you print name not number
var dayname = new Array(7);
    dayname[0]=  "Sunday";
    dayname[1] = "Monday";
    dayname[2] = "Tuesday";
    dayname[3] = "Wednesday";
    dayname[4] = "Thursday";
    dayname[5] = "Friday";
    dayname[6] = "Saturday";

//Pick correct number of days for each month
//30 days has September (9), April (4), June (6) and November (11)
//February has 28 except leap years	
var monthlength = 0;
if (mm == 9 || mm == 4 || mm == 6 || mm == 11){
    monthlength = 30;
}
else if(mm == 2){
    monthlength = 28;
    //Leap years are every four years, if year is divisible by 4 then it is a leap year
    if (yy%4 ==0){
        monthlength = 29;
    }
}
else{
    monthlength = 31;
}

while (dd<=monthlength){
    //change numbers into names of days
    var dayofweek = dayname[day]; 
    //output correct format for the date
    var today = dd+"/"+mm+"/"+yy+" ("+dayofweek+")";
    //printed with last output into <p> labelled output
    output.innerHTML += today + "<br>";

    //move onto the next day
    dd++;
    day++;
    //loop into next week when week ends
    if (day>6){
        day = 0;
    }
}