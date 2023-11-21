    
    // Recuperamos todos los elementos que vamos a necesitar del HTML
    const usuariosBtn = document.querySelector('#getUsuarios')
    const postsBtn = document.querySelector('#getPosts')
    const main = document.querySelector('main')
    const datosPersonales = document.querySelector('#datos')


    // Añadimos un evento para que cuando se haga click en el boton 
    // de usuarios se ejecute la funcion accederUsers -> Obtiene un listado de los usuarios
    usuariosBtn.addEventListener('click', (e) => {
        accederUsers()
    })

    // Añadimos un evento para que cuando se haga click en el boton
    // de posts se ejecute la funcion obtenerTodosPosts -> Obtiene un listado de todos los posts
    postsBtn.addEventListener('click', (e) => {
        obtenerTodosPosts()
    })

    // Funcion para obtener los usuarios
    async function accederUsers() {
        // Hacemos la petición a la API
        try {
            const peticion = await fetch('https://jsonplaceholder.typicode.com/users')
            // Si la petición no es correcta, lanzamos un error
            if (!peticion.ok) {
                throw new Error("Error al cargar los usuarios")
            }

            // Obtenemos los datos de la petición
            const data = await peticion.json()
            // Pintamos los usuarios con dicha funcion
            pintarUsers(data)
        } catch (err) {
            console.error(err)
        }
    }

    // Funcion para pintar los usuarios en el HTML con una tabla
    function pintarUsers(data) {
        // Recorremos los datos obtenidos y los pintamos en una tabla
        const filas = data.map(i => {
            return `
            <tr >
                <th class="text-center" scope="row">${i.id}</th>
                <td class="text-center"><a data-id="${i.id}" role="button" class=" datos-usuario">${i.name}</a></td>
                <td class="text-center">${i.username}</td>
                <td class="text-center">${i.email}</td> 
                <td class="text-center"><a data-id="${i.id}" class="btn btn-info mostrar-posts" href="#">Mostrar Posts</a></td>
            </tr>
            `
        })
        // Creamos el HTML de la tabla
        const html = `
            <table class="table table-dark table-hover table-bordered animate__animated animate__fadeIn">
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
        // Pintamos la tabla en el HTML
        main.innerHTML = html

        // Añadimos un evento para que cuando se haga click en el nombre del usuario
        // se muestren los datos del usuario
        document.querySelectorAll('.datos-usuario').forEach(i => {
            i.addEventListener('click', async (e) => {
                // Evitamos que se recargue la página
                e.preventDefault()
                const id = i.getAttribute('data-id')
                // Hacemos la petición a la API
                const datoUsuario = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                // Si la petición no es correcta, lanzamos un error
                if(!datoUsuario.ok) {
                    throw new Error('Error al cargar los datos del usuario')
                }

                // Obtenemos los datos de la petición
                const datosJSON = await datoUsuario.json()

                // Creamos la tabla con los datos del usuario
                const tablaUsuario = `
                    <table id="datosTabla" class="table table-dark table-hover table-bordered animate__animated animate__fadeIn">
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
                // Pintamos la tabla en el HTML
                datosPersonales.innerHTML = tablaUsuario
                // Hacemos scroll automatico hasta la tabla y le añadimos un efecto de animación suave con behavior: "smooth"
                document.getElementById('datosTabla').scrollIntoView({ behavior: "smooth" });
            })
        })

        // Añadimos un evento para que cuando se haga click en el boton de mostrar posts
        // se muestren los posts del usuario
        document.querySelectorAll('.mostrar-posts').forEach(i => {
            i.addEventListener('click', (e) => {
                // Evitamos que se recargue la página
                e.preventDefault()
                // Obtenemos el id del usuario
                const userId = i.getAttribute('data-id')
                // Y ejecutamos la funcion obtenerPosts con el id del usuario
                obtenerPosts(userId)
            })
        })
    }


    // Funcion para obtener los posts de un usuario concreto
    function obtenerPosts(id) {
        // Hacemos la petición a la API
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            // Obtenemos los datos de la petición
            .then(response => response.json())
            // Tratamos los datos obtenidos y los pintamos en una tabla llamando a la funcion pintarPosts
            // que se encarga de eso
            .then(data => {
                pintarPosts(data)
            })
            .catch(err => console.error(err))
    }

    // Funcion para pintar los posts en el HTML con una tabla, el indiceDelPost lo utilizamos para saber
    // en que pagina estamos y poder cambiar de pagina
    let indiceDelPost = 0
    function pintarTodosPosts(posts) {

        // Recorremos los datos obtenidos y los pintamos en una tabla, utilzamos .slice para obtener solo
        // 5 posts por pagina, este metodo recibe dos parametros, el primero es el indice del array donde empieza
        // y el segundo es el indice del array donde termina, por ejemplo, si tenemos un array de 10 elementos
        // y queremos obtener los elementos del 0 al 4, hariamos array.slice(0, 5), por eso utilizamos el indiceDelPost 
        // para saber en que pagina estamos
        const filas = posts.slice(indiceDelPost, indiceDelPost + 5).map(i => {
            return `
            <tr>
                <th class="text-center" scope="row">${i.id}</th>
                <td class="text-center"><a href="#" onclick="mostrarUsuario(${i.userId})">User ${i.userId}</a></td>
                <td class="text-center">${i.title}</td>
                <td class="text-center">${i.body}</td>
            </tr>`  
        })
        // Creamos el HTML de la tabla y le añadimos dos botones para cambiar de pagina, si estamos en la primera
        // pagina el boton de anterior estara desactivado y si estamos en la ultima pagina el boton de siguiente estara
        // desactivado
        const html = `
            <table class="table table-dark table-hover table-bordered animate__animated animate__fadeIn">
                <thead>
                    <tr>
                        <th class="text-center" scope="col">ID</th>
                        <th class="text-center" scope="col">User ID</th>
                        <th class="text-center" scope="col">Title</th>
                        <th class="text-center" scope="col">Body</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas.join('')}
                </tbody>
            </table>
            <!-- Añadimos los botones para cambiar de pagina -->
            <!-- Si estamos en la primera pagina el boton de anterior estara desactivado -->
            <!-- Si estamos en la ultima pagina el boton de siguiente estara desactivado -->
            <!-- Para desactivar un boton solo tenemos que añadirle el atributo disabled -->
            <button ${indiceDelPost === 0 ? 'disabled' : ''} class="btn btn-info mx-auto" onclick="cambiarPagina('anterior', ${posts.length})">Anterior</button>
            <button ${indiceDelPost + 5 >= posts.length ? 'disabled' : ''} class="btn btn-info mx-auto" onclick="cambiarPagina('siguiente', ${posts.length})">Siguiente</button>
        `
        // Pintamos la tabla en el HTML
        main.innerHTML = html
    }

    // Funcion para pintar los posts en el HTML de un usuario concreto sin paginacion
    function pintarPosts(posts) {
        // Recorremos los datos obtenidos y los pintamos en una tabla, utilzamos .map para recorrer el array
        // y crear un nuevo array con los datos que queremos, en este caso, solo queremos el id, el title y el body
        // de cada post
        const filas = posts.map(i => {
            return `
            <tr>
                <th class="text-center" scope="row">${i.id}</th>
                <td class="text-center">${i.title}</td>
                <td class="text-center">${i.body}</td>
            </tr>`
        })
        // Creamos el HTML de la tabla
        const html = `
            <table class="table table-dark table-hover table-bordered">
                <thead>
                    <tr>
                        <th class="text-center" scope="col">#</th>
                        <th class="text-center" scope="col">Title</th>
                        <th class="text-center" scope="col">Body</th>
                    </tr>
                </thead>
                <tbody>
                    ${filas.join('')}
                </tbody>
            </table>
        `
        // Pintamos la tabla en el HTML
        main.innerHTML = html
    }

    // Funcion para cambiar de pagina, recibe dos parametros, el primero es la direccion a la que queremos ir
    // y el segundo es la longitud del array de posts, lo utilizamos para saber cuando no hay mas posts
    // y desactivar el boton de siguiente
    function cambiarPagina(direccion, longPost) {
        // Si la direccion es siguiente y el indice del post + 5 es menor que la longitud del array de posts
        // aumentamos el indice del post en 5 para ir a la siguiente pagina
        if(direccion === 'siguiente' && indiceDelPost + 5 < longPost) {
            indiceDelPost += 5
        } 
        // Si la direccion es anterior y el indice del post es mayor que 0
        // disminuimos el indice del post en 5 para ir a la pagina anterior
        else if(direccion === 'anterior' && indiceDelPost > 0) {
            indiceDelPost -= 5
        }

        // Lamamos a la funcion obtenerTodosPosts para que nos pinte los posts de la pagina a la que hemos ido
        obtenerTodosPosts()
    }

    // Funcion para mostrar los datos de un usuario en concreto
    function mostrarUsuario(id) {
        // Hacemos la petición a la API con el id del usuario
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            // Obtenemos los datos de la petición
            .then(response => response.json())
            // Tratamos los datos obtenidos y los pintamos en una tabla llamando a la funcion pintarDataUser()
            .then(usuario => {
                pintarDataUser(usuario)
            })
            .catch(err => console.error(err))
    }

    // Funcion para pintar los datos de un usuario en concreto en una tabla
    function pintarDataUser(datosJSON) {
        // Creamos la tabla con los datos del usuario
        const tablaUsuario = `
                    <table id="datosTabla" class="table table-dark table-hover table-bordered animate__animated animate__fadeIn">
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
        // Pintamos la tabla en el HTML
        datosPersonales.innerHTML = tablaUsuario
        // Hacemos scroll automatico hasta la tabla y le añadimos un efecto de animación suave con behavior: "smooth"
        document.getElementById('datosTabla').scrollIntoView({ behavior: "smooth" });
    }

    // Funcion para obtener todos los posts
    // Esta funcion es igual que la funcion obtenerPosts(id) pero sin el parametro id
    // y con la url de la API diferente
    function obtenerTodosPosts() {
        // Hacemos la petición a la API
        fetch('https://jsonplaceholder.typicode.com/posts')
            // Obtenemos los datos de la petición
            .then(response => response.json())
            // Tratamos los datos obtenidos y los pintamos en una tabla llamando a la funcion pintarTodosPosts()
            .then(data => {
                pintarTodosPosts(data)
            })
            .catch(err => console.error(err))
    }