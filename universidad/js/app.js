// Eliminar de Local Storage
localStorage.clear();

let enlace = document.querySelectorAll('#principal a:nth-child(odd)')

let a = Array.from(enlace)

a.forEach((enlaces) => {
    console.log(enlaces)
})