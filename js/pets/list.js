const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

function deletePet(e) {
    let pet_id = e.getAttribute('ref');
    fetch("http://localhost:3000/api/pets/" + pet_id, {
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8",
            "x-access-token": token
        }
    })
    .then()
    .then(() => {
        alert("Mascota Eliminada exitosamente");
        location.reload(); // recarga la pagina 
    })
    .catch(error => console.log(error, 'error'));
}

function goToEdit(e) {
    let pet_id = e.getAttribute('ref');
    location.href ='edit.html?u=' + pet_id;
}
function goToClinicHistory(e) {
    let pet_id = e.getAttribute('ref');
    location.href ='../clinicHistory/edit.html?p=' + pet_id;
}


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
    .then(data =>mostrarData(data)) // se lee el objeto data y se pasa por consola
    .catch(error => console.log(error)) // si existe error que lo atrape con la palabra catch

    const mostrarData = (data) => {

        let body = "";
        for (var i = 0; i < data.length; i++) {  // recorre cada uno de los datos de data
            const date = new Date(data[i].birthDate); // se crea una nueva fecha con el string ingresado de la fecha 
            const dateFormate = date.toLocaleDateString('en-GB'); // asigna el formato deacuerdo a un pais (reino unido)
            body+=`<tr>
                <td>${data[i].animalType}</td> 
                <td>${data[i].name}</td>
                <td>${data[i].characteristicsPet}</td>
                <td>${data[i].gender}</td>
                <td>${data[i].years}</td>
                <td>${dateFormate}</td>
                <td><img src='${data[i].photo}'width="200px"/></td>
                <td>
                    <button class="btn btn-primary"ref="${data[i]._id}" onclick="goToEdit(this)" type="button">Editar</button>
                    <button class="btn btn-danger" ref="${data[i]._id}" onclick="deletePet(this)" type="button">Eliminar</button>
                    <button class="btn btn-info" ref="${data[i]._id}" onclick="goToClinicHistory(this)" type="button">Historia Clinica</button>
                </td>
                <tr>`; // se crea la estructura html de la tabla, y se le asigan una variabel para despues mostrarla. 
        }
        document.getElementById('data').innerHTML = body; // evia la estructura html al list.html
        
    }

});
