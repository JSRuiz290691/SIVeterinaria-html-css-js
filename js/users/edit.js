const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

var name_element = document.getElementById('name');
var lastname_element = document.getElementById('lastname');
var id_element = document.getElementById('id');
var contactNumber_element = document.getElementById("contactNumber")
var email_element = document.getElementById('email');
var password_element = document.getElementById('password');
var role_element = document.getElementById('role');
var pets_element = document.getElementById('pets');

function getUser(user_id) {
    fetch("http://localhost:3000/api/users/" + user_id, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json, 'json');
        name_element.value = json.name;
        lastname_element.value = json.lastname;
        id_element.value = json.id;
        contactNumber_element.value = json.contactNumber;
        email_element.value = json.email;
        //role_element.value = json.role;
        //pets_element.value = json.pets;
    })
    .catch(error => console.log(error, 'error'))

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
}

function editUser(user_id, token) {
    const selectedPets = [];

    for (const option of pets_element.options) {
        if (option.selected) {
            selectedPets.push(option.value);
        }
    }
    let body = {
        name: name_element.value,
        lastname: lastname_element.value,
        id: id_element.value,
        contactNumber: contactNumber.value,
        email: email_element.value,
        role: role_element.value,
        pets: selectedPets
    }
    if (password_element.value) {
        body.password = password_element.value;
    }
    fetch("http://localhost:3000/api/users/" + user_id, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            "x-access-token": token
        }
    })
    .then((response) => response.json())
    .then((json) => {
        alert("Usuario Actualizado exitosamente");
        console.log(json, 'json');
    } )
    .catch(error => console.error('There was an error!', error))
}

window.addEventListener('DOMContentLoaded', event => {
    
    const tokenValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    console.log(tokenValue);

    let params = new URLSearchParams(document.location.search);
    let user_id = params.get("u");
    console.log(user_id);
    getUser(user_id);

    const editBtn = document.getElementById("editBtn");

    editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editUser(user_id, tokenValue);
    });
});
