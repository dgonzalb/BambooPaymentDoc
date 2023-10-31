function onPage404Load() {
    loadIcons();
    document.querySelector('h1').style.display = 'none';
    const currentUrl = window.location.href;
    if(!currentUrl.includes("/en/") && !currentUrl.includes("/es/") && !currentUrl.includes("/pt/")) {  
        var anchor = "";
        var pathName = window.location.pathname.substring(1);
        var host = currentUrl.replace(pathName, "");
        if(currentUrl.includes("#")) {
            anchor = "#" + currentUrl.split("#")[1];
            host = host.replace(anchor, "");
        }
        var splitPathName = pathName.split("/");
        pathName = pathName.replace(splitPathName[0], "");
        var newUrl = host+splitPathName[0]+"/en"+pathName+anchor;
        window.location.href = newUrl;
    } else {
        var homeLink = document.getElementsByClassName("navbar-brand")[0];
        var barLinks = document.getElementsByClassName("nav-link");
        var language = "/en";
        if(currentUrl.includes("/es/")) {
            language = "/es";
            document.getElementById("navbarDropdown").innerText = "Español";
            document.getElementById("page-not-found").innerText = "Página no encontrada";
            document.getElementById("404paragraph").innerText = "Lo siento, la página que está buscando no existe.";
            document.getElementById("404link").innerText = "Volver a la página de inicio";
        } else if(currentUrl.includes("/pt/")) {
            language = "/pt";
            document.getElementById("navbarDropdown").innerText = "Português";
            document.getElementById("page-not-found").innerText = "Página não encontrada";
            document.getElementById("404paragraph").innerText = "Desculpe, a página que você está procurando não existe.";
            document.getElementById("404link").innerText = "Voltar para a página inicial";
        } 
        homeLink.href = "/public" + language
        document.getElementById("404link").href = homeLink.href;
        barLinks[0].href = homeLink.href + "/docs.html";
        barLinks[1].href = homeLink.href + "/payouts.html";
        
    }
}

function onHomePageLoad() {
    loadIcons();
    document.querySelector('h1').style.display = 'none';
}

function loadIcons() {
    var head = document.head || document.getElementsByTagName('head')[0];

    var links = head.querySelectorAll('link');

    links.forEach(function(link) {
        if (link.getAttribute('href').includes('style.css?')) {
            link.parentNode.removeChild(link);
        }
    });
    
    var faviconLink1 = document.createElement('link');

    faviconLink1.rel = 'shortcut icon'; 
    faviconLink1.href = 'https://bamboopaymentsystems.com/wp-content/uploads/2021/10/cropped-favicon-32x32.png'; 

    head.appendChild(faviconLink1);
    
    var faviconLink2 = document.createElement('link');

    faviconLink2.rel = 'apple-touch-icon'; 
    faviconLink2.href = 'https://bamboopaymentsystems.com/wp-content/uploads/2021/10/cropped-favicon-32x32.png';
    faviconLink2.sizes = '180x180';

    head.appendChild(faviconLink2);
    
    var faviconLink3 = document.createElement('link');

    faviconLink3.rel = 'icon'; 
    faviconLink3.href = 'https://bamboopaymentsystems.com/wp-content/uploads/2021/10/cropped-favicon-32x32.png'; 

    head.appendChild(faviconLink3);
    
    var fontLink = document.createElement('link');

    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&amp;display=swap';

    head.appendChild(fontLink);
    
    var cssLink = document.createElement('link');
    
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = '/public/css/custom.css'; 

    head.appendChild(cssLink);
        
}