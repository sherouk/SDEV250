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
}

function hideCalendar() {
    document.getElementById("cal").style.display = "none"
}

function prevMo() {
    displayCalendar(-1)
}

function nextMo() {
    displayCalendar(1)
}

function updateTotalCost() {
    let totalCost = 250000
    let monthlyCost = totalCost/60
    let shortMonthlyCost = monthlyCost.toFixed(0)

    document.getElementById("singleLabel").textContent = "Single payment of $" + totalCost.toLocaleString()
    document.getElementById("multipleLabel").textContent = "60 monthly payments of $" + shortMonthlyCost.toLocaleString()
}

function updateCountdown() {
    const dateToday = new Date()
    const dateFrom = Date.UTC(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate(), dateToday.getHours(), dateToday.getMinutes(), dateToday.getSeconds())
    const dateTo = Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate(), 19,0,0) // all launches at 8:00pm UTC
    
    // days
    let daysUntil = Math.floor((dateTo - dateFrom) / 86400000)
    document.getElementById("countdown").textContent = daysUntil

    // hours
    
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

  const closeButton = document.getElementById("close")
  if (closeButton.addEventListener) {
      closeButton.addEventListener("click", hideCalendar, false)
  } else if (closeButton.attachEvent) {
      closeButton.attachEvent("onclick", hideCalendar)
  }

    let prevLink = document.getElementById('prev')
    let nextLink = document.getElementById("next")
    if (prevLink.addEventListener) {
        prevLink.addEventListener("click", prevMo, false)
        nextLink.addEventListener("click", nextMo, false)
    } else if (prevLink.attachEvent) {
        prevLink.attachEvent("onclick", prevMo)
        nextLink.attachEvent("onclick", nextMo)
    }

}

if (window.addEventListener) {
  window.addEventListener('load', createEventListeners, false)
} else if (window.attachEvent) {
  window.attachEvent('onload', createEventListeners)
}
