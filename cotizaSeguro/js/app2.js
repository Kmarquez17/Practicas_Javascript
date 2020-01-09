const max = new Date().getFullYear(),
  min = max - 20;
//Constructor para seguro
class Seguro {
  constructor(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
  }

  cotizarSeguro() {
    /*
          1 = Americano 1.5
          2 = Asiatico  1.05
          3 = Europeo 1.35
        */

    let cantidad;
    const precioBase = 2000;

    switch (this.marca) {
      case "1":
        cantidad = precioBase * 1.15;
        break;
      case "2":
        cantidad = precioBase * 1.05;
        break;
      case "3":
        cantidad = precioBase * 1.35;
        break;
    }

    // Anio
    const diferencia = max - this.anio;

    //Cada año de diferencia reducir 3%

    cantidad -= (diferencia * 3 * cantidad) / 100;

    /*
          --> Si el seguro es basico se multiplica por 30%
          --> Si el seguro es completo se multiplica por 50%
        */

    if (this.tipo === "basico") {
      cantidad = cantidad * 1.3;
    } else {
      cantidad = cantidad * 1.5;
    }

    return cantidad;
  }
}

//Todo lo que se muestra en la interfaz
class Interfaz {
  //Mensaje que se imprime en el html
  mostrarMensaje(mensaje, tipoError) {
    const div = document.createElement("div");

    if (tipoError === "error") {
      div.classList.add("mensaje", tipoError);
    } else {
      div.classList.add("mensaje", tipoError);
    }

    div.innerHTML = `
      ${mensaje}
    `;

    //Inserta el mensaje antes del fomulario
    formulario.insertBefore(div, document.querySelector(".form-group"));
    setTimeout(() => {
      document.querySelector(".mensaje").remove();
    }, 3000);
  }

  mostrarResultado(seguro, total) {
    const resultado = document.getElementById("resultado");
    let marca;

    switch (seguro.marca) {
      case "1":
        marca = "Americano";
        break;
      case "2":
        marca = "Asiatico";
        break;
      case "3":
        marca = "Europeo";
        break;
    }

    //Crear div
    const div = document.createElement("div");

    div.innerHTML = `
      <p class="header">Tu resumen:</p>
      <p>
        <span>Marca:</span> ${marca}
      </p>
      <p>
        <span>Año:</span> ${seguro.anio}
      </p>
      <p>
        <span>Tipo:</span> ${seguro.tipo}
      </p>
      <p>
        <span>Total:</span> $ ${total}
      </p>
    `;

    const spinner = document.querySelector("#cargando img");
    spinner.style.display = "block";

    setTimeout(() => {
      spinner.style.display = "none";
      resultado.appendChild(div);
    }, 3000);
  }
}

//Event Listener
const formulario = document.getElementById("cotizar-seguro");
formulario.addEventListener("submit", function(e) {
  e.preventDefault();

  //Leer marca seleccionada del select
  const marca = document.getElementById("marca");
  const selectMarca = marca.options[marca.selectedIndex].value;

  //Leer año seleccionada del select
  const anio = document.getElementById("anio");
  const selectAnio = anio.options[anio.selectedIndex].value;

  //Leer el valor del radio button
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  //Crear Instancia de interfaz
  const interfaz = new Interfaz();

  //Revisamos que los campos no esten vacios

  if (selectMarca === "" || selectAnio === "" || tipo === "") {
    //Intefaz imprimiendo un error
    interfaz.mostrarMensaje("Faltan datos para complentar la acción", "error");
  } else {
    //Limpiar resultados anteriores
    const resultados = document.querySelector("#resultado div");
    console.log(resultados);
    if (resultados !== null) {
      resultados.remove();
    }
    //Instanciar seguros y mostrar interfaz
    const seguro = new Seguro(selectMarca, selectAnio, tipo);

    //Cotizar seguro
    const cantidad = seguro.cotizarSeguro();

    //Mostrar Interfaz
    interfaz.mostrarResultado(seguro, cantidad);
    interfaz.mostrarMensaje("Cotizando...", "correcto");
  }
});

const selectAnios = document.getElementById("anio");

for (let i = max; i > min; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  selectAnios.appendChild(option);
}
