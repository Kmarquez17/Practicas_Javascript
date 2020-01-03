// Variables

const carrito = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");

//Listener

cargarEventListener();

function cargarEventListener() {
    //Dispara cuando se presiona agregar carrito
    cursos.addEventListener("click", comprarCurso);

    //Cuando se elimina en el carrito
    carrito.addEventListener("click", eliminarCurso);

    //Vaciar todo el carrito
    btnVaciarCarrito.addEventListener("click", vaciarCarrito);

    //Al cargar el documento mostrar el localStorage
    document.addEventListener("DOMContentLoaded", leerLocalStorge);
}

//Funciones
function comprarCurso(e) {
    e.preventDefault();

    //Delegations para agregar carrito
    if (e.target.classList.contains("agregar-carrito")) {
        const curso = e.target.parentElement.parentElement;

        //Enviamos el curso seleccionado para llenar el carrito
        leerDatos(curso);
    }
}

//Lee los datos del curso
const leerDatos = curso => {
    const infoCurso = {
        id: curso.querySelector("a").getAttribute("data-id"),
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent
    };

    insetarCarrito(infoCurso);
};

//Inserta los cursos seleccionado en la lista del carrito
const insetarCarrito = curso => {
    crearColumnaCurso(curso);
    guardarCursoLocalStorage(curso);
};

//Creamos la columna para los cursos agregados al carrito
const crearColumnaCurso = curso => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td> <img src="${curso.imagen}"></td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href='#' class='borrar-curso' data-id='${curso.id}'> X</a>
        </td>
    `;

    listaCursos.appendChild(row);
};

//Elimina el curso del Carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso, cursoId;

    if (e.target.classList.contains("borrar-curso")) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector("a").getAttribute("data-id");
        eliminarLocalStorge(cursoId);
    }
}

//Elimina todos los cursos de la lista
function vaciarCarrito(e) {
    //Recorre cada elemento de la lista
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }

    //Vaciar todo el localStorage
    localStorage.clear();

    return false;
}

//Almacenar el curso en el localstorage
const guardarCursoLocalStorage = curso => {
    let cursos;

    //Toma el valor del locaStorage
    cursos = obtenerCursoLocalStorage();

    //Insertamos al arreglo el nuevo curso seleccionado
    cursos.push(curso);

    localStorage.setItem("cursos", JSON.stringify(cursos));
};

//obtener curso en el localStorage
const obtenerCursoLocalStorage = () => {
    let cursoLS;

    //Comprobamos si hay algo en el localStorage
    if (localStorage.getItem("cursos") === null) {
        cursoLS = [];
    } else {
        cursoLS = JSON.parse(localStorage.getItem("cursos"));
    }

    return cursoLS;
};

//Imprime los curos que estan en el localStorage
function leerLocalStorge() {
    let cursosLS;

    cursoLS = obtenerCursoLocalStorage();

    cursoLS.forEach(curso => {
        crearColumnaCurso(curso);
    });
}

//Eliminar curso guardado en el localStorgae
const eliminarLocalStorge = id => {
    let cursosLS;

    //Obtenemos todos los cursos del localStorgae
    cursosLS = obtenerCursoLocalStorage();

    //Recorremo cada curso para buscar el curso a Eliminar por ID
    cursosLS.forEach((curso, index) => {
        //Si es igual lo sacamos del arreglo
        if ((curso.id = id)) {
            cursosLS.splice(index, 1);
        }
    });

    //Actualizamos el localStorage
    localStorage.setItem("cursos", JSON.stringify(cursosLS));
};