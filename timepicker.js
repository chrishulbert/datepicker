// Returns true if a string is an integer
function isInteger(s) {
  for (i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    if (c<"0" || c>"9") return false;
  }
  return true;
}

// Make the time into a nice format as they type eg HHMM goes to HH:MM
function timePickerKeyup(e) {
  var targ; // Crossbrowser way to find the target (http://www.quirksmode.org/js/events_properties.html)
  if (!e) var e = window.event;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
  if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug

  if (targ.value.length==4 && isInteger(targ.value)) {
    targ.value = targ.value.substr(0,2) + ':' + targ.value.substr(2,2);
  }
}

// Gets called if they tab out of a time picker, to neaten it up
function timePickerBlur(e) {
  var targ; // Crossbrowser way to find the target (http://www.quirksmode.org/js/events_properties.html)
  if (!e) var e = window.event;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
  if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
  
  if (targ.value.length==1 && isInteger(targ.value)) {
    targ.value = '0' + targ.value + ':00';
  }
  if (targ.value.length==2 && isInteger(targ.value)) {
    targ.value = targ.value + ':00';
  }
  if (targ.value.length==3 && isInteger(targ.value)) {
    targ.value = '0' + targ.value.substr(0,1) + ':' + targ.value.substr(1,2);
  }
  if (targ.value.length==4 && isInteger(targ.value)) {
    targ.value = targ.value.substr(0,2) + ':' + targ.value.substr(2,2);
  }
}

// This is called when the page loads, it searches for inputs where the class is 'timepicker'
function timePickerInit() {
  // Search for elements by class
  var allElements = document.getElementsByTagName("*");
  for (i=0; i<allElements.length; i++) {
    var className = allElements[i].className;
    if (className=='timepicker' || className.indexOf('timepicker ') != -1 || className.indexOf(' timepicker') != -1) {
      allElements[i].onkeyup = timePickerKeyup;
      allElements[i].onblur = timePickerBlur;
    }
  }
}

// Hook myself into the page load event
if (window.addEventListener) { // W3C standard
  window.addEventListener('load', timePickerInit, false);
} else if (window.attachEvent) { // Microsoft
  window.attachEvent('onload', timePickerInit);
}
