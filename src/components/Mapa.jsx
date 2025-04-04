import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    useMap,
    useMapsLibrary
} from "@vis.gl/react-google-maps";

// Componente para el autocompletado
const SearchBox = ({ onMapPan }) => {
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);
    const map = useMap();
    const places = useMapsLibrary("places");
    
    useEffect(() => {
        if (!places || !map || !inputRef.current) return;
        
        try {
            console.log("Inicializando autocomplete...");
            
            // Crear el autocomplete en el input
            autocompleteRef.current = new places.Autocomplete(inputRef.current, {
                types: ['geocode'],
                fields: ['geometry', 'formatted_address', 'name']
            });
            
            // Vincular al mapa para mejorar las sugerencias
            autocompleteRef.current.bindTo('bounds', map);
            
            // Escuchar el evento place_changed
            autocompleteRef.current.addListener('place_changed', () => {
                console.log("Evento place_changed activado");
                
                const place = autocompleteRef.current.getPlace();
                console.log("Lugar seleccionado:", place);
                
                if (!place.geometry || !place.geometry.location) {
                    console.warn("⚠️ No se encontraron detalles de geometría para esta ubicación");
                    return;
                }
                
                const newLat = place.geometry.location.lat();
                const newLng = place.geometry.location.lng();
                
                console.log(`✓ Coordenadas obtenidas: ${newLat}, ${newLng}`);
                console.log(`✓ Dirección: ${place.formatted_address || place.name || 'Sin nombre'}`);
                
                // Llamar explícitamente a la función para mover el mapa
                console.log("Llamando a onMapPan...");
                onMapPan(newLat, newLng);
                
                // Ajustar el nivel de zoom directamente en el mapa
                console.log("Ajustando zoom...");
                if (place.geometry.viewport) {
                    console.log("Ajustando a viewport");
                    map.fitBounds(place.geometry.viewport);
                } else {
                    console.log("Centrando en la ubicación");
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
                
                console.log("Proceso completado");
            });
            
            console.log("Autocomplete inicializado correctamente");
        } catch (error) {
            console.error("Error al inicializar autocomplete:", error);
        }
    }, [places, map, onMapPan]);
    
    return (
        <input
            ref={inputRef}
            type="text"
            placeholder="Buscar ubicación..."
            className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    );
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
    const mapRef = useRef(null);

    useEffect(() => {
        if (validLat !== null && validLng !== null) {
            setMapCenter({ lat: validLat, lng: validLng });
            setShouldCenter(true);
        }
    }, [validLat, validLng]);

    useEffect(() => {
        if (shouldCenter && mapRef.current) {
            console.log(`Centrando mapa en: ${mapCenter.lat}, ${mapCenter.lng}`);
            mapRef.current.panTo(mapCenter);
        }
    }, [mapCenter, shouldCenter]);

    const handleMapLoad = (map) => {
        mapRef.current = map;
        console.log("Mapa cargado correctamente");
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
        const newLat = latLng.lat;
        const newLng = latLng.lng;
        console.log(`Mapa clickeado en: ${newLat}, ${newLng}`);
        setLatitud(newLat);
        setLongitud(newLng);
        setShowMarker(true);
    }, [setLatitud, setLongitud]);

    const handleInputChange = useCallback((e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            if (e.target.name === 'latitud') {
                setLatitud(value);
            } else if (e.target.name === 'longitud') {
                setLongitud(value);
            }
            setShowMarker(true);
        }
    }, [setLatitud, setLongitud]);

    // Función explícita para mover el mapa sin poner marcador
    const handleMapPan = useCallback((newLat, newLng) => {
        console.log(`MOVIENDO MAPA A: ${newLat}, ${newLng} (sin marcador)`);
        setMapCenter({ lat: newLat, lng: newLng });
        setShouldCenter(true);
    }, []);

    return (
        <div className="flex flex-col gap-4 w-full h-[400px]">
            <APIProvider
                apiKey={apiKey}
                onError={handleApiError}
                libraries={["places"]}
            >
                <div className="w-full mb-2">
                    <SearchBox onMapPan={handleMapPan} />
                </div>
                
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
