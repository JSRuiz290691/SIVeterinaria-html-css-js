const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

var animalType_element = document.getElementById('animalType');
var name_element = document.getElementById("name")
var characteristicsPet_element = document.getElementById("characteristicsPet")
var gender_element = document.getElementById("gender")
var years_element = document.getElementById("years");
var birthDate_element = document.getElementById("birthDate");
var petOwner_element = document.getElementById("petOwner");
var photo_element = document.getElementById("photo");

function getPet(pet_id) { // obtiene los datos segun el id enviado para ser mostrados en el formulario, la info de cada mascota
    fetch("http://localhost:3000/api/pets/" + pet_id, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((response) => response.json())
    .then((json) => {
        console.log(json, 'json');
        animalType_element.value = json.animalType;
        name_element.value = json.name;
        characteristicsPet_element.value = json.characteristicsPet;
        gender_element.value = json.gender;
        years_element.value = json.years;
        birthDate_element.value = json.birthDate;
        photo_element.value = json.photo;
    })
    .catch(error => console.log(error, 'error'))
}

function editPet(pet_id, token) {
    let body = {
        animalType: animalType_element.value,
        name: name_element.value,
        characteristicsPet: characteristicsPet_element.value,
        gender: gender_element.value,
        years: years_element.value,
        birthDate: birthDate_element.value,
        characteristicsPet: characteristicsPet_element.value,
        photo: photo_element.value
    }
    
    fetch("http://localhost:3000/api/pets/" + pet_id, {
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
        alert("Mascota Actualizada exitosamente");
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
    let pet_id = params.get("u");
    console.log(pet_id);
    getPet(pet_id);

    const editBtn = document.getElementById("editBtn");

    editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editPet(pet_id, tokenValue);
    });
});
