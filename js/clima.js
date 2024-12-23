/* ==========================
  Función para mostrar el clima
========================== */
document.getElementById("obtenerClima").addEventListener("click", () => {
    console.log("Botón de clima clickeado");  // Verifica si el evento está funcionando
    const API_KEY = "f8070777ab4619a036cf83c3ff120dc5";
    const lat = -34.6037;  // Latitud de Buenos Aires
    const lon = -58.3816;  // Longitud de Buenos Aires
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Verifica si los datos están siendo recibidos
            if (data.cod == 200) {
                mostrarClima(data);
            } else {
                console.error('Mensaje de error:', data.message);
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos del clima:', error);
        });
});

function mostrarClima(data) {
    const { name, main, weather } = data;
    const temperatura = main.temp;
    const descripcion = weather[0].description;
    const humedad = main.humidity;

    // Colocamos los datos en un div dentro del div de resultado
    document.getElementById("resultadoClima").innerHTML = `
        <div><strong>${name}</strong></div>
        <div>Temperatura: ${temperatura}°C</div>
        <div>Descripción: ${descripcion}</div>
        <div>Humedad: ${humedad}%</div>
    `;
}