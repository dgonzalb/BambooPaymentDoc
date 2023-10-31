window.onload = function() {
    var phtml = document.getElementById('available-countries').nextSibling.nextSibling.innerHTML.replace('MM', document.getElementsByClassName('map-point').length);
    document.getElementById('available-countries').nextSibling.nextSibling.innerHTML = phtml;
}