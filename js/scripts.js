/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    const cookieValue = document.cookie  // se coge el valor de la cookie, el name cuando se haya logueado
                        .split("; ") // arma un array separando la cadena por ; espacio
                        .find((row) => row.startsWith("name=")) // busca en la fila lo que empieza con "name="
                        ?.split("=")[1]; // si lo encuentra toma el valor asignado de name
    console.log(cookieValue);

    const login_link = document.getElementsByClassName("login_link"); // guarda en una variable la referencia al elemento de inicio seccion
    const logged = document.getElementsByClassName("logged"); // se guarda el elemento logged definido en el nav de html
    const welcome_message = document.getElementById("welcome_message");
    const logout = document.getElementById("logout_link");

    if (cookieValue) { // si se guardo 
        welcome_message.innerHTML = "<span>Bienvenido " + cookieValue + "</span>";
        login_link[0].style.display = "none"; //
        for (let i = 0; i < logged.length; i++) { //recorre el array logged
            const element = logged[i]; // le asigna un valor a cada elemento de logged
            element.style.display = "list-item"; // cambia el display para poder mostrarlo 
        }
        /* logged[0].style.display = "list-item"; // se muestran los elementos en el nav
        logged[1].style.display = "list-item"; //
        console.log(logged); */
    }else{
        for (let i = 0; i < logged.length; i++) {
            const element = logged[i];
            element.style.display = "none"
            
        }
        // logged[0].style.display = "none";
        // logged[1].style.display = "none";
        login_link[0].style.display = "list-item";
    }

    logout.addEventListener("click", (e) => {
        console.log('logout');
        e.preventDefault();
        document.cookie = 'name=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.location.href='/';
    });

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});
