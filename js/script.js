/* ==========================
  Función para añadir al carrito y persistir en localStorage
========================== */
document.addEventListener("DOMContentLoaded", () => {
  // Selecciono todos los botones para agregar productos
  const botonesAgregar = document.querySelectorAll(".btn-agregar-carrito");

  botonesAgregar.forEach(boton => {
      boton.addEventListener("click", (event) => {
          event.preventDefault();

          // datos del producto
          const productoElemento = boton.closest('.producto');
          const nombreProducto = productoElemento.querySelector('h3').innerText;
          const imagenProducto = productoElemento.querySelector('img').getAttribute('src');
          const precioProducto = 500;  

          console.log(`Producto: ${nombreProducto}, Precio: $${precioProducto}`);

          // Obtengo el carrito actual del localStorage o creo un array vacío
          const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

          // Agrego el producto al carrito
          carrito.push({
              nombre: nombreProducto,
              precio: precioProducto,
              imagen: imagenProducto
          });

          // Guardo carrito actualizado en localStorage
          localStorage.setItem("carrito", JSON.stringify(carrito));

          alert(`${nombreProducto} añadido al carrito.`);
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tablaCarrito = document.getElementById("tablaCarrito");
  const totalCarrito = document.getElementById("totalCarrito");

  // Obtengo carrito del almacenamiento local
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const renderizarCarrito = () => {
      // Limpia la tabla
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

  // Elimina productos del carrito
  tablaCarrito.addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-danger")) {
          const index = event.target.dataset.index;
          carrito.splice(index, 1);

          localStorage.setItem("carrito", JSON.stringify(carrito));
          renderizarCarrito();
      }
  });

  renderizarCarrito();
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
