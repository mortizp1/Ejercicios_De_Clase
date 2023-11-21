    const usuariosBtn = document.querySelector('#getUsuarios')
    const postsBtn = document.querySelector('#getPosts')
    const main = document.querySelector('main')
    const datosPersonales = document.querySelector('#datos')


    usuariosBtn.addEventListener('click', (e) => {
        accederUsers()
    })

    postsBtn.addEventListener('click', (e) => {
        obtenerTodosPosts()
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
                <td class="text-center"><a data-id="${i.id}" class="btn btn-info mostrar-posts" href="#">Mostrar Posts</a></td>
            </tr>
            `
        })
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

                datosPersonales.innerHTML = tablaUsuario
                document.getElementById('datosTabla').scrollIntoView({ behavior: "smooth" });
            })
        })

        document.querySelectorAll('.mostrar-posts').forEach(i => {
            i.addEventListener('click', (e) => {
                e.preventDefault()
                const userId = i.getAttribute('data-id')
                obtenerPosts(userId)
            })
        })
    }



    function obtenerPosts(id) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(response => response.json())
            .then(data => {
                pintarPosts(data)
            })
            .catch(err => console.error(err))
    }

    let indiceDelPost = 0
    function pintarTodosPosts(posts) {
        const filas = posts.slice(indiceDelPost, indiceDelPost + 5).map(i => {
            return `
            <tr>
                <th class="text-center" scope="row">${i.id}</th>
                <td class="text-center"><a href="#" onclick="mostrarUsuario(${i.userId})">User ${i.userId}</a></td>
                <td class="text-center">${i.title}</td>
                <td class="text-center">${i.body}</td>
            </tr>`  
        })
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
            <button ${indiceDelPost === 0 ? 'disabled' : ''} class="btn btn-info mx-auto" onclick="cambiarPagina('anterior', ${posts.length})">Anterior</button>
            <button ${indiceDelPost + 5 >= posts.length ? 'disabled' : ''} class="btn btn-info mx-auto" onclick="cambiarPagina('siguiente', ${posts.length})">Siguiente</button>
        `
        main.innerHTML = html
    }

    function pintarPosts(posts) {
        const filas = posts.map(i => {
            return `
            <tr>
                <th class="text-center" scope="row">${i.id}</th>
                <td class="text-center">${i.title}</td>
                <td class="text-center">${i.body}</td>
            </tr>`
        })
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
        main.innerHTML = html
    }

    function cambiarPagina(direccion, longPost) {
        if(direccion === 'siguiente' && indiceDelPost + 5 < longPost) {
            indiceDelPost += 5
        } else if(direccion === 'anterior' && indiceDelPost > 0) {
            indiceDelPost -= 5
        }

        obtenerTodosPosts()
    }

    function mostrarUsuario(id) {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => response.json())
            .then(usuario => {
                pintarDataUser(usuario)
            })
            .catch(err => console.error(err))
    }

    function pintarDataUser(datosJSON) {
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
        datosPersonales.innerHTML = tablaUsuario
        document.getElementById('datosTabla').scrollIntoView({ behavior: "smooth" });
    }

    function obtenerTodosPosts() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                pintarTodosPosts(data)
            })
            .catch(err => console.error(err))
    }