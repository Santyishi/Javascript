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
function mostrarCarritoYCalcularTotal(mostrarTotal = true) {
    if (carrito.length === 0) {
        console.log("El carrito está vacío.");
        return;
    }
    
    console.log("Productos en el carrito:");
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        console.log(carrito[i].nombre, ":", carrito[i].precio);
        total += carrito[i].precio;
    }

    if (mostrarTotal) {
        alert("Total a pagar: "+ total);
    }
}
function eliminarProducto(nombre) {
    const indice = carrito.findIndex(producto => producto.nombre.toLowerCase() == nombre.toLowerCase());

    if (indice !== -1) {
        carrito.splice(indice, 1);
        console.log(nombre, "ha sido eliminado del carrito.");
    } else {
        console.log("El producto no se encuentra en el carrito.");
    }
}

// Función para vaciar el carrito
function vaciarCarrito(opcion) {
    if (carrito.length === 0) {
        console.log("El carrito ya está vacío.");
        return;
    }

    if (opcion === 'eliminar') {
        const nombreEliminar = prompt("Ingrese el nombre del producto que desea eliminar:");
        eliminarProducto(nombreEliminar);
    } else if (opcion === 'vaciar') {
        carrito = [];
        console.log("El carrito ha sido vaciado.");
    } else {
        alert("No se realizó ninguna acción, Muchas gracias por su compra");
    }
}


let agregarOtro;

function iniciarAplicacion() {
    alert("¡Bienvenido a la tienda de café!");

    let agregarOtro;

    do {
        const nombre = prompt("Ingrese el nombre del grano de café:");
        const precio = parseInt(prompt("Ingrese el precio del grano de café:"));
        agregaryValidarProducto(nombre, precio);
        agregarOtro = confirm("¿Deseas agregar otro grano de café?");
    } while (agregarOtro);

    const mostrarTotal = confirm("¿Deseas ver el total de la compra?");
    mostrarCarritoYCalcularTotal(mostrarTotal);

    const vaciarCarro = prompt("¿Deseas vaciar el carrito completamente o eliminar un producto específico? (vaciar/eliminar)").toLowerCase();
    vaciarCarrito(vaciarCarro);
    if(vaciarCarro =='eliminar'){
        const mostrarTotal = confirm("¿Deseas ver el total de la compra nuevamente?");
        mostrarCarritoYCalcularTotal(mostrarTotal);
    }
    alert("Muchas gracias, nos vemosss");
}

// Iniciar la aplicación
iniciarAplicacion();

