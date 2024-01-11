window.addEventListener('DOMContentLoaded', event => { // escuchador de eventos, con el DOMContentLoaded cuando se cargue el contenido
    
    var animalType_element = document.getElementById('animalType'); // se obtiene el dato ingresado 
    var name_element = document.getElementById("name");
    var gender_element = document.getElementById("gender");
    var years_element = document.getElementById("years");
    var birthDate_element = document.getElementById("birthDate");
    var petOwner_element = document.getElementById("petOwner");
    var characteristicsPet_element = document.getElementById("characteristicsPet");
    var photo_element = document.getElementById("photo");

    const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

    let urlusers = "http://localhost:3000/api/users"; // se hace referencia al origen de los datos 
        fetch(urlusers, { // se hace solicitud a la url
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
            petOwner_element.innerHTML = options;
        }) // se lee el objeto data y se pasa por consola
        .catch(error => console.log(error)) // si existe error que lo atrape con la palabra catch


    const btn = document.getElementById("btn_createPet"); // evento asignado con el id del boton

    function createPet() {  //se obtienen los datos ingresados y se guardan en las variables correspondientes
        
        var animalType = animalType_element.value; //se guarda en la variable el valor ingresado.
        var name = name_element.value;
        var gender = gender_element.value;
        var years = years_element.value;
        var birthDate = birthDate_element.value;
        var characteristicsPet = characteristicsPet_element.value;
        var photo = photo_element.value;

        fetch("http://localhost:3000/api/pets", { //mediante la funcion fetch y el metodo POST
            method: "POST",
            body: JSON.stringify({
                animalType: animalType,
                name: name,
                gender: gender,
                years: years,
                birthDate: birthDate,
                characteristicsPet: characteristicsPet,
                photo: photo
            }),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
                "x-access-token": token
            }
        })
        .then((response) => response.json())
        .then((json) => {
            alert("Mascota creada exitosamente"); //envia mensaje que confirma la creacion del usuario
            console.log(json, 'json');
            location.href = '/index.html';
        })
        .catch(error => console.log(error, 'error'))
    }

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        createPet();
    });
});
