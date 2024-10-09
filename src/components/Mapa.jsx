import React, { useState, useRef, useEffect, useCallback } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    useMap,
    Pin,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

function Mapa({ setLatitud, setLongitud, latitud, longitud }) {
    const apiKey = import.meta.env.VITE_SERVER_URL; // Asegúrate de que esta variable esté definida correctamente
    const mapId = "YOUR_MAP_ID"; // Verifica que este ID sea válido

    // Asegúrate de que las coordenadas sean números válidos
    const validLat = typeof latitud === "number" ? latitud : -33.860664;
    const validLng = typeof longitud === "number" ? longitud : 151.208138;

    const handleApiLoad = () => {
        console.log("Maps API has loaded");
    };

    const handleApiError = () => {
        console.error("Error al cargar la API de Google Maps.");
        alert(
            "No se pudo cargar el mapa. Por favor verifica tu conexión a Internet o la clave de API."
        );
    };

    return (
        <APIProvider
            apiKey={apiKey}
            onLoad={handleApiLoad}
            onError={handleApiError}
        >
            <Map
                defaultZoom={13}
                defaultCenter={{
                    lat: validLat,
                    lng: validLng,
                }}
                mapId={mapId}
                options={{
                    draggable: true,
                }}
            >
                <AdvancedMarker
                    position={{ lat: validLat, lng: validLng }}
                    clickable={true}
                    onClick={() => console.log("Marcador principal clicado")}
                >
                    <Pin
                        background={"#4285F4"}
                        glyphColor={"#FFF"}
                        borderColor={"#000"}
                    />
                </AdvancedMarker>
            </Map>
            <h2>Latitud: {validLat}</h2>
            <h2>Longitud: {validLng}</h2>
        </APIProvider>
    );
}

export default Mapa;
