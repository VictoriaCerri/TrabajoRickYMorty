//Declaraciones del documento
let divPersonajes = document.getElementById('personajes');
let botonFiltroSinGenero = document.getElementById('filtroSinGenero');
let botonFiltroTodo = document.getElementById('filtroTodos');
let botonFiltroMujeres = document.getElementById('filtroMujeres');
let botonFiltroHombres = document.getElementById('filtroHombres');
let botonFiltroDesconocido = document.getElementById('filtroDesconocido');
let botonSiguientePagina = document.getElementById('siguientePagina');
let botonPrimeraPagina = document.getElementById('primeraPagina');
let botonAnteriorPagina = document.getElementById('anteriorPagina');
let botonUltimaPagina = document.getElementById('ultimaPagina');
let personajesEnEstaPagina = document.getElementById('personajesEnEstaPagina')

// Mis Variables

let totalPersonajes = 0;
let paginaActual = 1;

// Funcion para mostrar los personajes
function mostrarEnElHtml(arrPersonajes) {
    divPersonajes.innerHTML='';
    arrPersonajes.forEach((itemPersonajes)=>{
        divPersonajes.innerHTML+=`<div class="personaje">
                                    <img src=${itemPersonajes.image}>
                                    <h2>Nombre: ${itemPersonajes.name} </h2>
                                    <p>Genero: ${itemPersonajes.gender} </p>
                                    <p>Estado: ${itemPersonajes.status}</p>
                                    <p>Especie: ${itemPersonajes.species}</p>
                                    <p>Ubicacion:${itemPersonajes.location.name}</p>
                                    <p>Origen: ${itemPersonajes.origin.name}</p>
                                    </div>`
    })
    personajesEnEstaPagina.innerHTML =`Personajes en esta pagina : ${arrPersonajes.length}`;
}

// PEDIDO DE FETCH
function pedidoFetch(pagina) {
    fetch("https://rickandmortyapi.com/api/character/?page="+pagina)
    .then((data)=>{
        return data.json();
    }).then((data)=>{
        totalPersonajes = data.results;
        mostrarEnElHtml(totalPersonajes); 
    })
}

pedidoFetch(1);

// Funciones para los filtros
function filtroSinGenero () {
    let sinGenero = totalPersonajes.filter((itemPersonajes)=>{
        return itemPersonajes.gender==='Genderless';
    });
    if(sinGenero.length===0){
        divPersonajes.innerHTML='<p>No hay Sin Genero en esta página</p>'
    } else {
       mostrarEnElHtml(sinGenero); 
    }
}

function filtroMujeres () {
    let mujeres = totalPersonajes.filter((itemPersonajes)=>{
        return itemPersonajes.gender==='Female';
    });
    if(mujeres.length===0){
        divPersonajes.innerHTML='<p>No hay mujeres en esta página</p>'
    } else {
       mostrarEnElHtml(mujeres); 
    }
}

function filtroHombres () {
    let hombres = totalPersonajes.filter((itemPersonajes)=>{
        return itemPersonajes.gender==='Male';
    });
    if(hombres.length===0){
        divPersonajes.innerHTML='<p>No hay hombres en esta página</p>'
    } else {
       mostrarEnElHtml(hombres); 
    }
}

function filtroDesconocido () {
    let desconocido = totalPersonajes.filter((itemPersonajes)=>{
        return itemPersonajes.gender==='unknown';
    });
    if(desconocido.length===0){
        divPersonajes.innerHTML='<p>No hay desconocidos en esta página</p>'
    } else {
       mostrarEnElHtml(desconocido); 
    }
}

function filtroTodo () {
    mostrarEnElHtml(totalPersonajes);
}

//Botones de paginado 
function controlBotones () {
    if(paginaActual===42){
        botonSiguientePagina.disabled=true;
        botonUltimaPagina.disabled=true;
    }else if (paginaActual===1){
        botonAnteriorPagina.disabled=true;
        botonPrimeraPagina.disabled=true;
    }else {
        botonAnteriorPagina.disabled=false;
        botonPrimeraPagina.disabled=false;
        botonSiguientePagina.disabled=false;
        botonUltimaPagina.disabled=false;
    }
}

function siguientePagina () {
    paginaActual++;
    pedidoFetch(paginaActual);
    console.log(paginaActual)
    controlBotones()
}

function anteriorPagina () {
    paginaActual--;
    pedidoFetch(paginaActual);
    console.log(paginaActual)
    controlBotones()
}

function primeraPagina () {
    paginaActual=1;
    pedidoFetch(1);
    console.log(paginaActual)
    controlBotones()
}

function ultimaPagina() {
    paginaActual=42;
    pedidoFetch(42);
    console.log(paginaActual)
    controlBotones()
}

//Eventos de los botones
botonFiltroTodo.addEventListener('click',filtroTodo);
botonFiltroSinGenero.addEventListener('click',filtroSinGenero);
botonFiltroMujeres.addEventListener('click',filtroMujeres);
botonFiltroHombres.addEventListener('click',filtroHombres);
botonFiltroDesconocido.addEventListener('click',filtroDesconocido);
botonSiguientePagina.addEventListener('click',siguientePagina);
botonAnteriorPagina.addEventListener('click',anteriorPagina);
botonPrimeraPagina.addEventListener('click',primeraPagina);
botonUltimaPagina.addEventListener('click',ultimaPagina);

