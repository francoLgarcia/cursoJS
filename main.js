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