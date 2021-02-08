/* JavaScript 6th Edition
* Chapter 3
* Chapter case
* Tipton Turbines
* Variables and functions
* Author: Sherouk Omara
* Date: 2/7/21
* Filename: tt.js
*/

// global variables
const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const opponents = ["Lightning","Combines", "Combines", "Combines", "Lightning", "Lightning", "Lightning", "Lightning", "Barn Raisers", "Barn Raisers", "Barn Raisers", "Sodbusters", "Sodbusters", "Sodbusters", "Sodbusters", "(off)", "River Riders", "River Riders", "River Riders", "Big Dippers", "Big Dippers", "Big Dippers", "(off)", "Sodbusters", "Sodbusters", "Sodbusters", "Combines", "Combines", "Combines", "(off)", "(off)"];
const gameLocation = ["away", "away", "away", "away", "home", "home", "home", "home", "home", "home", "home", "away", "away", "away", "away", "", "away", "away", "away", "away", "away", "away", "", "home", "home", "home", "home", "home", "home", "", ""];

// function to place daysOfWeek values in header row cells
function addColumnHeaders() {
    let i = 0;
    while (i < 7) {
        document.getElementsByTagName("th")[i].innerHTML = daysOfWeek[i];
        i++;
    };
};

// function to place day of month value in first p element 
// within each table data cell that has an id
function addCalendarDates() {
    let i = 1;
    let paragraphs = "";
    do {
        let tableCell = document.getElementById("08-" + i);
        paragraphs = tableCell.getElementsByTagName("p");
        paragraphs[0].innerHTML = i;
        i++;
    } while (i <= 31)
};

// function to place opponent value in
// second p element within each table data cell that has an id

function addGameInfo() {
    let paragraphs = "";
    for (i = 0; i < 31; i++) {
        let date = i + 1;
        let tableCell = document.getElementById("08-" + date);
        paragraphs = tableCell.getElementsByTagName("p");
        if (gameLocation[i] === "away") {
            paragraphs[1].innerHTML = "@ ";
        }
        paragraphs[1].innerHTML += opponents[i];
    }
};

// function to populate calendar
function setUpPage() {
    addColumnHeaders();
    addCalendarDates();
    addGameInfo();
};

// run setUpPage() function when page loads
window.addEventListener("load", setUpPage, false);