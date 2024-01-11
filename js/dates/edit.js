
var date_element = document.getElementById('date'); // se obtiene el dato ingresado 
var time_element = document.getElementById("time")
var pet_element = document.getElementById("pet_select")
    
function getAppointment(appointment_id, token){
    let url = "http://localhost:3000/api/pets"; // para obtener los datos de mascota y sacar el nombre de las mascotas 
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
        let options = ''; //se crea una variable vacia para asignar el nombre de las mascotas
        for (var i = 0; i < data.length; i++) { // mediante el ciclo for se recorren los datos
            options+=`<option value='${data[i]._id}'>${data[i].name}</option>`// cada option se le asigna el _id al value, y se muestre el name de cada id 
        }
        pet_element.innerHTML = options; // el .innerHTML integra las options en el pet_element
        
    }) // se lee el objeto data y se pasa por consola
    .catch(error => console.log(error)) // si existe error que lo atrape con la palabra catch

    fetch("http://localhost:3000/api/appointment/" + appointment_id, {
        method: "GET",
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json, 'json');
        date_element.value = json.date;
        time_element.value = json.time;
        pet_element.value = json.pet;
    })
    .catch(error => console.log (error))
}

function editAppointment(appointment_id, token){
    let body = {
        date: date_element.value,
        time: time_element.value,
        pet: pet_element.value
    }

    fetch("http://localhost:3000/api/appointment/" + appointment_id, {
        method: "PUT",
        body: JSON.stringify(body),
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            "x-access-token": token
        }
    })
    .then((response) => response.json())

    .then((json) => {
        alert("Cita Actualizada exitosamente");
        console.log(json, 'json');
    })
    .catch(error => console.error('There was an error!', error))
}
window.addEventListener('DOMContentLoaded', event => {
    const tokenValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    console.log(tokenValue);

    let params = new URLSearchParams(document.location.search);
    let appointment_id = params.get("u");
    console.log(appointment_id);
    getAppointment(appointment_id, tokenValue);

    const editBtn = document.getElementById("editBtn");

    editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editAppointment(appointment_id, tokenValue);
    });
});