/* JavaScript 6th Edition
Chapter 7
Chapter case

Outer Orbits
Author: Sherouk Omara
Date: 3.8.21

Filename: orbits.js
*/

'use strict' // interprets contents in JavaScript strict mode

const dateObject = new Date()
const countdown;
const ticket = {
  date:"",
  passengers: {
    fName: "",
    lName: ""
  }
}

function displayCalendar (whichMonth) {
  let date
  const dateToday = new Date()
  let dayOfWeek
  let daysInMonth
  let dateCells
  let captionValue
  let month
  let year
  const monthArray = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December']

  if (whichMonth === -1) {
    dateObject.setMonth(dateObject.getMonth() - 1)
  } else if (whichMonth === 1) {
    dateObject.setMonth(dateObject.getMonth() + 1)
  }

  month = dateObject.getMonth()
  year = dateObject.getFullYear()
  dateObject.setDate(1)
  dayOfWeek = dateObject.getDay()
  captionValue = monthArray[month] + ' ' + year
  document.querySelector('#cal table caption').textContent = captionValue

  if (month === 0 || month === 2 || month === 4 || month === 6 ||
    month === 7 || month === 9 || month === 11) {
    // Jan,Mar,May,Jul,Aug,Oct,Dec
    daysInMonth = 31
  } else if (month === 1) {
    // Feb
    if (year % 4 === 0) { // leap year test
      if (year % 100 === 0) {
        // year ending in 00 not a leap year unless divisible by 400
        if (year % 400 === 0) {
          daysInMonth = 29
        } else {
          daysInMonth = 28
        }
      } else {
        daysInMonth = 29
      }
    } else {
      daysInMonth = 28
    }
  } else { // Apr, Jun, Sep, Nov
    daysInMonth = 30
  }

  dateCells = document.getElementsByTagName('td')

  for (let i = 0; i < dateCells.length; i++) {
    // clear existing table dates
    dateCells[i].textContent = ''
    dateCells.className = ''
  }

  for (let i = dayOfWeek; i < daysInMonth + dayOfWeek; i++) {
    // add dates to days cells
    dateCells[i].textContent = dateObject.getDate()
    dateCells[i].className = 'date'
    if (dateToday < dateObject) {
      dateCells[i].className = 'futuredate'
    }
    date = dateObject.getDate() + 1
    dateObject.setDate(date)

    dateObject.setMonth(dateObject.getMonth() - 1)
    // reset month to month shown

    document.getElementById('cal').style.display = 'block'
  // display calendar if it's not already visible
  }
}

function selectDate (event) {
  if (event === undefined) {
    // get caller element in IE8
    event = window.event
  }

  const callerElement = event.target || event.srcElement

  if (callerElement.textContent === '') {
    // call contains no date, so don't close the calendar
    document.getElementById('cal').style.display = 'block'
    return false
  }

  dateObject.setDate(callerElement.textContent)

  const fullDateToday = new Date()
  const dateToday = Date.UTC(fullDateToday.getFullYear(),
    fullDateToday.getMonth(), fullDateToday.getDate())
  const selectedDate = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate())
  if (selectedDate <= dateToday) {
    document.getElementById('cal').style.display = 'block'
    return false
  }

  document.getElementById('tripDate').value = dateObject.toLocaleDateString()
  hideCalendar()
  updateTotalCost()
  countdown = setInterval(updateCountdown, 1000)
  document.getElementById("countdownSection").style.display = "block"

  ticket.date = dateObject.toLocaleDateString();
  document.getElementById("selectedDate").innerHTML = ticket.date;
  document.getElementById("dateSection").style.display = "block";
}

function hideCalendar () {
  document.getElementById('cal').style.display = 'none'
}

function prevMo () {
  displayCalendar(-1)
}

function nextMo () {
  displayCalendar(1)
}

function updateTotalCost () {
  const totalCost = 250000
  const monthlyCost = totalCost / 60
  const shortMonthlyCost = monthlyCost.toFixed(0)

  document.getElementById('singleLabel').textContent = 'Single payment of $' + totalCost.toLocaleString()
  document.getElementById('multipleLabel').textContent = '60 monthly payments of $' + shortMonthlyCost.toLocaleString()
}

