const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

function deleteUser(e) {
    let user_id = e.getAttribute('ref');
    fetch("http://localhost:3000/api/users/" + user_id, {
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8",
            "x-access-token": token
        }
    })
    .then()
    .then(() => {
        alert("Usuario Eliminado exitosamente");
        location.reload();
    })
    .catch(error => console.log(error, 'error'));
}

function goToEdit(e) {
    let user_id = e.getAttribute('ref');
    location.href ='edit.html?u=' + user_id;
}


window.addEventListener('DOMContentLoaded', event => {
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    let url = "http://localhost:3000/api/users"; // se hace referencia al origen de los datos 
    fetch(url, {// se hace solicitud a la url
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json",
            "x-access-token": token
        }
    })
        .then(response => {
            // console.log(response.status);
            if (response.status == 403) {
                alert('Usuario no autorizado');
            } else {
                return response.json();
            }
        }) // recibe la respuesta y la pasa a formato json
        .then(data =>mostrarData(data)) // data recibe la promesa del fetchse lee el objeto data y se pasa por consola
        .catch(error => console.log(error)) // si existe error que lo atrape con la palabra catch

    const mostrarData = (data) => {

        let body = ""; // se asigna una variable vacia donde se guardaran los valores 
        for (var i = 0; i < data.length; i++) { // este ciclo for recorre los usuarios guardados en data del fetch
            let pets = '' 
            for (var j = 0; j < data[i].pets.length; j++) { // recorre las mascotas de cada usuario de data[i]
                pets += `${data[i].pets[j].name}<br />` // += adiciona datos en la variable pets de cada usuario
            }
            
            body+=`<tr><td>${data[i].name}</td>
                <td>${data[i].lastname}</td>
                <td>${data[i].id}</td>
                <td>${data[i].contactNumber}</td>
                <td>${data[i].email}</td>
                <td>${data[i].role.name}</td>
                <td>${pets}</td>
                <td>
                    <button class="btn btn-primary"ref="${data[i]._id}" onclick="goToEdit(this)" type="button">Editar</button>
                    <button class="btn btn-danger" ref="${data[i]._id}" onclick="deleteUser(this)" type="button">Eliminar</button>
                </td>
                <tr>`;
        }
        document.getElementById('data').innerHTML = body;
        
    }

});
