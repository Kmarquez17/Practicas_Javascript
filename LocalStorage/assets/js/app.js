//Variables
const listarTweets = document.getElementById("lista-tweets");

//Eventos
eventListener();

function eventListener() {
  //Cuando se envia el formulario

  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweets);

  //borrarTweets
  listarTweets.addEventListener("click", borrarTweets);

  //Contenido cargados
  document.addEventListener("DOMContentLoaded", listarLocalStorage);
}

/**Funciones**/

//Crear enlace de la lista tweets
function crearEnlace(tweet) {
  //Crear boton eliminar
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.textContent = "X";

  //Crear elemento lista
  const li = document.createElement("li");
  li.innerText = tweet;
  li.appendChild(botonBorrar);

  //Lo añadimos a la lista
  listarTweets.appendChild(li);
}

//Agregar tweet
function agregarTweets(e) {
  e.preventDefault();

  //Leer valor
  const tweet = document.getElementById("tweet").value;

  if (tweet.trim() === "") {
    alert("Texto vacio...!");
    return;
  }
  crearEnlace(tweet);

  //Agregar al localStorage
  agregarLocalStorage(tweet);

  //Vaciar textarea
  document.getElementById("tweet").value = "";
}

//Eliminar tweet
function borrarTweets(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    eliminarLocalStorage(e.target.parentElement.innerText);
    alert("Tweets Eliminado ");
  }
}

//Listar los tweets alamacenado en el localStorage
function listarLocalStorage() {
  let tweets;
  tweets = obtenetTweet();
  tweets.forEach(function(tweet) {
    crearEnlace(tweet);
  });
}

//Agregar al LocalStorage
function agregarLocalStorage(tweet) {
  let tweets;

  //Consultamos los tweets alamcenados
  tweets = obtenetTweet();
  //Añadir el nuevo tweets
  tweets.push(tweet);

  //Convertir de arreglo para localStorage
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Eliminar tweet del localStorage
function eliminarLocalStorage(tweet) {
  debugger;
  let tweets, tweetBorrar;

  tweetBorrar = tweet.substring(0, tweet.length - 1);
  tweets = obtenetTweet();

  tweets.forEach(function(tweet, index) {
    if (tweet === tweetBorrar) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}

length;

//Comprobas los elementos en el localStorage
function obtenetTweet() {
  let tweets;
  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }

  return tweets;
}
