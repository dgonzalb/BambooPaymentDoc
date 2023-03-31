var strLocation = window.location.pathname;
var element = document.getElementById(strLocation);
element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
