// Hands-on Project 8-3
// Sherouk Omara, 3.27.21
// script.js

'use strict'

function selectCardType () {
  const cardNumValue = document.getElementById('ccNum').value
  const visa = /^4[0-9]{12}(?:[0-9]{3})?$/
  const mc = /^5[1-5][0-9]{14}$/
  const discover = /^6(?:011|5[0-9]{2})[0-9]{12}$/
  const amex = /^3[47][0-9]{13}$/

  if (visa.test(cardNumValue)) {
    document.getElementById('visa').checked = 'checked'
  } else if (mc.test(cardNumValue)) {
    document.getElementById('mc').checked = 'checked'
  } else if (discover.test(cardNumValue)) {
    document.getElementById('discover').checked = 'checked'
  } else if (amex.test(cardNumValue)) {
    document.getElementById('amex').checked = 'checked'
  }
}

function createEventListeners () {
  const cardNum = document.getElementById('ccNum')
    
    if (cardNum.addEventListener) {
    cardNum.addEventListener('change', selectCardType, false)
    } else if (cardNum.attachEvent) {
    cardNum.attachEvent('onchange', selectCardType)
    }
}

if (window.addEventListener) {
    window.addEventListener('load', createEventListeners, false)
} else if (window.attachEvent) {
    window.attachEvent('onload', createEventListeners)
}
