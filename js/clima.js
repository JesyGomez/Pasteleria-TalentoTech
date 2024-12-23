/* ==========================
  Función para mostrar el clima
========================== */
    document.getElementById("obtenerClima").addEventListener("click", () => {
        console.log("Botón de clima clickeado");  
        const API_KEY = "f8070777ab4619a036cf83c3ff120dc5";

        // Intenta obtener la ubicación actual del usuario
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    console.log(`Ubicación actual: lat=${lat}, lon=${lon}`);
                    obtenerClima(lat, lon, API_KEY);
                },
                (error) => {
                    console.warn("No se pudo obtener la ubicación, se usará Buenos Aires como predeterminado.");
                    const lat = -34.6037; // Latitud de Buenos Aires
                    const lon = -58.3816; // Longitud de Buenos Aires
                    obtenerClima(lat, lon, API_KEY);
                }
            );
        } else {
            console.warn("La geolocalización no está disponible en este navegador.");
            const lat = -34.6037; // Latitud de Buenos Aires
            const lon = -58.3816; // Longitud de Buenos Aires
            obtenerClima(lat, lon, API_KEY);
        }
    });

    function obtenerClima(lat, lon, API_KEY) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);  // Verificamos si los datos están siendo recibidos
                if (data.cod == 200) {
                    mostrarClima(data);
                } else {
                    console.error('Mensaje de error:', data.message);
                }
            })
            .catch(error => {
                console.error('Error al obtener los datos del clima:', error);
            });
    }

    function mostrarClima(data) {
        const { name, main, weather } = data;
        const temperatura = main.temp;
        const descripcion = weather[0].description;
        const humedad = main.humidity;

        document.getElementById("resultadoClima").innerHTML = `
            <div><strong>${name}</strong></div>
            <div>Temperatura: ${temperatura}°C</div>
            <div>Descripción: ${descripcion}</div>
            <div>Humedad: ${humedad}%</div>
        `;
    }
