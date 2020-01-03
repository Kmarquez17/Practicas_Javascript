/**Variables*/
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("enviar");
const formularioEnviar = document.getElementById("enviar-mail");
const btnReset = document.getElementById("resetBtn");

/**Event Listener*/
eventListener();

function eventListener() {
    //Inicio de la aplicacion y deshabilitar submit
    document.addEventListener("DOMContentLoaded", inicioApp);

    //Campos del formulario
    email.addEventListener("blur", validarCampo);
    asunto.addEventListener("blur", validarCampo);
    mensaje.addEventListener("blur", validarCampo);

    //Boton ennviar en el submit
    formularioEnviar.addEventListener("submit", enviarEmail);

    //Resetear
    btnReset.addEventListener("click", resetFormulario);
}

function inicioApp() {
    //Deshabilitar el envio

    btnEnviar.disabled = true;
}

/**Funciones*/

//Valida los campos no esten vacios
function validarCampo() {
    // Se valida la longitud del texto
    validarLongitud(this);

    let errores = document.querySelectorAll(".error");

    //Si es tipo email validar que lleve arroba(@)
    if (this.type === "email") {
        validarEmail(this);
    }

    if (email.value !== "" && asunto.value !== "" && mensaje.value !== "") {
        if (errores.length === 0) {
            btnEnviar.disabled = false;
        }
    }
}

//Cuando se envia el correo
function enviarEmail(e) {
    e.preventDefault();

    //Activar spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "block";

    //Crear Gif
    const enviado = document.createElement("img");
    enviado.src = "img/mail.gif";
    enviado.style.display = "block";

    //Tiempo
    setTimeout(() => {
        spinner.style.display = "none";
        document.querySelector("#loaders").appendChild(enviado);

        setTimeout(() => {
            enviado.remove();
            resetFormulario();
        }, 4000);
    }, 3000);
}

function resetFormulario(e) {
    e.preventDefault();

    formularioEnviar.reset();
    //console.log(formularioEnviar.children)
    email.style.borderBottomColor = "";
    email.classList.remove("error");

    asunto.style.borderBottomColor = "";
    asunto.classList.remove("error");

    mensaje.style.borderBottomColor = "";
    mensaje.classList.remove("error");
}

//Verifica la longitud del texto en los campo
function validarLongitud(campo) {
    console.log(campo);
    if (campo.value.length > 0) {
        campo.style.borderBottomColor = "green";
        campo.classList.remove("error");
    } else {
        campo.style.borderBottomColor = "red";
        campo.classList.add("error");
    }
}

function validarEmail(campoEmail) {
    const mensaje = campoEmail.value;
    if (mensaje.indexOf("@") !== -1) {
        campoEmail.style.borderBottomColor = "green";
        campoEmail.classList.remove("error");
    } else {
        campoEmail.style.borderBottomColor = "red";
        campoEmail.classList.add("error");
    }
}