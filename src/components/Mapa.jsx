import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    useMap,
    useMapsLibrary
} from "@vis.gl/react-google-maps";

// Variable global para almacenar la referencia del mapa
window.googleMapRef = null;

// Componente para cargar la API de Google Maps y exponerla globalmente
const MapLibraryLoader = () => {
    const places = useMapsLibrary("places");
    const geocoding = useMapsLibrary("geocoding");
    const map = useMap();
    
    useEffect(() => {
        if (!geocoding || !places || !map) return;
        
        console.log("Librerías cargadas:", { places: !!places, geocoding: !!geocoding, map: !!map });
        
        // Guardar la referencia del mapa en la variable global
        window.googleMapRef = map;
        
        // Exponer la API de geocodificación en window para que pueda ser utilizada desde otros componentes
        if (!window.googleMapsApiLoaded) {
            window.googleMapsApiLoaded = true;
            window.googleMapsGeocoder = new geocoding.Geocoder();
            // También exponer la API de Places
            window.googleMapsPlaces = places;
            console.log("API de Google Maps cargada y geocoder inicializado");
        }
    }, [geocoding, places, map]);
    
    return null;
};

// Función global para centrar el mapa
window.centerMapAtLocation = (lat, lng) => {
    console.log(`Intentando centrar mapa en: ${lat}, ${lng}`);
    
    // Función para formatear coordenadas a máximo 8 decimales
    const formatCoordinate = (value) => {
        if (value === null || value === undefined) return null;
        // Convertir a número y limitar a 8 decimales
        return Number(Number(value).toFixed(8));
    };
    
    // Formatear las coordenadas
    const formattedLat = formatCoordinate(lat);
    const formattedLng = formatCoordinate(lng);
    
    if (window.googleMapRef) {
        console.log("Mapa encontrado, centrando...");
        window.googleMapRef.panTo({ lat: formattedLat, lng: formattedLng });
        window.googleMapRef.setZoom(16);
        
        // Notificar que se ha centrado el mapa
        if (window.onMapCentered) {
            window.onMapCentered(formattedLat, formattedLng);
        }
        
        return true;
    } else {
        console.warn("Mapa no disponible todavía");
        // Intentar de nuevo en un momento
        setTimeout(() => {
            if (window.googleMapRef) {
                console.log("Mapa encontrado en segundo intento, centrando...");
                window.googleMapRef.panTo({ lat: formattedLat, lng: formattedLng });
                window.googleMapRef.setZoom(16);
                
                // Notificar que se ha centrado el mapa
                if (window.onMapCentered) {
                    window.onMapCentered(formattedLat, formattedLng);
                }
            } else {
                console.error("Mapa no disponible después de esperar");
            }
        }, 500);
        return false;
    }
};

