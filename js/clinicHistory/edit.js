function goToInvoice(e) {
    let pet_id = e.getAttribute('ref');
    location.href ='../invoice/create.html?p=' + pet_id;
}

window.addEventListener('DOMContentLoaded', event => { // escuchador de eventos, con el DOMContentLoaded cuando se cargue el contenido
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    var pet_element = document.getElementById('pet'); // se obtiene el dato ingresado 
    var owner_element = document.getElementById("owner");

    let params = new URLSearchParams(document.location.search);
    let pet_id = params.get("p");

    let chId = 0

    let url = "http://localhost:3000/api/clinicHistory/pet/" + pet_id; // se hace referencia al origen de los datos 
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
        } else if (response.status == 404) {
            alert('La mascota no tiene usuario');
        } else {
            return response.json();
        }
    }) // recibe la respuesta y la pasa a formato json
    .then(data => {
        chId = data._id
        pet_element.value = data.pet.name
        owner_element.value = data.owner.name
        let body = "";
        for (var i = 0; i < data.consultations.length; i++) {  // recorre cada uno de los datos de data
            body+=`<tr>
                <td>${i+1}</td>
                <td>${data.consultations[i].reason}</td>
                <td>${data.consultations[i].symptoms}</td>
                <td>${data.consultations[i].clinicalExamination}</td>
                <td>${data.consultations[i].dx}</td>
                <td>${data.consultations[i].forecast}</td>
                <td>${data.consultations[i].treatment}</td>
                <td>
                    <button class="btn btn-info" ref="${data.pet._id}" onclick="goToInvoice(this)" type="button">Factura</button>
                </td>
            <tr>`; // se crea la estructura html de la tabla, y se le asigan una variabel para despues mostrarla. 
        }
        document.getElementById('consultationsData').innerHTML = body;
    }) // se lee el objeto data y se pasa por consola
    .catch(error => console.log(error)) // si existe error que lo atrape con la palabra catch

    const btn = document.getElementById("btn_consult"); // evento asignado con el id del boton

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        location.href ='../consultation/create.html?ch=' + chId + '&p=' + pet_id;
    });
});
