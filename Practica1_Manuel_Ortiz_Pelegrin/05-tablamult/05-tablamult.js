// Apartado 1: Se pide un numero y se saca la tabla de multiplicar
let numero = prompt("Introduce un numero: ")


// Si el numero es un numero y mayor que cero, entonces se hace el bucle
if (!isNaN(numero) && numero >= 0 ) {

    // Apartado 1: Se saca la tabla con un bucle for.
    // Bucle: i comienza en 1, el bucle se repite hasta 10 y por cada iteración aumenta 1
    for (let i = 1; i <= 10; i++) {
        // Se imprime la tabla de multiplicar
        console.log(numero + ' x ' + i + ' = ' + numero * i)
    }
} 
// Si no, te sale el warn
else {

    console.warn("No has introducido un numero o el numero introducido es negativo")
}