function createConsultation(ch_id, pet_id) {  //se obtienen los datos ingresados y se guardan en las variables correspondientes
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    var reason_element = document.getElementById('reason'); // se obtiene el dato ingresado 
    var symptoms_element = document.getElementById("symptoms");
    var clinicalExamination_element = document.getElementById("clinicalExamination");
    var dx_element = document.getElementById("dx");
    var forecast_element = document.getElementById("forecast");
    var treatment_element = document.getElementById("treatment");

    var reason = reason_element.value;
    var symptoms = symptoms_element.value;
    var clinicalExamination = clinicalExamination_element.value;
    var dx = dx_element.value;
    var forecast = forecast_element.value;
    var treatment = treatment_element.value;

    fetch("http://localhost:3000/api/clinicHistory/consultation", { //mediante la funcion fetch y el metodo POST
        method: "POST",
        body: JSON.stringify({
            chId: ch_id,
            reason: reason,
            symptoms: symptoms,
            clinicalExamination: clinicalExamination,
            dx: dx,
            forecast: forecast,
            treatment: treatment
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "application/json; charset=UTF-8",
            "x-access-token": token
        }
    })
    .then((response) => response.json())
    .then((json) => {
        alert("Consulta registrada creada exitosamente"); //envia mensaje que confirma la creacion del usuario
        console.log(pet_id);
        location.href = '/views/clinicHistory/edit.html?p=' + pet_id;
    })
    .catch(error => console.log(error))
}

window.addEventListener('DOMContentLoaded', event => { // escuchador de eventos, con el DOMContentLoaded cuando se cargue el contenido
    let params = new URLSearchParams(document.location.search);
    let ch_id = params.get("ch");
    let pet_id = params.get("p");

    const btn = document.getElementById("btn_save"); // evento asignado con el id del boton

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        createConsultation(ch_id, pet_id);
    });
});
