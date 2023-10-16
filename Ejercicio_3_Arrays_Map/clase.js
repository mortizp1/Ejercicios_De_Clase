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
        
        this._nombre = nombre
        this._apellidos = apellidos
        this._poblacion = poblacion
        this._edad = edad
        this._estudios = estudios
        this._carnet_conducir = carnet_conducir

        let personaString = "Nombre: " + this._nombre + this._apellidos + this._poblacion + this._carnet_conducir
    }

    get Nombre() {
        return this._nombre
    }

    set Nombre(nombre) {
        typeof nombre === 'string'
        ? this._nombre = nombre
        : alert("El nombre debe ser una cadena de texto")
    }

    get Apellidos() {
        return this._apellidos
    }

    set Apellidos(apellidos) {
        typeof apellidos === 'string'
        ? this._apellidos = apellidos
        : alert("Los apellidos deben ser una cadena de texto")
    }

    get Poblacion() {
        return this._poblacion
    }

    set Poblacion(poblacion) {
        typeof poblacion === 'string'
        ? this._poblacion = poblacion
        : alert("La poblacion debe ser una cadena de texto")
    }

    get Carnet() {
        return this._carnet_conducir
    }

    set Carnet(carnet) {
        typeof carnet === 'boolean'
        ? this._carnet = carnet
        : alert("El carnet de conducir debe ser un valor booleano (TRUE/FLASE)")
    }

    
}

const personas = [
    new Persona('Manuel', 'Ortiz', 'Toledo', 29, 'Grado Superior', true),
    new Persona('Maria', 'Lopez', 'Barcelona', 25, 'Carrera', false),
    new Persona('Pedro', 'Garcia', 'Sevilla', 17, 'ESO', true),
];

personas.sort((a, b) => {
    if (a.nombre < b.nombre) {
        return -1;
    }
    if (a.nombre > b.nombre) {
        return 1;
    }
    return 0;
});


for(p of personas) {
    document.write(p.personaString)
}





