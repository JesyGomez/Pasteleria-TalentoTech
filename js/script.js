// Carrito global para acceso en todo el script
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* ========================== 
  Función para añadir al carrito y persistir en localStorage
========================== */
document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".btn-agregar-carrito");

  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", (event) => {
      event.preventDefault();

      const productoElemento = boton.closest('.producto');
      const nombreProducto = productoElemento.querySelector('h3').innerText;
      const imagenProducto = productoElemento.querySelector('img').getAttribute('src');
      const precioProducto = 500;

      console.log(`Producto: ${nombreProducto}, Precio: $${precioProducto}`);

      carrito.push({
        nombre: nombreProducto,
        precio: precioProducto,
        imagen: imagenProducto
      });

      localStorage.setItem("carrito", JSON.stringify(carrito));

      alert(`${nombreProducto} añadido al carrito.`);
    });
  });
});

/* ========================== 
  Renderiza el carrito y persiste localStorage
========================== */
const tablaCarrito = document.getElementById("tablaCarrito");
const totalCarrito = document.getElementById("totalCarrito");

const renderizarCarrito = () => {
  tablaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    tablaCarrito.innerHTML = "<tr><td colspan='3'>¡Tu carrito está vacío!</td></tr>";
    totalCarrito.textContent = "0.00";
    return;
  }

  carrito.forEach((producto, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${producto.imagen}" width="50" alt="${producto.nombre}"></td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td><button class="btn btn-danger btn-sm" data-index="${index}">Eliminar</button></td>
    `;
    tablaCarrito.appendChild(fila);
  });

  calcularTotal();
};

const calcularTotal = () => {
  const total = carrito.reduce((suma, producto) => suma + parseFloat(producto.precio), 0);
  totalCarrito.textContent = total.toFixed(2);
};

tablaCarrito.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-danger")) {
    const index = event.target.dataset.index;
    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
  }
});

renderizarCarrito();

// Finaliza la Compra
document.getElementById("finalizarCompra").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío, no puedes finalizar la compra.");
    return;
  }

  const totalCompra = carrito.reduce((suma, producto) => suma + parseFloat(producto.precio), 0);
  const confirmacion = confirm(`El total de tu compra es $${totalCompra.toFixed(2)}. ¿Deseas finalizar la compra?`);

  if (confirmacion) {
    alert("¡Compra realizada con éxito! Gracias por tu compra.");

    localStorage.removeItem("carrito");
    carrito.length = 0;

    renderizarCarrito();  // Actualiza la vista
  }
});


/* ==========================
  Validación del formulario de contacto
========================== */
const formulario = document.getElementById("formulario");
if (formulario) {
  formulario.addEventListener("submit", function (event) {
    let isValid = true;
    const errorMessages = [];

    const nombre = document.getElementById("nombre")?.value.trim();
    const nombreRegex = /[a-zA-Z]/;

    if (!nombre) {
      errorMessages.push("El campo 'Nombre' es obligatorio.");
      isValid = false;
    } else if (!nombreRegex.test(nombre)) {
      errorMessages.push("El campo 'Nombre' no puede contener solo números.");
      isValid = false;
    }

    const email = document.getElementById("email")?.value.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || !emailRegex.test(email)) {
      errorMessages.push("El campo 'Email' debe contener una dirección válida.");
      isValid = false;
    }

    const telefono = document.getElementById("telefono")?.value.trim();
    const telefonoRegex = /^[0-9]{2,4}\s?[0-9]{3,4}\s?[0-9]{3,4}$/;

    if (!telefono || !telefonoRegex.test(telefono)) {
      errorMessages.push("El campo 'Teléfono' debe contener un número válido.");
      isValid = false;
    }

    const mensaje = document.getElementById("mensaje")?.value.trim();

    if (!mensaje || mensaje.length < 10) {
      errorMessages.push("El campo 'Mensaje' debe tener al menos 10 caracteres.");
      isValid = false;
    } else if (!nombreRegex.test(mensaje)) {
      errorMessages.push("El campo 'Mensaje' no puede contener solo números.");
      isValid = false;
    }

    if (!isValid) {
      event.preventDefault();
      alert("Errores detectados:\n\n" + errorMessages.join("\n"));
    }
  });
}
/* ==========================
  Función para alternar entre modo claro y oscuro
========================== */

function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("dl-icon");

  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    icon.classList.replace("bi-moon-stars-fill", "bi-sun-fill");
  } else {
    icon.classList.replace("bi-sun-fill", "bi-moon-stars-fill");
  }
}


