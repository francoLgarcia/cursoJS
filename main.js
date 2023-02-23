
// Clases

class Reserva {
    constructor(pelicula, horario,sucursal) {
        this.pelicula = pelicula;
        this.horario = horario;
        this.sucursal = sucursal;
    }
}

// Función

function eliminarPelicula(reserva) {

    // Busco índice donde está el elemento
    const indiceElementoAEliminar = listaDePeliculas.findIndex( (productoAEliminar) => {
        return productoAEliminar.pelicula === reserva.pelicula;
    });

    // Borro la reserva utilizando el índice
    listaDePeliculas.splice(indiceElementoAEliminar, 1);

    actualizarLS();

    renderizarReserva(listaDePeliculas);
}

function editarNombreReserva(reserva, nuevoNombre) {

    // Busco índice donde está el elemento
    const indiceElementoAModificar = listaDePeliculas.findIndex( (productoAEliminar) => {
        return productoAEliminar.pelicula === reserva.pelicula;
    });

    // Actualizo el pelicula de la reserva
    listaDePeliculas[indiceElementoAModificar].pelicula = nuevoNombre;

    actualizarLS();

    renderizarReserva(listaDePeliculas);
}

function renderizarReserva (productos) {

    // Limpio la tabla
    bodyTabla.innerHTML = "";

    productos.forEach( (reserva) => {

        // Creamos la fila
        const tr = document.createElement("tr");

        const tdPelicula = document.createElement("td");
        const span = document.createElement("span");
        span.innerHTML = `${reserva.pelicula}`;
        tdPelicula.append(span);

        // Agregar evento de click al span para poner el input
        span.addEventListener("click", () => {

            // Ocultar etiqueta span
            span.className = "oculta";

            // Creo el input que va a ser el cambio de pelicula
            const inputCambioDeNombre = document.createElement("input");
            inputCambioDeNombre.value = reserva.pelicula;

            // Detecto cambio en el input
            inputCambioDeNombre.addEventListener("change", () => {

                // Obtengo el nuevo pelicula del reserva a través del value del input
                const nuevoNombre = inputCambioDeNombre.value;

                // Removemos el input
                inputCambioDeNombre.remove();

                // Volver a poner el span
                span.className = "visible";

                // Editar pelicula del reserva
                editarNombreReserva(reserva, nuevoNombre);
            });

            // Agrego el input al td
            tdPelicula.append(inputCambioDeNombre);
        });

        const tdHorario = document.createElement("td");
        tdHorario.innerHTML = `${reserva.horario}`;

        const tdSucursal = document.createElement("td");
        tdSucursal.innerHTML = `${reserva.sucursal}`;

        const tdAcciones = document.createElement("td");
        const botonEliminarPelicula = document.createElement("button");
        botonEliminarPelicula.innerText = "Eliminar Reserva";

        // Agregar evento al boton de eliminar
        botonEliminarPelicula.addEventListener("click", () => {
            eliminarPelicula(reserva);
        });

        tdAcciones.append(botonEliminarPelicula);

        // Agrego los tds al tr
        tr.append(tdPelicula);
        tr.append(tdHorario);
        tr.append(tdSucursal);
        tr.append(tdAcciones);

        // Agrego el tr al tbody
        bodyTabla.append(tr);
    });

}

function obtenerReserva () {
    let productos = [];

    // Obtengo lo que hay en LS
    let productosLS = localStorage.getItem("productos");

    // Si hay algo (Lo que significa que no me devuelve null) lo parseo y lo asigno a la variable productos
    if(productosLS !== null) {

        // Parseo los objetos literales del JSON
        const productosJSON = JSON.parse(productosLS);

        // Recorro cada objeto literal e instancio un nuevo objeto de la clase Reserva
        for(const productoJSON of productosJSON) {
            productos.push(new Reserva(productoJSON.pelicula, productoJSON.horario, productoJSON.sucursal));
        }
    }

    return productos;
}

function actualizarLS () {
    // Parseo array de objetos a JSON
    const listaDeReservas = JSON.stringify(listaDePeliculas);

    // Almaceno el JSON en LS
    localStorage.setItem("productos", listaDeReservas);
}

// Inicio del programa

let seleccionPelicula = document.getElementById("pelicula");
let seleccionHorario = document.getElementById("horario");
let seleccionSucursal = document.getElementById("sucursal");

const listaDePeliculas = obtenerReserva();

const formularioPeliculas = document.getElementById("reservaPeliculas");
const bodyTabla = document.getElementById("bodyTabla");
const inputNombre = document.getElementById("nombreDelProducto");
const inputPrecio = document.getElementById("precioDelProducto");
const inputBuscar = document.getElementById("buscarProducto");

formularioPeliculas.addEventListener("submit", (event) => {

    // Freno el flujo del evento
    event.preventDefault();

    const pelicula = seleccionPelicula.value;
    const horario = seleccionHorario.value;
    const sucursal = seleccionSucursal.value;


    // Agrego el reserva al array
    listaDePeliculas.push(new Reserva(pelicula, horario,sucursal));

    actualizarLS();

    // Renderizo las peliculas
    renderizarReserva(listaDePeliculas);
});

