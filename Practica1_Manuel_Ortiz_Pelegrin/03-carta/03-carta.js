// Variables necesarias para completar el texto
let nombre = prompt("Nombre: ")
let curso = prompt("Curso: ")
let localidad = prompt("Localidad: ")
let fecha_inicio = prompt("Fecha de inicio: ")
let fecha_fin = prompt("Fecha de fin: ")


// Carta completada con el contenido de las variables, eliminando los espacios con trim().
console.log(`Estimado ${nombre.trim()}, 
\n\nBienvenido al curso de ${curso.trim()} que se celebrará en la localidad de ${localidad.trim()} entre 
las fechas ${fecha_inicio.trim()} y ${fecha_fin.trim()}. Espero que el curso se desarrolle según sus 
expectativas. Estaremos encantados de atenderle
\n\nAtentamente,
\nLa dirección`)