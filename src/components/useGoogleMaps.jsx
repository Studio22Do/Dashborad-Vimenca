import { useEffect, useState } from "react";

let isScriptLoaded = false;
let isScriptLoading = false;

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
            return () => clearInterval(checkScriptLoaded);
        }

        const existingScript = document.getElementById("googleMaps");

        if (!existingScript) {
            isScriptLoading = true;
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async&callback=Function.prototype`;
            script.id = "googleMaps";
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

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
                isScriptLoaded = false;
            };
        } else {
            console.log("Google Maps API script already exists.");
            isScriptLoaded = true;
            setIsLoaded(true);
        }

        return () => {
            if (existingScript) {
                existingScript.remove();
                isScriptLoaded = false;
                isScriptLoading = false;
            }
        };
    }, [apiKey]);

    return isLoaded;
}

export default useGoogleMaps;
