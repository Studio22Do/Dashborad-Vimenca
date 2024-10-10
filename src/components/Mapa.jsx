import React, { useState, useCallback, useEffect } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin
} from "@vis.gl/react-google-maps";

function Mapa({ setLatitud, setLongitud, latitud, longitud }) {
    
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Asegúrate de que esta variable esté definida correctamente
    const mapId = "YOUR_MAP_ID"; // Verifica que este ID sea válido
    
    // Validar las coordenadas y usar las proporcionadas por los props si son válidas
    const validLat = typeof latitud === "number" ? latitud : null;
    const validLng = typeof longitud === "number" ? longitud : null;
    
    // Establecer el centro del mapa solo si las coordenadas son válidas
    const [mapCenter, setMapCenter] = useState(
        validLat !== null && validLng !== null ? { lat: validLat, lng: validLng } : null
    );

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
        console.log('Marcador clicado:', ev.latLng.toString());
    }, []);

    const handleMapClick = useCallback((ev) => {
        console.log("Evento de clic en el mapa:", ev); // Log para ver la estructura del evento
        const latLng = ev.detail?.latLng; // Acceder a latLng desde ev.detail
        if (!latLng) {
            console.log("No se pudo obtener latLng del evento");
            return;
        }
        const newLat = latLng.lat;
        const newLng = latLng.lng;
        console.log("Mapa clicado en:", newLat, newLng); // Log para depurar
        setMapCenter({ lat: newLat, lng: newLng });
        setLatitud(newLat);
        setLongitud(newLng);
        console.log("Estado actualizado: Latitud:", newLat, "Longitud:", newLng); // Log para depurar
    }, [setLatitud, setLongitud]);

    // Actualiza el centro del mapa cuando cambian los props latitud y longitud
    useEffect(() => {
        console.log("Componente Mapa montado");
        if (typeof latitud === "number" && typeof longitud === "number") {
            setMapCenter({ lat: latitud, lng: longitud });
        }
    }, [latitud, longitud]);

    return (
        <APIProvider
            apiKey={apiKey}
            onLoad={handleApiLoad}
            onError={handleApiError}
        >
            {mapCenter && ( // Renderizar el mapa solo si mapCenter es válido
                <Map
                    defaultZoom={13}
                    defaultCenter={mapCenter} // Usa defaultCenter para la posición inicial
                    mapId={mapId}
                    options={{
                        draggable: true, // Asegúrate de que esta opción esté habilitada
                        scrollwheel: true,
                        disableDoubleClickZoom: false,
                    }}
                    onClick={handleMapClick} // Añadir el evento de clic en el mapa
                >
                    <AdvancedMarker
                        position={mapCenter} // Actualizar la posición del marcador
                        clickable={true}
                        onClick={handleMarkerClick}
                    >
                        <Pin
                            background={"#FEC52E"}
                            glyphColor={"#000"}
                            borderColor={"#000"}
                        />
                    </AdvancedMarker>
                </Map>
            
            )}
            <h2>Latitud: {validLat !== null ? validLat : "No válida"}</h2>
            <h2>Longitud: {validLng !== null ? validLng : "No válida"}</h2>
        </APIProvider>
    );
}

export default Mapa;
