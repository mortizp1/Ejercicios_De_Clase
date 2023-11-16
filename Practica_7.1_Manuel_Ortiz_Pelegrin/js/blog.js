const usuariosBtn = document.querySelector('#getUsuarios')
const postsBtn = document.querySelector('#getPosts')
const main = document.querySelector('main')
const datosPersonales = document.querySelector('#datos')


usuariosBtn.addEventListener('click', (e) => {
    accederUsers()
})

async function accederUsers() {
    try {
        const peticion = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!peticion.ok) {
            throw new Error("Error al cargar los usuarios")
        }

        const data = await peticion.json()
        pintarUsers(data)
    } catch (err) {
        console.error(err)
    }
}

function pintarUsers(data) {
    const filas = data.map(i => {
        return `
         <tr >
             <th class="text-center" scope="row">${i.id}</th>
             <td class="text-center"><a data-id="${i.id}" role="button" class=" datos-usuario">${i.name}</a></td>
             <td class="text-center">${i.username}</td>
             <td class="text-center">${i.email}</td> 
             <td class="text-center"><a class="btn btn-info" href="#">Mostrar Posts</a></td>
         </tr>
         `
     })
     const html = `
         <table class="table table-dark table-hover table-bordered">
             <thead>
                 <tr>
                     <th class="text-center" scope="col">#</th>
                     <th class="text-center" scope="col">Name</th>
                     <th class="text-center" scope="col">Username</th>
                     <th class="text-center" scope="col">Email</th>
                     <th class="text-center" scope="col">Posts</th>
                 </tr>
             </thead>
             <tbody>
                 ${filas.join('')}
             </tbody>
         </table>
     `
     main.innerHTML = html

     document.querySelectorAll('.datos-usuario').forEach(i => {
         i.addEventListener('click', async (e) => {
             e.preventDefault()
             const id = i.getAttribute('data-id')
             const datoUsuario = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
             if(!datoUsuario.ok) {
                 throw new Error('Error al cargar los datos del usuario')
             }

             const datosJSON = await datoUsuario.json()

             const tablaUsuario = `
                 <table id="datosTabla" class="table table-dark table-hover table-bordered">
                 <tr>
                     <th>ID</th>
                     <td>${datosJSON.id}</td>
                 </tr>
                 <tr>
                     <th>Name</th>
                     <td>${datosJSON.name}</td>
                 </tr>
                 <tr>
                     <th>Username</th>
                     <td>${datosJSON.username}</td>
                 </tr>
                 <tr>
                     <th>Email</th>
                     <td>${datosJSON.email}</td>
                 </tr>
                 <tr>
                     <th>Street</th>
                     <td>${datosJSON.address.street}</td>
                 </tr>
                 <tr>
                     <th>Suite</th>
                     <td>${datosJSON.address.suite}</td>
                 </tr>
                 <tr>
                     <th>City</th>
                     <td>${datosJSON.address.city}</td>
                 </tr>
             </table>
             `

             datosPersonales.innerHTML = tablaUsuario
             document.getElementById('datosTabla').scrollIntoView({ behavior: "smooth" });
         })
     })
}

