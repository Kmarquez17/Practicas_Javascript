/*Varibles*/
const presupuestoSemanal = prompt("Cual es tu presupuesto Semanal?");
let cantidadPresupuesto;

const formulario = document.getElementById("agregar-gasto");

/*Clases*/

//Presupuesto
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }

  //Metodo para ir restanto al presupuesto actual

  presupuestoRestante(cantidad = 0) {
    return (this.restante -= Number(cantidad));
  }
}
//Interfaz
class Interfaz {
  insertarPresupuesto(cantidad) {
    const presupuestoUI = document.querySelector("span#total");
    const restanteUI = document.querySelector("span#restante");

    console.log(presupuestoUI);

    presupuestoUI.innerHTML = `${cantidad}`;
    restanteUI.innerHTML = `${cantidad}`;
  }

  //Imprimir mensaje dependiendo de su tipo
  imprimirMsj(mensaje, tipo) {
    const divMsj = document.createElement("div");
    divMsj.classList.add("text-center", "alert");
    if (tipo === "error") {
      divMsj.classList.add("alert-danger");
    } else {
      divMsj.classList.add("alert-success");
    }

    divMsj.appendChild(document.createTextNode(mensaje));

    //Insertar en el DOM
    document.querySelector(".primario").insertBefore(divMsj, formulario);
    setTimeout(() => {
      document.querySelector(".primario .alert").remove();
    }, 3000);
  }

  //Insertando gasto a un listado
  agregarGastoListado(nombre, cantidad) {
    const listado = document.querySelector("#gastos ul");
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    //Agregar a la lista
    li.innerHTML = `
        ${nombre}
        <span class="badge badge-primary badge-pill">$ ${cantidad}</span> 
    `;

    listado.appendChild(li);
  }
  //Comprueba el presupuesto restante
  presupuestoRestante(cantidad) {
    const restanteUI = document.querySelector("span#restante");
    console.log(restanteUI);

    const resto = cantidadPresupuesto.presupuestoRestante(cantidad);

    restanteUI.innerHTML = `${resto}`;

    this.comprobarPresupuesto();
  }

  //Cambiar el color el presupuesto restante
  comprobarPresupuesto() {
    const presupuestoTotal = cantidadPresupuesto.presupuesto;
    const presupuestoRestante = cantidadPresupuesto.restante;

    if (presupuestoTotal / 4 > presupuestoRestante) {
      const restante = document.querySelector(".restante");
      console.log(restante);
      restante.classList.remove("alert-success", "alert-warning");
      restante.classList.add("alert-danger");
    } else if (presupuestoTotal / 2 > presupuestoRestante) {
      const restante = document.querySelector(".restante");
      restante.classList.remove("alert-success");
      restante.classList.add("alert-warning");
    }
  }
}

/*Event Listener*/

document.addEventListener("DOMContentLoaded", () => {
  if (
    presupuestoSemanal === null ||
    presupuestoSemanal === "" ||
    Number(presupuestoSemanal) <= 0
  ) {
    window.location.reload();
  } else {
    //Intanciar un presupuesto
    cantidadPresupuesto = new Presupuesto(presupuestoSemanal);
    //Intanciar la clase interfaz
    const UI = new Interfaz();
    UI.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }
});

//
formulario.addEventListener("submit", e => {
  e.preventDefault();

  //leer en el formulario
  const nombreGasto = document.querySelector("#gasto").value;
  const cantidadGasto = document.querySelector("#cantidad").value;

  const UI = new Interfaz();

  //Que lo campos no este vacio
  if (nombreGasto === "" || cantidadGasto === "") {
    UI.imprimirMsj("Los campos no deben estar vacios", "error");
  } else {
    UI.imprimirMsj("Se agrego el gasto correctamente", "correcto");
    UI.agregarGastoListado(nombreGasto, cantidadGasto);
    UI.presupuestoRestante(cantidadGasto);
  }
});