inputBuscar.addEventListener("input", () => {

    const peliculaABuscar = inputBuscar.value;

    // Filtro las peliculas
    const reservasFiltradas = listaDePeliculas.filter( (reserva) => {
        return reserva.pelicula.toLowerCase().includes(peliculaABuscar.toLowerCase());
    });

    renderizarReserva(reservasFiltradas);
});

// Renderizo las peliculas
renderizarReserva(listaDePeliculas);


/* 

// Clases

class Pelicula {

    constructor(id,nombrePelicula, precioEntrada) {
        this.id = id;
        this.nombrePelicula = nombrePelicula;
        this.precioEntrada = precioEntrada;

        this.generarAsientos();
    }

    generarAsientos () {

        this.asientos = [];

        for(let i = 0; i < 15; i++) {
            const asiento = new Asiento(i, false);
            this.asientos.push(asiento);
        }
    }
}

class Asiento {

    constructor(id, ocupado) {
        this.id = id;
        this.ocupado = ocupado;
    }
}

// Funciones

function obtenerReserva(id) {

    return listaDePeliculas.find( (pelicula) => {
        return pelicula.id === id;
    });
}

function hayAsientosDisponibles (pelicula, cantidadDeAsientos) {

    const asientosDisponibles = pelicula.asientos.filter( (asiento) => {
        return !asiento.ocupado;
    });

    return asientosDisponibles.length >= cantidadDeAsientos;
}

function calcularTotalPelicula (pelicula, cantidadDeAsientos) {
    return cantidadDeAsientos * pelicula.precioEntrada;
}

function ocuparAsientos (pelicula, cantidadDeAsientos) {

    const asientos = pelicula.asientos;

    for(const asiento of asientos) {

        if(!asiento.ocupado) {
            asiento.ocupado = true;
            cantidadDeAsientos--;
        }

        if(cantidadDeAsientos === 0) {
            break;
        }
    }

    pelicula.asientos = asientos;
}



// Inicio el programa
let sala;

const listaDePeliculas = [
    new Pelicula(1, "Titanic 3D", 1000),
    new Pelicula(2, "Top Gun: Maverick", 800),
    new Pelicula(3, "Mi vecino Totoro", 800),
];


let peliculaAComprar = parseInt(prompt("Bienvenido!. Ingrese la película que quiere comprar. Ingrese SALIR (Opcion 0) si quiere salir del programa.\n1- Titanic 3D\n2- Top Gun: Maverick\n3- Mi vecino Totoro\n0- SALIR"));


while(peliculaAComprar !== 0) {

    // Validar que el pelicula existe
    const pelicula = obtenerReserva(peliculaAComprar);

    // Si la pelicula existe
    if(pelicula !== undefined) {

        // Le solicito al usuario que elija una Sala

  let salaElegida = parseInt(prompt("Ingrese la sala a la que quiere asistir:\n1- Hoyts Unicenter\n2- Hoyts DOT\n3- IMAX Norcenter"));
     


    switch(salaElegida) {
        
        case 1:
            sala = "Hoyts Unicenter";
            break;
        case 2:
            sala = "Hoyts DOT";
            break;
        case 3:
            sala = "IMAX Norcenter";
            break;
        default:
            alert("Opcion Incorrecta");
            break;
       }
       
            
              

        // Le solicito al usuario la cantidad de asientos
        let cantidadDeAsientos = parseInt(prompt("Ingrese la cantidad de asientos que quiere comprar"));

        // Controlo que el usuario ingrese una cantidad de asientos mayor o igual a 0 y que haya asientos disponibles
        while(cantidadDeAsientos <= 0 || !hayAsientosDisponibles(pelicula, cantidadDeAsientos)) {
            cantidadDeAsientos = parseInt(prompt("Ingrese la cantidad de asientos que quiere comprar"));
        }

        // Calcular total
        const total = calcularTotalPelicula(pelicula, cantidadDeAsientos);

        alert(`El total a pagar por la pelicula ${pelicula.nombrePelicula} en la sala ${sala} es de: $${total}`);

        ocuparAsientos(pelicula, cantidadDeAsientos);

    } else {
        alert("Número de pelicula inválido");
    }

    // Le volvemos a pedir que ingrese un número de pelicula
    peliculaAComprar = parseInt(prompt("Ingrese la película que quiere comprar. Ingrese SALIR (Opcion 0) si quiere salir del programa.\n1- Titanic 3D\n2- Top Gun: Maverick\n3- Mi vecino Totoro\n0- SALIR"));

}

alert("Gracias por su compra");

const coleccionPeliculas = document.getElementsByClassName("peliculas");
document.getElementById("mostrar2").innerHTML = coleccionLi[2].innerHTML;

*/