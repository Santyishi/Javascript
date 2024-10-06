let cafesDisponibles = [];

function cargarCafes() {
    fetch('https://santyishi.github.io/Javascript/data/cafes.json'
)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los cafés');
            }
            return response.json();
        })
        .then(data => {
            cafesDisponibles = data;
            mostrarCafes();
            mostrarCafesPremium();
        })
        .catch(error => console.error('Error al cargar los cafés:', error));
}

function mostrarCafes() {
    const cafesDiv = $('#cafes');
    cafesDiv.empty();
    cafesDisponibles.forEach(cafe => {
        if (!cafe.premium) {
            const cafeDiv = $(`
                <div class="cafe">
                    <h3>${cafe.nombre}</h3>
                    <p>$${cafe.precio.toFixed(2)}</p>
                    <img src="${cafe.imagen}" alt="${cafe.nombre}" class="cafe-imagen">
                    <button onclick="agregarAlCarrito('${cafe.nombre}')">Agregar al carrito</button>
                </div>
            `);
            cafesDiv.append(cafeDiv);
        }
    });
}

function mostrarCafesPremium() {
    const cafesPremiumDiv = $('#cafesPremium');
    cafesPremiumDiv.empty();
    cafesDisponibles.forEach(cafe => {
        if (cafe.premium) {
            const cafeDiv = $(`
                <div class="cafe">
                    <h3>${cafe.nombre}</h3>
                    <p>$${cafe.precio.toFixed(2)}</p>
                    <img src="${cafe.imagen}" alt="${cafe.nombre}" class="cafe-imagen">
                    <button onclick="agregarAlCarrito('${cafe.nombre}')">Agregar al carrito</button>
                </div>
            `);
            cafesPremiumDiv.append(cafeDiv);
        }
    });
}

$(document).ready(function() {
    cargarCafes();
});
