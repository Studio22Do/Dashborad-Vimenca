import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    useMap
} from "@vis.gl/react-google-maps";

// Componente separado para el autocompletado
const SearchBox = ({ onPlaceSelect }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef(null);
    const map = useMap();
    
    useEffect(() => {
        if (!map || !window.google || !searchInputRef.current) return;
        
        const autocomplete = new window.google.maps.places.Autocomplete(
            searchInputRef.current,
            { types: ['geocode'] }
        );
        
        autocomplete.bindTo('bounds', map);
        
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            
            if (!place.geometry || !place.geometry.location) {
                console.warn("No se encontraron detalles para esta ubicación");
                return;
            }
            
            const newLat = place.geometry.location.lat();
            const newLng = place.geometry.location.lng();
            
            if (onPlaceSelect) {
                onPlaceSelect(newLat, newLng);
            }
            
            // Ajustar el nivel de zoom
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
        });
        
        // Limpiar
        return () => {
            window.google.maps.event.clearInstanceListeners(autocomplete);
        };
    }, [map, onPlaceSelect]);
    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    
    return (
        <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
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
    const mapRef = useRef(null);

    useEffect(() => {
        if (validLat !== null && validLng !== null) {
            setMapCenter({ lat: validLat, lng: validLng });
            setShouldCenter(true);
        }
    }, [validLat, validLng]);

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

    const handleInputChange = useCallback((e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            if (e.target.name === 'latitud') {
                setLatitud(value);
            } else if (e.target.name === 'longitud') {
                setLongitud(value);
            }
        }
    }, [setLatitud, setLongitud]);

    const handlePlaceSelect = useCallback((newLat, newLng) => {
        setLatitud(newLat);
        setLongitud(newLng);
        setMapCenter({ lat: newLat, lng: newLng });
        setShouldCenter(true);
    }, [setLatitud, setLongitud]);

    return (
        <div className="flex flex-col gap-4 w-full h-[400px]">
            <APIProvider
                apiKey={apiKey}
                onError={handleApiError}
                libraries={["places"]}
            >
                <div className="w-full">
                    <SearchBox onPlaceSelect={handlePlaceSelect} />
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
                </div>
                
                <div className="flex justify-center gap-4">
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
