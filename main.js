alert("Bienvenido, deberá adivinar en que instrumento estoy pensando")

let contador = 0;
let palabra = prompt("Ingrese un instrumento: ");

if (palabra == "piano") {
    contador++;
    alert("¡WOW!, el instrumento era Piano. Lo adivinó en " + contador + " intento");
} else{

while(palabra != "piano") {
    contador++;
    let palabra = prompt("Incorrecto, ingrese otro instrumento: ");

    if (palabra == "piano") {
        contador++;
        alert("¡Felicitaciones!, el instrumento era Piano. Lo adivinó en " + contador + " intentos");
        break;
    }else {
        alert("Palabra incorrecta, pista: es un instrumento de teclas");
    }
    
}

}