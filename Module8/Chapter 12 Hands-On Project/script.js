/* JavaScript 6th Edition
Chapter 12
Hands-on Project 12-1

Author: Sherouk Omara 
Date: 5/7/21  

Filename: script.js
 */

function display(event) {
    $(event.currentTarget).next().fadeIn("slow");
}

$("h3").click(display);