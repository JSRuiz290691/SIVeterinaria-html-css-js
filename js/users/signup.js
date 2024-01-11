const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];

var pets_element = document.getElementById("pets");
window.addEventListener('DOMContentLoaded', event => {

    let url = "http://localhost:3000/api/pets"; // se hace referencia al origen de los datos 
    fetch(url, { // se hace solicitud a la url
        headers: { // cuando no se asigna metodo, por descarte toma GET
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            "x-access-token": token
        }
    })
    .then(response => {
        console.log(response.status);
        if (response.status == 403) {
            alert('Usuario no autorizado');
        } else {
            return response.json();
        }
    }) // recibe la respuesta y la pasa a formato json
    .then(data => {
        let options = ''; 
        for (var i = 0; i < data.length; i++) {
            options+=`<option value='${data[i]._id}'>${data[i].name}</option>`
        }
        pets_element.innerHTML = options;
    }) // se lee el objeto data y se pasa por consola
    .catch(error => console.log(error)) // si existe error que lo atrape con la palabra catch

    const btn = document.getElementById("btn_signup");

    function sendSignUp() {  //se obtienen los datos ingresados y se guardan en las variables correspondientes
        var name_element = document.getElementById('name');
        var name = name_element.value;
        var lastname_element = document.getElementById("lastname")
        var lastname = lastname_element.value;
        var id_element = document.getElementById("id")
        var id = id_element.value;
        var contactNumber_element = document.getElementById("contactNumber")
        var contactNumber = contactNumber_element.value;
        var email_element = document.getElementById("email");
        var email = email_element.value;
        var password_element = document.getElementById("password");
        var password = password_element.value;
        var role_element = document.getElementById("role");
        var role = role_element.value;        
        var pets = pets_element.value;
        console.log(pets)
        fetch("http://localhost:3000/api/auth/signup", { //mediante la funcion fetch y el metodo POST
            method: "POST",
            body: JSON.stringify({
                name: name,
                lastname: lastname,
                id: id,
                contactNumber: contactNumber,
                email: email,
                password: password,
                role: role,
                pets: pets
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            
            alert(json.message ); //envia mensaje que confirma la creacion del usuario
            console.log(json, 'json');
            location.href = '/index.html';
        } )
        .catch(error => console.log(error, 'error'))
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        sendSignUp();
    });
});
