const testDatesArray = [
    "Monday, May 4, 2026",
    "Tuesday, May 5, 2026",
    "Wednesday, May 6, 2026",
    "Thursday, May 7, 2026",
    "Friday, May 8, 2026",
    "Saturday, May 9, 2026",
    "Sunday, May 10, 2026"
];

//Puts days of the week into an array so you print name not number (Sunday is 0)
const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//Run the code when the page loads
displayDates();

function displayDates(){
    datesArray = generateDates();

    //Clear the text
    document.getElementById("output").innerHTML = "";

    //Set the number of rows to display in the textarea
    output.rows = datesArray.length;

    for (const date of datesArray) {
        output.innerHTML += date + "\n";
    }
}

function getUserVariables(){
    //Get today's date
    var today = new Date();

    //Uncomment to test different dates
    //today.setDate(13);
    //today.setMonth(1); //Remember here that 0 is January
    //today.setFullYear(2018);

    //Start at first day of month if checkbox ticked
    if (document.getElementById("monthStart").checked == false){
        today.setDate(1);
    }

    //Select this year or next year
    if (document.getElementById("yearSelect").checked == true){
        today.setFullYear(today.getFullYear()+1);
    }

    //Hides weekends if the checkbox is ticked
    var hideWeekends = false;
    if (document.getElementById("weekendSelect").checked == true){
        hideWeekends = true;
    }

    //Get the month the user wants to use
    var month = document.getElementById("monthSelect").value;
    if (month != "current"){
        today.setMonth(month);
    }

    //Get the date format the user wants to use
    var dateFormat = document.getElementById("dateFormatSelect").value;

    return [today, dateFormat, hideWeekends]
}

function generateDates(){
    var userVariables = getUserVariables();
    var today = userVariables[0];
    var dateFormat = userVariables[1];
    var hideWeekends = userVariables[2];

    var outputArray = [];

    //Get today's date (and set variables)
    var day = today.getDay();
    var d = today.getDate();
    var m = today.getMonth()+1; 	//January was 0 but is now 1
    var yyyy = today.getFullYear();
    var yy = yyyy - 2000;			//Makes date two digit (16) rather than 2016
    //dd and mm values are set later
    var dd = null;                  //d is day with no 0 padding, dd has padding
    var mm = null;                  //m is month with no 0 padding, mm has padding

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
        //Add 0 padding for dd and mm when the values are less than 10
        dd = startZero(d);
        mm = startZero(m);

        //Change numbers into names of days
        var dayOfWeek = dayName[day]; 
        //Output date in the correct format
        var today = "";
        switch (dateFormat){
            case "0":
                today = d+"/"+m+"/"+yy+" ("+dayOfWeek+")";
            break;
            case "1":
                today = d+"/"+m+"/"+yyyy+" ("+dayOfWeek+")";
            break;
            case "2":
                today = dd+"/"+mm+"/"+yy+" ("+dayOfWeek+")";
            break;
            case "3":
                today = dd+"/"+mm+"/"+yyyy+" ("+dayOfWeek+")";
            break;
            case "4":
                today = yyyy+"-"+mm+"-"+dd+" ("+dayOfWeek+")";
            break; 
            default:
                today = d+"/"+m+"/"+yy+" ("+dayOfWeek+")";
        }
        
        //Add the date (unless hideWeekends is true and the day is a weekend)
        if (!(hideWeekends && (day == 0 || day == 6))){
            outputArray.push(today);
        }

        //Move onto the next day
        d++;
        day++;
        //Loop into next week when week ends
        if (day>6){
            day = 0;
        }
    }

    return outputArray;
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

//Toggle the visibility of the settings bar
function toggleVisibility(){
    if(document.getElementById("settingsBar").style.display == "none"){
        document.getElementById("settingsBar").style.display = "block";
        document.getElementById("hideButton").value = "Hide Options";
    }
    else{
        document.getElementById("settingsBar").style.display = "none";
        document.getElementById("hideButton").value = "Show Options";
    }
}

//Copy the dates to the clipboard
function copyDates(){
    document.getElementById("output").select();
    document.execCommand("copy");
}

function exportDatesToWord(datesArray) {
    // 1. Set up the Word-compatible HTML structure
    let htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>Exported Dates</title>
        </head>
        <body>
            <!-- A table ensures Word respects the layout and borders -->
            <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; font-size: 12pt;">
    `;

    // 2. Loop through your dates and create a row for each
    datesArray.forEach(date => {
        htmlContent += `
            <tr>
                <!-- The inline style here creates the line between dates -->
                <td style="border-bottom: 1px solid #000000; padding: 10px 0;">
                    ${date}
                </td>
            </tr>
        `;
    });

    htmlContent += `
            </table>
        </body>
        </html>
    `;

    // 3. Create a Blob with the proper MIME type for MS Word
    // The '\ufeff' adds a Byte Order Mark (BOM) to ensure UTF-8 characters render correctly
    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword'
    });

    // 4. Create a temporary download link and trigger the save
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Date_Export.doc'; // The filename for the user
    
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Example usage:
// const myDates = ["Monday, May 4, 2026", "Tuesday, May 5, 2026", "Wednesday, May 6, 2026"];
// exportDatesToWord(myDates);

//Ensures that the page can work offline
UpUp.start({
    "content-url": "DateGenerator.html",
    "assets":[
        "DateGenerator.js",
        "DateGenerator.css"
    ]
});