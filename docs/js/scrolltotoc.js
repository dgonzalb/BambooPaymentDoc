var strLocation = window.location.pathname;
var strsplit = strLocation.split('/');
if (strsplit[1].length !== 2) {
    strLocation = window.location.pathname.substring(strsplit[1].length + 1);
}

var element = document.getElementById(strLocation);
element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

const miDiv = document.getElementById('td-section-nav');

miDiv.addEventListener('mouseenter', () => {
    miDiv.style.overflow = 'auto'; // Muestra el scroll cuando el mouse entra en el div
});

miDiv.addEventListener('mouseleave', () => {
    miDiv.style.overflow = 'hidden'; // Oculta el scroll cuando el mouse sale del div
});

