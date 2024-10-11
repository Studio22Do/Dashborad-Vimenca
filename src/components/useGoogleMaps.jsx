import { useEffect, useState } from "react";

let isScriptLoaded = false; // Variable global para rastrear la carga del script
let isScriptLoading = false; // Variable para rastrear si el script está en proceso de carga

function useGoogleMaps(apiKey) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isScriptLoaded) {
            setIsLoaded(true);
            return;
        }

        if (isScriptLoading) {
            const checkScriptLoaded = setInterval(() => {
                if (isScriptLoaded) {
                    setIsLoaded(true);
                    clearInterval(checkScriptLoaded);
                }
            }, 100);
            return;
        }

        const existingScript = document.getElementById("googleMaps");

        if (!existingScript) {
            isScriptLoading = true;
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            script.id = "googleMaps";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                if (window.google) {
                    console.log("Google Maps API loaded successfully");
                    isScriptLoaded = true;
                    isScriptLoading = false;
                    setIsLoaded(true);
                }
            };

            script.onerror = () => {
                console.error("Error loading Google Maps API");
                isScriptLoading = false;
            };
        } else {
            console.log("Google Maps API script already exists.");
            isScriptLoaded = true;
            setIsLoaded(true);
        }
    }, [apiKey]);

    return isLoaded;
}

export default useGoogleMaps;