function updateCountdown () {
  const dateToday = new Date()
  const dateFrom = Date.UTC(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate(), dateToday.getHours(), dateToday.getMinutes(), dateToday.getSeconds())
  const dateTo = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), 19, 0, 0) // all launches at 8:00pm UTC

  if ((dateTo - dateFrom) < 1000) { // time will be less than 0 when setInterval runs next
    clearInterval(countdown);
    document.getElementById("countdownSection").style.display ="none";
  }

  // days
  const daysUntil = Math.floor((dateTo - dateFrom) / 86400000)
  document.getElementById('countdown').textContent = daysUntil

  // hours
  const fractionalDay = (dateTo - dateFrom) % 86400000
    let hoursUntil = Math.floor(fractionalDay / 3600000)
    if (hoursUntil < 10) {
    hoursUntil = '0' + hoursUntil
    }
  document.getElementById('countdown').innerHTML += ':' + hoursUntil
    
    // minutes
    let fractionalHour = fractionalDay % 3600000
    let minutesUntil = Math.floor(fractionalHour / 60000)
    if (minutesUntil < 10) {
    minutesUntil = '0' + minutesUntil
    }
  document.getElementById('countdown').innerHTML += ':' + minutesUntil

  // seconds
  let fractionalMinute = fractionalHour % 60000;
  let secondsUntil = Math.floor(fractionalMinute / 1000);
  if (secondsUntil < 10) {
    secondsUntil = "0" + secondsUntil;
  }
  document.getElementById("countdown").innerHTML += ":" + secondsUntil;
}

functionregisterName() {
  let passengerList = document.getElementById("passengers");
  let passengerName = document.createElement("li");

  ticket.passengers.fName = document.getElementById("fname").value;
  ticket.passengers.lName = document.getElementById("lname").value;

  // add entered name to passenger list in ticket section
  passengerName.innerHTML = ticket.passengers.fName + " " + ticket.passengers.lName;
  passengerList.appendChild(passengerName);

  // clear first and last names from form
  document.getElementById("fname").value ="";
  document.getElementById("lname").value ="";
  
  // display ticket and passengers section
  document.getElementById("ticket").style.display ="block";
  document.getElementById("passengersSection").style.display = "block";
  
  // return focus to First Name field to facilitate entry of another passenger name
  document.getElementById("fname").focus();
}  

function createEventListeners () {
  const dateField = document.getElementById('tripDate')
  if (dateField.addEventListener) {
    dateField.addEventListener('click', displayCalendar, false)
  } else if (dateField.attachEvent) {
    dateField.attachEvent('onclick', displayCalendar)
  }

  const dateCells = document.getElementsByTagName('td')
  if (dateCells[0].addEventListener) {
    for (let i = 0; i < dateCells.length; i++) {
      dateCells[i].addEventListener('click', selectDate, false)
    }
  } else if (dateCells[0].attachEvent) {
    for (let i = 0; i < dateCells.length; i++) {
      dateCells[i].attachEvent('onclick', selectDate)
    }
  }

  const closeButton = document.getElementById('close')
  if (closeButton.addEventListener) {
    closeButton.addEventListener('click', hideCalendar, false)
  } else if (closeButton.attachEvent) {
    closeButton.attachEvent('onclick', hideCalendar)
  }

  const prevLink = document.getElementById('prev')
  const nextLink = document.getElementById('next')
  if (prevLink.addEventListener) {
    prevLink.addEventListener('click', prevMo, false)
    nextLink.addEventListener('click', nextMo, false)
  } else if (prevLink.attachEvent) {
    prevLink.attachEvent('onclick', prevMo)
    nextLink.attachEvent('onclick', nextMo)
  }

  var nameButton = document.getElementById("addName");
  if (nameButton.addEventListener) {
    nameButton.addEventListener("click", registerName, false);
  } else if (nameButton.attachEvent) {
    nameButton.attachEvent("onclick", registerName);
  }
}

if (window.addEventListener) {
  window.addEventListener('load', createEventListeners, false)
} else if (window.attachEvent) {
  window.attachEvent('onload', createEventListeners)
}
