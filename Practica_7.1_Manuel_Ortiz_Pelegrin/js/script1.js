// Recuperamos el DIV que contiene el feedback para el usuario
let feedback = document.getElementById('feedback')

// Añadimos un evento de envio para el formulario
document.addEventListener("submit", (e) => {
    // Recuperamos los valores de los campos del formulario
    let user = document.querySelector('#user').value
    let password = document.querySelector('#password').value
    // Evitamos que se envie el formulario
    e.preventDefault()

    if(!user || !password) {
        document.querySelector('#feedback').style.display = "block"
        document.querySelector('#feedback').innerHTML = 'Por favor, rellene todos los campos'
        return
    }
    verificaUser(user, password)
})

function verificaUser(usr, psswd) {
    let verificado = false;

    // Validación del formato del email
    let regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/; // -> RegEx para validar email sacada de https://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=email
    if(!regexEmail.test(usr)) {
        feedback.style.display = "block"
        feedback.innerHTML = 'El formato de email no es válido, acuerdate de poner el @ y el .'
        return
    }

    // Validación del campo de la password
    if(psswd == "") {
        feedback.style.display = "block"
        feedback.innerHTML = 'El campo de la contraseña no puede estar vacío'
        return
    }


    // Hacemos la petición a la API
    fetch('https://jsonplaceholder.typicode.com/users')
        // Obtener los datos de la petición
        .then(response => response.json())
        // Tratar los datos obtenidos
        .then(data => {
            // Recorrer los datos obtenidos y comprobar si el usuario y la contraseña son correctos
            data.forEach(i => {
                // Si son correctos, se abre la página de blog.html
                if(i.email == usr && i.address.zipcode == psswd ) {
                    verificado = true;
                    window.open('blog.html')
                } 
                // Si no son correctos, se muestra un mensaje de error
                // (si no se ha cambiado el valor de verificado, que por defecto en falso, se muestra el mensaje de error)
                if(!verificado) {
                    feedback.style.display = "block"
                    feedback.innerHTML = 'El usuario o la contraseña son incorrectos'
                }
            })
        })
        .catch(err => console.error(err))
}



