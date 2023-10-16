//Preguntamos el numero
const num = prompt("Introduce un número: ")
//Variable para comprobar si lo introducido es un numero (apartado 2)
let esNumero = true

//Verificar si es un número (apartado 2)
isNaN(num) ? esNumero : !esNumero

//Si es numero y el resto de dividirlo entre 2 es 0 --> PAR sino --> IMPAR
esNumero && num % 2 == 0 ?  console.log('Es par') : console.log('Es impar')