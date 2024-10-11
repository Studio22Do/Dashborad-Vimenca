import React, { useState, useCallback, useEffect, useRef } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin
} from "@vis.gl/react-google-maps";

function Mapa({ setLatitud, setLongitud, latitud, longitud }) {
    
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Asegúrate de que esta variable esté definida correctamente
    const mapId = "YOUR_MAP_ID"; // Verifica que este ID sea válido
    
    // Ubicación por defecto (por ejemplo, Ciudad de México)
    let defaultLocation = { lat: 18.471610, lng: -69.938787 };
    console.log("defaultLocation",defaultLocation);

    // Validar las coordenadas y usar las proporcionadas por los props si son válidas
    const validLat = typeof latitud === "number" ? latitud : null;
    const validLng = typeof longitud === "number" ? longitud : null;
    console.log("validLat",validLat, "validLng",validLng);
    
    // Establecer el centro del mapa basado en las coordenadas proporcionadas o la ubicación por defecto
    const [mapCenter, setMapCenter] = useState(defaultLocation);

    // Nuevo useEffect para observar cambios en mapCenter
    useEffect(() => {
        if (validLat !== null && validLng !== null) {
            console.log("Actualizando mapCenter a coordenadas válidas:", { lat: validLat, lng: validLng });
            setMapCenter({ lat: validLat, lng: validLng });
            setShouldCenter(true); // Permitir que el mapa se centre automáticamente
        } else {
            console.log("Manteniendo mapCenter en ubicación por defecto:", defaultLocation);
        }
    }, [validLat, validLng]);

    const [shouldCenter, setShouldCenter] = useState(true);

    const mapRef = useRef(null);

    useEffect(() => {
        if (shouldCenter && mapRef.current) {
            mapRef.current.panTo(mapCenter);
        }
    }, [mapCenter, shouldCenter]);

    const handleMapLoad = (map) => {
        mapRef.current = map;
    };

    const handleMapDragStart = () => {
        setShouldCenter(false); // Desactivar el centrado automático al arrastrar
    };

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
        const latLng = ev.detail?.latLng;
        if (!latLng) {
            console.log("No se pudo obtener latLng del evento");
            return;
        }
        const newLat = latLng.lat;
        const newLng = latLng.lng;
        console.log("Mapa clicado en:", newLat, newLng);
        setLatitud(newLat);
        setLongitud(newLng);
        console.log("Estado actualizado: Latitud:", newLat, "Longitud:", newLng);
    }, [setLatitud, setLongitud]);

    return (
        <APIProvider
            apiKey={apiKey}
            onLoad={handleApiLoad}
            onError={handleApiError}
        >
            <Map
                defaultZoom={8}
                defaultCenter={defaultLocation} // Usar defaultCenter para la posición inicial
                mapId={mapId}
                options={{
                    draggable: true, // Asegúrate de que esta opción esté habilitada
                    scrollwheel: true,
                    disableDoubleClickZoom: false,
                }}
                onClick={handleMapClick} // Añadir el evento de clic en el mapa
                onDragStart={handleMapDragStart} // Detectar cuando el usuario empieza a arrastrar
                onLoad={handleMapLoad} // Capturar la referencia al mapa
            >
                {validLat !== null && validLng !== null && (
                    <AdvancedMarker
                        position={{ lat: validLat, lng: validLng }} // Actualizar la posición del marcador
                        clickable={true}
                        onClick={handleMarkerClick}
                    >
                        <Pin
                            background={"#FEC52E"}
                            glyphColor={"#000"}
                            borderColor={"#000"}
                        />
                    </AdvancedMarker>
                )}
            </Map>
            <h2>Latitud: {validLat !== null ? validLat : "No válida"}</h2>
            <h2>Longitud: {validLng !== null ? validLng : "No válida"}</h2>
            <h2>mapCenter: {JSON.stringify(mapCenter)}</h2>
        </APIProvider>
    );
}

export default Mapa;
