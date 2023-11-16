let feedback = document.getElementById('feedback')

document.addEventListener("submit", (e) => {
    let user = document.querySelector('#user').value
    let password = document.querySelector('#password').value
    e.preventDefault()
    verificaUser(user, password)
})

function verificaUser(usr, psswd) {
    let verificado = false;
    
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            data.forEach(i => {
                if(i.email == usr && i.address.zipcode == psswd ) {
                    verificado = true;
                    window.open('blog.html')
                } 
            })
            if(!verificado) {
                feedback.style.display = "block"
            }
        })
        .catch(err => console.error(err))
}



