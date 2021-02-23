/*    JavaScript 6th Edition
 *    Chapter 5
 *    Chapter case

 *    Photo gallery
 *    Variables and functions
 *    Author: Sherouk Omara
 *    Date: 2.22.21  

 *    Filename: photos.js
 */

"use strict" // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrder = [1,2,3,4,5]
var figureCount = 3;
var autoAdvance = setInterval(rightAdvance, 5000);

/* add src values to img elements based on order specified in photoOrder array*/
function populateFigures() {
   let filename;
   let currentFig;

   if (figureCount === 3) {
      for (let i = 1; i < 4; i++) {
         filename = "images/IMG_0" + photoOrder[i] + "sm.jpg";
         currentFig = document.getElementsByTagName("img") [i-1];
         currentFig.src = filename;
      }
   } else {
      for (let i = 0; i < 5; i++) {
         filename = "images/IMG_0" + photoOrder[i] + "sm.jpg"
         currentFig = document.getElementsByTagName("img") [i];
         currentFig.src = filename;
      }
   }
}

/* stop automatic image switching and call rightAdvance() function */
function rightArrow () {
   clearInterval(autoAdvance);
   rightAdvance();
}

/* shift all images one figure to the left, and change values in photoOrder array to match  */
function rightAdvance() {
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] + 1) === 6) {
         photoOrder[i] = 1
      } else {
         photoOrder[i] += 1
      }
      populateFigures()
   }
}

/* shift all images one figure to the right, and change values in photoOrder array to match  */
function leftArrow() {
   clearInterval(autoAdvance);
   
   for (var i = 0; i < 5; i++) {
      if ((photoOrder[i] - 1) === 0) {
         photoOrder[i] = 5
      } else {
         photoOrder[i] -= 1
      }
      populateFigures()
   }
}

/* switch to 5-image layout */
function previewFive() {
   let articleEl = document.getElementsByTagName("article") [0]
   
   //create figure and img elements for fifth image
   let lastFigure = document.createElement("figure")
   lastFigure.id = "fig5"
   lastFigure.style.zIndex = "5"
   lastFigure.style.position = "absolute"
   lastFigure.style.right = "45px"
   lastFigure.style.top = "67px"

   let lastImage = document.createElement("img")
   lastImage.width = "240"
   lastImage.height = "135"

   lastFigure.appendChild(lastImage)
   //articleEl.appendChild(lastFigure)
   articleEl.insertBefore(lastFigure, document.getElementById("rightarrow"));

   // clone figure element for fifth image and edit to be first image
   let firstFigure = lastFigure.cloneNode(true)
   firstFigure.id = "fig1"
   firstFigure.style.right = ""
   firstFigure.style.left = "45px"

   //articleEl.appendChild(firstFigure)
   articleEl.insertBefore(firstFigure, document.getElementById("fig2"));
   figureCount = 5;

   // add appropriate src values to two new img elements
   document.getElementsByTagName("img") [0].src = "images/IMG_0" + photoOrder[0] + "sm.jpg";
   document.getElementsByTagName("img")[4].src = "images/IMG_0" + photoOrder[4] + "sm.jpg";

   // change button to hide extra images
   let numberButton = document.querySelector("#fiveButton p");
   numberButton.innerHTML = "Show fewer images";
   if (numberButton.addEventListener) {
      numberButton.removeEventListener("click", previewFive, false);
      numberButton.addEventListener("click", previewThree, false);
   } else if (numberButton.attachEvent) {
      numberButton.detachEvent("onclick", previewFive);
      numberButton.attachEvent("onclick", previewThree);
   }
}

/* switch to 3-image layout */
function previewThree () {
   let articleEl = document.getElementsByTagName("article") [0];
   let numberButton = document.querySelector("#fiveButton p");

   articleEl.removeChild(document.getElementById("fig1"));
   articleEl.removeChild(document.getElementById("fig5"));

   figureCount = 3;
   numberButton.innerHTML = "Show more images";
   if (numberButton.addEventListener) {
      numberButton.removeEventListener("click", previewThree, false);
      numberButton.addEventListener("click", previewFive, false);
   } else if (numberButton.attachEvent) {
      numberButton.detachEvent("onclick", previewThree);
      numberButton.attachEvent("onclick", previewFive);
   }
}   

/* open center figure in separate window */
function zoomFig() {
   let propertyWidth = 960;
   let propertyHeight = 600;
   let winLeft = ((screen.width - propertyWidth)/2);
   let winTop = ((screen.height - propertyHeight)/2);
   let winOptions = "width=960, height=600";
   winOptions += ",left=" + winLeft;
   winOptions += ",top=" + winTop;
   let zoomWindow = window.open("zoom.htm", "zoomwin", winOptions);
   zoomWindow.focus();
}

/* create event listeners for left arrow, right arrow, and center figure element*/
function createEventListeners() {
   const leftarrow = document.getElementById("leftarrow")
   if (leftarrow.addEventListener) {
      leftarrow.addEventListener("click", leftArrow, false)
   } else if (leftarrow.attachEvent) {
      leftarrow.attachEvent("onclick", leftArrow)
   }

   const rightarrow = document.getElementById("rightarrow")
   if (rightarrow.addEventListener) {
      rightarrow.addEventListener("click", rightArrow, false)
   } else if (rightarrow.attachEvent) {
      rightarrow.attachEvent("onclick", rightArrow)
   }

   const mainFig = document.getElementById("img") [1]
   if (mainFig.addEventListener) {
      mainFig.addEventListener("click", zoomFig, false)
   } else if (mainFig.attachEvent) {
      mainFig.attachEvent("onclick", zoomFig)
  }
   

   const showAllButton = document.querySelector("#fiveButton p")
   if (showAllButton.addEventListener) {
      showAllButton.addEventListener("click", previewFive, false)
   } else if (showAllButton.attachEvent) {
      showAllButton.attachEvent("onclick", previewFive)
   }
}

/* create event listeners and populate image elements */
function setUpPage() {
   createEventListeners()
   populateFigures()
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false) 
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage)
}