document
  .querySelector("#generar-nombre")
  .addEventListener("submit", cagarNombre);

//Llamado Ajax e imprimir resultado
function cagarNombre(e) {
  e.preventDefault();

  //Leer variables

  const origen = document.getElementById("origen");
  const origenSeleccionado = origen.options[origen.selectedIndex].value;

  const genero = document.getElementById("genero");
  const generoSeleccionado = genero.options[genero.selectedIndex].value;

  const cantidad = document.getElementById("numero").value;

  let url = "";
  url += `https://uinames.com/api/?`;

  //Si selecciono un origen anexarlo a la url
  if (origenSeleccionado !== "") {
    url += `region=${origenSeleccionado}&`;
  }

  //Si selecciono un genero anexarlo a la url
  if (generoSeleccionado !== "") {
    url += `gender=${generoSeleccionado}&`;
  }

  //Cantidad de nombre
  if (cantidad > 0) {
    url += `amount=${cantidad}&`;
  }

  //Conectar con Ajax
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  //Datos y impresion del template
  xhr.onload = function() {
    if (this.status === 200) {
      console.log(JSON.parse(this.responseText));
      const nombres = JSON.parse(this.responseText);
      //Generar el html
      let html = "<h2>Nombres Generados</h2>";

      html += '<ul class="lista">';

      //Imprimir nombres de la peticion

      nombres.forEach(nombre => {
        html += `
            <li>${nombre.name}</li>
        `;
      });

      html += "</ul>";

      document.getElementById("resultado").innerHTML = html;
    }
  };

  //Enviar el Request
  xhr.send();
}
