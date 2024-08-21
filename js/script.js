// Array para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregaryValidarProducto(nombre,precio) { 
    
    let precioValido = precio;

    do{
    if (isNaN(precioValido) || precioValido <= 0) {
        console.log("Precio inválido. Inténtelo de nuevo.");  
        precioValido =parseInt(prompt("Ingrese el precio del grano de café:"));
    }
    else{

        break;
    }
    }while(true); 
    carrito.push({nombre, precio:precioValido});
    console.log(nombre, "ha sido agregado al carrito.");
}

// Función para mostrar los productos en el carrito y el total
function mostrarCarritoYCalcularTotal() {
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
        return;
    }
    
    let total = 0;
    console.log("Productos en el carrito:");
    for (let i = 0; i < carrito.length; i++) {
        console.log(carrito[i].nombre, ":", carrito[i].precio);
        total += carrito[i].precio;
    }
    console.log("Total a pagar:", total);
}
// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    console.log("El carrito ha sido vaciado.");
}

let agregarOtro;

do{
    const nombre = prompt("Ingrese el nombre del grano de café:");
    const precio = parseInt(prompt("Ingrese el precio del grano de café:"));
    agregaryValidarProducto(nombre,precio);
    agregarOtro=prompt("¿Deseas agregar otro?");
}while(agregarOtro == 'si' || agregarOtro == 'Si');

mostrarCarritoYCalcularTotal(); 

let Vaciarcarro =prompt("¿deseas Vaciar el carrito?");
if(Vaciarcarro == 'si'){
    vaciarCarrito(); 
    mostrarCarritoYCalcularTotal(); 
}else{
    alert("Muchas gracias por su compra");
}


