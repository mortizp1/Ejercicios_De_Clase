const texto = document.getElementById('input')
const template = document.getElementById('temp')
const lista = document.getElementById('lista-tareas')
const form = document.getElementById('formulario')


form.addEventListener('submit', crearTarea)


function crearTarea(evento) {
    evento.preventDefault()
    const tareaTexto = texto.value.trim()

    if(tareaTexto != '') {
        const nuevaTarea = template.content.cloneNode(true)
        nuevaTarea.querySelector('p').textContent = tareaTexto
        lista.appendChild(nuevaTarea)
        texto.value = ''
    }    
}

lista.addEventListener('click', (e) => {
    if(e.target.classList.contains("fa-times-circle")){
        eliminarTarea(e.target)
    } else if(e.target.classList.contains("fa-check-circle")) {
        marcarComoHecha(e.target)
    }
})

function eliminarTarea(botonQuitar) {
    const elementoTarea = botonQuitar.parentElement.parentElement
    elementoTarea.remove()
}

function marcarComoHecha(botonHecho) {
    const elementoTarea = botonHecho.parentElement.parentElement
    elementoTarea.classList.remove("alert-warning")
    elementoTarea.classList.add("alert-success")
    botonHecho.remove()
}



