import React, { useEffect, useState } from "react"; // Importa useState
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
    apiKey: import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: "weekly",
});

let map; // Declaración de la variable map

async function initMap(setLatitud, setLongitud) { // Agrega parámetros para las funciones de estado
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: { lat: 18.4821577, lng: -69.934822 },
        zoom: 13,
    });

    // Agregar un listener para el evento de clic en el mapa
    map.addListener("click", (event) => {
        const latitud = event.latLng.lat(); // Obtener latitud
        const longitud = event.latLng.lng(); // Obtener longitud
        console.log(`Latitud: ${latitud}, Longitud: ${longitud}`); // Mostrar en consola
        setLatitud(latitud); // Actualizar el estado de latitud
        setLongitud(longitud); // Actualizar el estado de longitud
    });
}

function Mapa({ setLatitud, setLongitud, latitud, longitud }) {
    useEffect(() => {
        loader.load().then(() => initMap(setLatitud, setLongitud)); // Pasa las funciones de estado a initMap
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
        <div className="w-full h-full">
            <div id="map" className="w-full h-full" /> {/* Asegúrate de que este div esté presente */}
        </div>
    );
}

export default Mapa;
