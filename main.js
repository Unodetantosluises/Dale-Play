const sesionI = document.querySelector('.nav-link-CS')

const verUsuario = user => {
    if (user) {
        sesionI.forEach(link => link.style.display = 'none');
    }else{
        sesionI.forEach(link => link.style.display = 'block');
    }
};

var modalLinkR = document.querySelector('.btn-rs');
var modalLinkI = document.querySelector('.btn-is');
var modalClR = document.querySelector('.modal-clR');
var modalClI = document.querySelector('.modal-clI');
var modalCr = document.querySelector('.modal-cerrar-r');
var modalCi = document.querySelector('.modal-cerrar-i');

modalLinkR.addEventListener('click', function () {
    modalClR.classList.add('cl-active');
});

modalLinkI.addEventListener('click', function (){
    modalClI.classList.add('cl-active');
});

modalCr.addEventListener('click', function () {
    modalClR.classList.remove('cl-active');
});

modalCi.addEventListener('click', function () {
    modalClI.classList.remove('cl-active');
});

// Registro
const registroF = document.querySelector('#signup-form');
registroF.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector('#sp-correo').value;
    const password = document.querySelector('#sp-contraseña').value;

    auth
    .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {

            signup-form.reset();

            console.log('registrado!')
        })
})

//Inicio de Sesion
const inicioF = document.querySelector('#login-form');
inicioF.addEventListener("submint", e => {
    const email = document.querySelector('#lg-correo').value;
    const password =document.querySelector('#login-password').value;
    
    auth
    .signInWithEmailAndPassword(email, password)
        .then(userCredential => {

            login-form.reset();

            $('#login-form').form('hide')

            console.log('Inicia Sesion!')
        })
})

//Cerrar Sesion
const cerrarS = document.querySelector('#cerrar-sesion');

cerrarS.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('Cerrar Sesion')
    })
})


//Catalogo
const publi = document.querySelector('#publicacion');
const hacerPubli= data => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const catalogo = doc.data()
            const li =`
            <li class = "list-group-item list-group-item-action">
                <h2>${catalogo.Titulo}</h2>
                <p>${catalogo.Descripcion}</p>
                <p>${catalogo.Calificacion}</p>
                <p>${catalogo.Año}</p>
            </li>
        `;
        html += li;
    });
    postList.innerHTML = html;
    } else {
        postList.innerHTML = '<p class = "text-center">Inicia Sesion para Publicar</p>';
    }
}



//Eventos
auth.onAuthStateChanged(user =>{
    if (user){
        fs.collection('catalogo')
        .get()
        .then((snapshot) => {
            hacerPubli(snapshot.docs)
            verUsuario(user);
        })
    } else {
        hacerPubli([])
        verUsuario(user);
    }
})

