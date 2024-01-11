const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

function deleteAppointment(e) {
    let appointment_id = e.getAttribute('ref');
    fetch("http://localhost:3000/api/appointment/" + appointment_id, {
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8",
            "x-access-token": token
        }
    })
    .then()
    .then(() => {
        alert("Cita Eliminada Exitosamente");
        location.reload();
    })
    .catch(error => console.log(error, 'error'));
}

function goToEdit(e) {
    let appointment_id = e.getAttribute('ref');
    location.href ='edit.html?u=' + appointment_id;
}


window.addEventListener('DOMContentLoaded', event => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    let url = "http://localhost:3000/api/appointment"; // se hace referencia al origen de los datos 
    fetch(url, {// se hace solicitud a la url
        headers: {
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
        .then(data =>mostrarData(data)) // se lee el objeto data y se pasa por consola
        .catch(error => console.log(error)) // si existe error que lo atrape con la palabra catch

    const mostrarData = (data) => {

        let body = "";
        for (var i = 0; i < data.length; i++) {
            let petData = data[i].pet;
            let petName = data[i].pet?.name;
            console.log(petData);
            console.log(petName);
            body+=`<tr><td>${data[i].date}</td>
                <td>${data[i].time}</td>
                <td>${petName}</td>
                <td>
                    <button class="btn btn-primary" ref="${data[i]._id}" onclick="goToEdit(this)" type="button">Editar</button>
                    <button class="btn btn-danger" ref="${data[i]._id}" onclick="deleteAppointment(this)" type="button">Eliminar</button>
                </td>
                <tr>`;
        }
        document.getElementById('data').innerHTML = body;
        
    }

});
