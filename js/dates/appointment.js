window.addEventListener('DOMContentLoaded', event => { // escuchador de eventos, con el DOMContentLoaded cuando se cargue el contenido
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    var date_element = document.getElementById('date'); // se obtiene el dato ingresado 
    var time_element = document.getElementById("time")
    var pet_element = document.getElementById("pet_select")

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
        pet_element.innerHTML = options;
    }) // se lee el objeto data y se pasa por consola
    .catch(error => console.log(error)) // si existe error que lo atrape con la palabra catch

    const btn = document.getElementById("btn_appointment"); // evento asignado con el id del boton

    function createAppointment() {  //se obtienen los datos ingresados y se guardan en las variables correspondientes
        var date = date_element.value;
        var time = time_element.value;
        var pet = pet_element.value;

        fetch("http://localhost:3000/api/appointment", { //mediante la funcion fetch y el metodo POST
            method: "POST",
            body: JSON.stringify({
                date: date,
                time: time,
                pet: pet
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            alert("Cita creada exitosamente"); //envia mensaje que confirma la creacion del usuario
            console.log(json, 'json');
            location.href = '/index.html';
        })
        .catch(error => console.log(error, 'error'))
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        createAppointment();
    });
});
