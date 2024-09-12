// Array para almacenar los productos disponibles en la tienda
const cafesDisponibles = [
    { nombre: 'Café Arabico', precio: 150 },
    { nombre: 'Café Robusta', precio: 100 },
    { nombre: 'Café Liberica', precio: 200 },
    { nombre: 'Café Colombiano', precio: 225 },
    { nombre: 'Café Brasil', precio: 175 },
];

// Array para almacenar los productos en el carrito
let carrito = [];

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

function mostrarCafes() {
    const cafesDiv = document.getElementById('cafes');
    cafesDiv.innerHTML = '';
    cafesDisponibles.forEach(cafe => {
        const cafeDiv = document.createElement('div');
        cafeDiv.classList.add('cafe');
        cafeDiv.innerHTML = `
            <h3>${cafe.nombre}</h3>
            <p>$${cafe.precio}</p>
            <button onclick="agregarAlCarrito('${cafe.nombre}')">Agregar al carrito</button>
        `;
        cafesDiv.appendChild(cafeDiv);
    });
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
    const carritoTableBody = document.getElementById('carritoTableBody');
    carritoTableBody.innerHTML = '';
    let total = 0;
    let totalProductos = 0;

    carrito.forEach(cafe => {
        total += cafe.precio * cafe.cantidad;
        totalProductos += cafe.cantidad;
        const fila = document.createElement('tr');
        fila.classList.add('carrito-item');
        fila.innerHTML = `
            <td>${cafe.nombre}</td>
            <td>
                <button onclick="ajustarCantidad('${cafe.nombre}', -1)">-</button>
                ${cafe.cantidad}
                <button onclick="ajustarCantidad('${cafe.nombre}', 1)">+</button>
            </td>
            <td>$${cafe.precio * cafe.cantidad}</td>
        `;
        carritoTableBody.appendChild(fila);
    });

    document.getElementById('total').innerText = `Total: $${total}`;
    document.getElementById('carritoCantidad').innerText = totalProductos;
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

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarrito();
    localStorage.removeItem('carrito')
}

document.getElementById('carritoBtn').addEventListener('click', () => {
    const carritoDropdown = document.getElementById('carritoDropdown');
    carritoDropdown.style.display = carritoDropdown.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);

// Inicialización
mostrarCafes();
cargarCarrito();
