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

const mapPersona = new Map([
    ["03940032K", persona1],
    ["05728943F", persona2],
    ["93647712J", persona3]
])

const mapOrdenadoPorDni = new Map([...mapPersona.entries()].sort());
const mapOrdenadoPorEdad = new Map([...mapPersona.entries()].sort((a, b) => {
    const edadA = a[1].Edad
    const edadB = b[1].Edad
    return edadA - edadB
}))

const rellenarTabla = () => {
    const cuerpo = document.getElementById('tabla-persona')
    mapOrdenadoPorEdad.forEach((persona, dni) => {
        const fila = document.createElement('tr')
        fila.innerHTML = `
            <td>${dni}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellidos}</td>
            <td>${persona.poblacion}</td>
            <td>${persona.Edad}</td>
            <td>${persona.Estudios}</td>
        `
        cuerpo.appendChild(fila)
    })
}

rellenarTabla()
