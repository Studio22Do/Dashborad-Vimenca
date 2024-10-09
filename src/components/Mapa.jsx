import React, { useState, useCallback } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

function Mapa({ setLatitud, setLongitud, latitud, longitud }) {
    
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Asegúrate de que esta variable esté definida correctamente
    const mapId = "YOUR_MAP_ID"; // Verifica que este ID sea válido

    console.log(apiKey);

    // Asegúrate de que las coordenadas sean números válidos
    const validLat = typeof latitud === "number" ? latitud : -33.860664;
    const validLng = typeof longitud === "number" ? longitud : 151.208138;

    const [mapCenter, setMapCenter] = useState({ lat: validLat, lng: validLng });

    const handleApiLoad = () => {
        console.log("Maps API has loaded");
    };

    const handleApiError = () => {
        console.error("Error al cargar la API de Google Maps.");
        alert(
            "No se pudo cargar el mapa. Por favor verifica tu conexión a Internet o la clave de API."
        );
    };

    const handleMarkerClick = useCallback((ev) => {
        if (!ev.latLng) return;
        const newCenter = {
            lat: ev.latLng.lat(),
            lng: ev.latLng.lng(),
        };
        setMapCenter(newCenter);
        console.log('Marcador clicado:', newCenter);
    }, []);

    return (
        <APIProvider
            apiKey={apiKey}
            onLoad={handleApiLoad}
            onError={handleApiError}
        >
            <Map
                defaultZoom={13}
                defaultCenter={mapCenter} // Cambia defaultCenter a center
                mapId={mapId}
                options={{
                    draggable: true,
                }}
            >
                <AdvancedMarker
                    position={{ lat: validLat, lng: validLng }}
                    clickable={true}
                    onClick={handleMarkerClick} // Usa la nueva función de clic
                >
                    <Pin
                        background={"#FEC52E"}
                        glyphColor={"#000"}
                        borderColor={"#000"}
                    />
                </AdvancedMarker>
            </Map>
            <h2>Latitud: {mapCenter.lat}</h2>
            <h2>Longitud: {mapCenter.lng}</h2>
            
            
        </APIProvider>
    );
}

export default Mapa;
