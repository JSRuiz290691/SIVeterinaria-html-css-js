window.addEventListener('DOMContentLoaded', event => { // se agresa un listener cuando se carga el contenido de la pg

    const btn = document.getElementById("btn_signin");

    function sendSignIn() { //se crea la funcion que guarda los datos ingresados por el usuario en las respectivas variables 
        
        var email_element = document.getElementById("email");
        var email = email_element.value;
        var password_element = document.getElementById("password");
        var password = password_element.value;
        

        fetch("https://siveterinaria.onrender.com/api/auth/signin", { // mediante la funcion fetch y el metodo post se hace una request al servidor
            method: "POST", //request del metodo fetch
            body: JSON.stringify({ // Stringify convierte un objeto JSON en una cadena de objetos 
                email: email,
                password: password
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json()) // se recibe la respuesta del servidor con el status
        .then((json) => { //recibe los datos de la request 
            // console.log(json);
            if (json.token) { //se verifica si la respuesta envia el token
                document.cookie = "name=" + json.user.name + " " + json.user.lastname + ";path=/"; //se guardan los datos name y lastname en una cookie, para luego mostrarlos cuando se recargue la pg al iniciar seccion
                document.cookie = "token=" + json.token + ";path=/"; //se guardan los datos name y lastname en una cookie, para luego mostrarlos cuando se recargue la pg al iniciar seccion

                document.location.href='/'; // recarga la pagina central con el nombre y apellido del usuario
            } else {
                alert(json.message); // muestra el mensaje que arroja luego de la validacion 
            }
        } )
        .catch(error => console.log(error, 'error'))
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        sendSignIn();
    });
});
