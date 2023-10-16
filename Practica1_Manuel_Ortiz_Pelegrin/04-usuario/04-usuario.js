// Pedir correo al usuario
let correo = prompt("Introduce el correo: ")

// Dividir el correo antes del @
let troceado = correo.split("@")

// Como split devuelve un array, empezamos a quitar espacios desde la posicion 0
let nombreUsuario = troceado[0].trim()

// Imprimimos el nombre del usuario sin espacios y troceado
console.log(nombreUsuario)