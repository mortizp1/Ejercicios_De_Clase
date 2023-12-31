class Persona {
    constructor(nombre, apellidos, poblacion, edad, estudios, carnet_conducir) {
        if(
            typeof nombre != 'string' ||
            typeof apellidos != 'string' ||
            typeof poblacion != 'string' ||
            typeof edad != 'number' ||
            typeof estudios != 'string' ||
            typeof carnet_conducir != 'boolean') {
            alert('Error: Los tipos de atributos no son correctos.');
            return;
        }
        
        this.nombre = nombre
        this.apellidos = apellidos
        this.poblacion = poblacion

        // *** Atributos privados ***
        this._edad = edad
        this._estudios = estudios

        this.carnet_conducir = carnet_conducir
    }

    get Edad(){
        return this._edad
    }

    set Edad(edad){
        return this._edad = edad
    }

    get Estudios() {
        return this._estudios
    }

    set Estudios(estudios) {
        this._estudios = estudios
    }

    //toString con nombre, apellidos, poblacion, edad, estudios, carnet_conducir
    toString() {
        return `Nombre: ${this.nombre} <br>Apellidos: ${this.apellidos} 
                <br>Poblacion: ${this.poblacion} <br>Edad: ${this._edad} 
                <br>Estudios: ${this._estudios} <br>Carnet de conducir: ${this.carnet_conducir}`
    }
    
}

//Objetos persona
let persona1 = new Persona('Maria', 'Lopez', 'Barcelona', 25, 'Carrera', false)
let persona2 = new Persona('Manuel', 'Ortiz', 'Toledo', 19, 'Grado Superior', true)
let persona3 = new Persona('Pedro', 'Garcia', 'Sevilla', 17, 'ESO', true)

//Array de objetos
const personas = [
   persona1,
   persona2,
   persona3
];

// Ordenar por nombre
personas.sort((a, b) => {
    if (a.nombre < b.nombre) {
        return -1;
    }
    if (a.nombre > b.nombre) {
        return 1;
    }
    return 0;
});

// Imprimir array con el metodo toString()
for(p of personas) {
    document.write(p.toString())
    document.write('<br><br>')
}