const Mapa = React.memo(({ setLatitud, setLongitud, latitud, longitud }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    const mapId = "YOUR_MAP_ID";
    
    let defaultLocation = { lat: 19.049289, lng: -70.317498 };
    
    const validLat = typeof latitud === "number" ? latitud : null;
    const validLng = typeof longitud === "number" ? longitud : null;
    
    const [mapCenter, setMapCenter] = useState(defaultLocation);
    const [shouldCenter, setShouldCenter] = useState(true);
    const [showMarker, setShowMarker] = useState(true);
    const [temporaryMarker, setTemporaryMarker] = useState(null);
    const mapRef = useRef(null);
    
    // Coordenadas anteriores para detectar cambios
    const prevCoords = useRef({ lat: null, lng: null });

    useEffect(() => {
        if (validLat !== null && validLng !== null) {
            // Verificar si las coordenadas han cambiado realmente
            const hasChanged = prevCoords.current.lat !== validLat || prevCoords.current.lng !== validLng;
            
            if (hasChanged) {
                console.log(`Nuevas coordenadas detectadas: ${validLat}, ${validLng}`);
                prevCoords.current = { lat: validLat, lng: validLng };
                
                setMapCenter({ lat: validLat, lng: validLng });
                setShouldCenter(true);
                setShowMarker(true);
                setTemporaryMarker(null); // Eliminar cualquier marcador temporal
                
                // Al actualizar las coordenadas, asegurarnos de centrar el mapa
                window.centerMapAtLocation(validLat, validLng);
            }
        }
    }, [validLat, validLng]);

    // Función para formatear coordenadas a máximo 8 decimales
    const formatCoordinate = (value) => {
        if (value === null || value === undefined) return null;
        // Convertir a número y limitar a 8 decimales
        return Number(Number(value).toFixed(8));
    };

    // Función para centrar el mapa en una posición temporal sin cambiar los inputs
    // Esta función será llamada desde los componentes FormCard y EditCard al buscar direcciones
    const centerMapTemporarily = useCallback((tmpLat, tmpLng) => {
        console.log(`Centrando mapa temporalmente en: ${tmpLat}, ${tmpLng}`);
        
        // Formatear las coordenadas
        const formattedLat = formatCoordinate(tmpLat);
        const formattedLng = formatCoordinate(tmpLng);
        
        const centered = window.centerMapAtLocation(formattedLat, formattedLng);
        
        // Configurar el marcador temporal solo si pudimos centrar el mapa
        if (centered) {
            setTemporaryMarker({ lat: formattedLat, lng: formattedLng });
            console.log("Marker temporal establecido en:", formattedLat, formattedLng);
        }
        
        // En caso de que el mapa aún no se haya centrado, configurar un callback
        window.onMapCentered = (lat, lng) => {
            // Formatear las coordenadas
            const formattedLat = formatCoordinate(lat);
            const formattedLng = formatCoordinate(lng);
            
            setTemporaryMarker({ lat: formattedLat, lng: formattedLng });
            console.log("Marker temporal establecido después de centrar en:", formattedLat, formattedLng);
            // Limpiar callback
            window.onMapCentered = null;
        };
    }, []);

    // Exponer la función de centrado temporal para que pueda ser usada desde componentes externos
    useEffect(() => {
        console.log("Exponiendo función centerMapTemporarily...");
        window.centerMapTemporarily = centerMapTemporarily;
        
        return () => {
            // Limpiar cuando el componente se desmonte
            console.log("Eliminando función centerMapTemporarily...");
            delete window.centerMapTemporarily;
        };
    }, [centerMapTemporarily]);

    useEffect(() => {
        if (shouldCenter && mapRef.current) {
            console.log(`Centrando mapa en: ${mapCenter.lat}, ${mapCenter.lng}`);
            mapRef.current.panTo(mapCenter);
        }
    }, [mapCenter, shouldCenter]);

    const handleMapLoad = (map) => {
        mapRef.current = map;
        window.googleMapRef = map; // También guardar aquí para estar seguros
        console.log("Mapa cargado correctamente");
        
        // Si hay un marcador temporal pendiente, mostrarlo ahora
        if (window.pendingTemporaryMarker) {
            const { lat, lng } = window.pendingTemporaryMarker;
            delete window.pendingTemporaryMarker;
            
            setTemporaryMarker({ lat, lng });
            map.panTo({ lat, lng });
            map.setZoom(16);
        }
    };

    const handleMapDragStart = () => {
        setShouldCenter(false);
    };

    const handleApiError = (error) => {
        console.error("Error al cargar la API de Google Maps:", error);
        alert(
            "No se pudo cargar el mapa. Por favor verifica tu conexión a Internet o la clave de API."
        );
    };

    const handleMarkerClick = useCallback((ev) => {
        if (!ev.latLng) return;
        console.log("Marcador clickeado en:", ev.latLng.lat(), ev.latLng.lng());
    }, []);

    const handleMapClick = useCallback((ev) => {
        const latLng = ev.detail?.latLng;
        if (!latLng) {
            console.log("No se pudo obtener latLng del evento");
            return;
        }
        const newLat = formatCoordinate(latLng.lat);
        const newLng = formatCoordinate(latLng.lng);
        console.log(`Mapa clickeado en: ${newLat}, ${newLng}`);
        setLatitud(newLat);
        setLongitud(newLng);
        setShowMarker(true);
        setTemporaryMarker(null); // Eliminar marcador temporal al hacer clic
    }, [setLatitud, setLongitud]);

    const handleInputChange = useCallback((e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            if (e.target.name === 'latitud') {
                setLatitud(formatCoordinate(value));
            } else if (e.target.name === 'longitud') {
                setLongitud(formatCoordinate(value));
            }
            setShowMarker(true);
            setTemporaryMarker(null); // Eliminar marcador temporal al cambiar inputs
        }
    }, [setLatitud, setLongitud]);

    return (
        <div className="flex flex-col gap-4 w-full h-[400px]">
            <APIProvider
                apiKey={apiKey}
                onError={handleApiError}
                libraries={["places", "geocoding"]}
            >
                <MapLibraryLoader />
                
                <div className="w-full h-[400px]">
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
                        {/* Mostrar el marcador permanente si existe y está visible */}
                        {showMarker && validLat !== null && validLng !== null && (
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
                        
                        {/* Mostrar un marcador temporal para las búsquedas */}
                        {temporaryMarker && (
                            <AdvancedMarker
                                position={{ lat: temporaryMarker.lat, lng: temporaryMarker.lng }}
                                clickable={true}
                                onClick={(ev) => {
                                    // Al hacer clic en el marcador temporal, establecer sus coordenadas como permanentes
                                    setLatitud(formatCoordinate(temporaryMarker.lat));
                                    setLongitud(formatCoordinate(temporaryMarker.lng));
                                    setTemporaryMarker(null);
                                }}
                            >
                                <Pin
                                    background={"#3B82F6"} // Azul para diferenciar del marcador permanente
                                    glyphColor={"#FFF"}
                                    borderColor={"#2563EB"}
                                />
                            </AdvancedMarker>
                        )}
                    </Map>
                </div>
                
                <div className="flex justify-center gap-4 mt-2">
                    <label>
                        Latitud:
                        <input
                            type="number"
                            name="latitud"
                            value={latitud !== null ? latitud : ''}
                            onChange={handleInputChange}
                            placeholder="Latitud"
                            step="any"
                            className="p-2 border border-gray-300 rounded-md w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </label>
                    <label>
                        Longitud:
                        <input
                            type="number"
                            name="longitud"
                            value={longitud !== null ? longitud : ''}
                            onChange={handleInputChange}
                            placeholder="Longitud"
                            step="any"
                            className="p-2 border border-gray-300 rounded-md w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </label>
                </div>
            </APIProvider>
        </div>
    );
});

export default Mapa;
