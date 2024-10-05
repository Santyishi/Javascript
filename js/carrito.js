let carrito = [];

function guardarCarrito() {
    try {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    } catch (error) {
        mostrarMensajeError('Error al guardar el carrito. Inténtalo de nuevo.');
    }
}

function cargarCarrito() {
    try {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            actualizarCarrito();
        }
    } catch (error) {
        mostrarMensajeError('Error al cargar el carrito. Inténtalo de nuevo.');
    }
}

function agregarAlCarrito(nombre) {
    const cafe = cafesDisponibles.find(cafe => cafe.nombre === nombre);
    const cafeEnCarrito = carrito.find(item => item.nombre === nombre);

    if (cafeEnCarrito) {
        cafeEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...cafe, cantidad: 1 });
    }
    actualizarCarrito();
    guardarCarrito();
}

function actualizarCarrito() {
    const carritoTableBody = $('#carritoTableBody');
    carritoTableBody.empty();
    let total = 0;
    let totalProductos = 0;

    carrito.forEach(cafe => {
        total += cafe.precio * cafe.cantidad;
        totalProductos += cafe.cantidad;
        const fila = $(`
            <tr class="carrito-item">
                <td>${cafe.nombre}</td>
                <td>
                    <button onclick="ajustarCantidad('${cafe.nombre}', -1)">-</button>
                    ${cafe.cantidad}
                    <button onclick="ajustarCantidad('${cafe.nombre}', 1)">+</button>
                </td>
                <td>$${(cafe.precio * cafe.cantidad).toFixed(2)}</td>
            </tr>
        `);
        carritoTableBody.append(fila);
    });

    $('#total').text(`Total: $${total.toFixed(2)}`);
    $('#carritoCantidad').text(totalProductos);
}

function ajustarCantidad(nombre, cantidad) {
    const cafeEnCarrito = carrito.find(cafe => cafe.nombre === nombre);
    if (cafeEnCarrito) {
        cafeEnCarrito.cantidad += cantidad;
        if (cafeEnCarrito.cantidad <= 0) {
            carrito = carrito.filter(cafe => cafe.nombre !== nombre);
        }
        actualizarCarrito();
        guardarCarrito();
    }
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    localStorage.removeItem('carrito');
}

function mostrarMensajeError(mensaje) {
    const mensajeErrorDiv = $('#mensajeError');
    mensajeErrorDiv.text(mensaje).fadeIn(); 

    setTimeout(() => {
        mensajeErrorDiv.fadeOut(); 
    }, 2000); 
}

$(document).ready(function() {
    $('#carritoBtn').on('click', function() {
        const carritoDropdown = $('#carritoDropdown');
        carritoDropdown.toggle();
    });

    $('#vaciarCarrito').on('click', vaciarCarrito);

    $('#realizarCompra').on('click', function() {
        try {
            if (carrito.length === 0) {
                mostrarMensajeError('Error: Debes añadir al menos un café al carrito antes de continuar con la compra.');
                return; // No continuar si el carrito está vacío
            }
            $('#carritoTableBody').hide();
            $('#totalContainer').hide();
            $('#realizarCompra').hide();
            $('#vaciarCarrito').hide();
            $('#formularioCompra').show();
        } catch (error) {
            mostrarMensajeError('Error al procesar la compra. Inténtalo de nuevo.');
        }
    });

    $('#compraForm').on('submit', function(e) {
        e.preventDefault();
        
        const nombre = $('#nombre').val();
        const email = $('#email').val();
        const telefono = $('#telefono').val();

        if (nombre && email && telefono) {
            $('#formularioCompra').hide(); // Oculta el formulario al instante
            $('#mensajeCompra').text("Compra realizada con éxito").show();
            
            // Vaciar el carrito después de la compra
            vaciarCarrito();

            setTimeout(() => {
                $('#mensajeCompra').fadeOut();
                $('#carritoTableBody').show();
                $('#totalContainer').show();
                $('#realizarCompra').show();
                $('#vaciarCarrito').show();
            }, 3000);
        } else {
            mostrarMensajeError('Por favor, completa todos los campos del formulario.');
        }
    });

    cargarCarrito();
});
