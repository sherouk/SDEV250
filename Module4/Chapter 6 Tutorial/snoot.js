/*
JavaScript 6th Edition
Chapter 6
Chapter case

Snoot Flowers
Functions
Author: Sherouk Omara
Date: 3.2.21

Filename: snoot.js
*/

'use strict';

/* global variables */
const twentyNine = document.createDocumentFragment()
const thirty = document.createDocumentFragment()
const thirtyOne = document.createDocumentFragment()

/* set up node building blocks for selection list of days */
function setupDays () {
  const dates = document.getElementById('delivDy').getElementsByTagName('option')
  twentyNine.appendChild(dates[28].cloneNode(true))
  // ^ add 29th
  thirty.appendChild(dates[28].cloneNode(true))
  thirty.appendChild(dates[29].cloneNode(true))
  // ^ add 29th and 30th
  thirtyOne.appendChild(dates[28].cloneNode(true))
  thirtyOne.appendChild(dates[29].cloneNode(true))
  thirtyOne.appendChild(dates[30].cloneNode(true))
  // ^ add 29th, 30th, and 31st
}

function updateDays () {
  const deliveryDay = document.getElementById('delivDy')
    let dates = deliveryDay.getElementsByTagName('option')
    let deliveryMonth = document.getElementById('delivMo')
    let deliveryYear = document.getElementById('delivYr')
    let selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value

    while (dates[28]) {
    // remove child with index of 28 until this index is empty
    deliveryDay.removeChild(dates[28])
  }

  if (deliveryYear.selectedIndex === -1) {
    // if no year is selected, choose the default year so length of Feb can be determined
    deliveryYear.selectedIndex = 0
  }

  if (selectedMonth === '2' && deliveryYear.options[deliveryYear.selectedIndex].value === '2018') {
    // if leap year, Feb has 29 days
    deliveryDay.appendChild(twentyNine.cloneNode(true))
  } else if (selectedMonth === '4' || selectedMonth === '6' || selectedMonth === '9' || selectedMonth === '11') {
    // these months have 30 days
    deliveryDay.appendChild(thirty.cloneNode(true))
    } else if (selectedMonth === '1' || selectedMonth === '3' || selectedMonth === '5' || selectedMonth === '7' || selectedMonth === '8' || selectedMonth === '10' || selectedMonth === '12') {
    // these months have 31 days
    deliveryDay.appendChild(thirtyOne.cloneNode(true))
    }
}

/* remove default values and formatting from state and delivery date selection lists */
function removeSelectDefaults () {
  const emptyBoxes = document.getElementsByTagName('select')
  for (let i = 0; i < emptyBoxes.length; i++) {
    emptyBoxes[i].selectedIndex = -1
  }
}

/* run initial form configuration functions */
function setUpPage() {
    removeSelectDefaults()
    setupDays()
    createEventListeners()
}
 
/* create event listeners */
function createEventListeners() {
    var deliveryMonth = document.getElementById("delivMo")
    if (deliveryMonth.addEventListener) {
        deliveryMonth.addEventListener("change", updateDays, false)
    } else if (deliveryMonth.attachEvent) {
        deliveryMonth.attachEvent("onchange", updateDays)
    }
}

/* run setup function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener('load', setUpPage, false)
} else if (window.attachEvent) {
  window.attachEvent('onload', setUpPage)
}
