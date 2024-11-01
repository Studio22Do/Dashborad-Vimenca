import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin
} from "@vis.gl/react-google-maps";

const Mapa = React.memo(({ setLatitud, setLongitud, latitud, longitud }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    const mapId = "YOUR_MAP_ID";
    
    let defaultLocation = { lat: 19.049289, lng: -70.317498 };
    
    const validLat = typeof latitud === "number" ? latitud : null;
    const validLng = typeof longitud === "number" ? longitud : null;
    
    const [mapCenter, setMapCenter] = useState(defaultLocation);

    useEffect(() => {
        if (validLat !== null && validLng !== null) {
            setMapCenter({ lat: validLat, lng: validLng });
            setShouldCenter(true);
        } else {
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
        setShouldCenter(false);
    };

    const handleApiLoad = () => {
    };

    const handleApiError = () => {
        console.error("Error al cargar la API de Google Maps.");
        alert(
            "No se pudo cargar el mapa. Por favor verifica tu conexión a Internet o la clave de API."
        );
    };

    const handleMarkerClick = useCallback((ev) => {
        if (!ev.latLng) return;
    }, []);

    const handleMapClick = useCallback((ev) => {
        const latLng = ev.detail?.latLng;
        if (!latLng) {
            console.log("No se pudo obtener latLng del evento");
            return;
        }
        const newLat = latLng.lat;
        const newLng = latLng.lng;
        setLatitud(newLat);
        setLongitud(newLng);
    }, [setLatitud, setLongitud]);

    return (
        <APIProvider
            apiKey={apiKey}
            onLoad={handleApiLoad}
            onError={handleApiError}
        >
            <Map
                style={{ width: '100%', height: '100%' }}
                defaultZoom={8}
                defaultCenter={defaultLocation}
                mapId={mapId}
                options={{
                    draggable: true,
                    scrollwheel: true,
                    disableDoubleClickZoom: false,
                    zoomControl: true,
                    mapTypeControl: true,
                    streetViewControl: true,
                    fullscreenControl: true
                }}
                onClick={handleMapClick}
                onDragStart={handleMapDragStart}
                onLoad={handleMapLoad}
            >
                {validLat !== null && validLng !== null && (
                    <AdvancedMarker
                        position={{ lat: validLat, lng: validLng }}
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
        </APIProvider>
    );
});

export default Mapa;
