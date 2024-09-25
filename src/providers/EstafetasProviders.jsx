import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "./UserProvider";
const EstafetasContext = React.createContext();
const ItemsEstafetasContext = React.createContext();
const OnEditEstafetaContext = React.createContext();

const serverUrl = import.meta.env.VITE_SERVER_URL;

let data = [];
/* [
        {
            "id": 1,
            "nombre": "VIMENCA - OFICINA PRINCIPAL",
            "direccion": "Avenida Abraham Lincoln No. 306",
            "Provincia": "Santo Domingo",
            "Latitud": 18.461822,
            "Longitud": -69.928519,
            "Lunes - Viernes": "07:30AM - 11:00PM",
            "Sábado": "08:00AM - 11:00PM",
            "Domingo": "08:00AM - 12:00PM",
            "Teléfono": "(809) 532-7381",
            "Agente de Cambio": "NO",
            "Vimenpaq": "SI",
            "PagaTodo": "NO",
            "Banco Vimenca": "NO",
            "Tipo de Oficina": "Sucursal"
        },
        {
            "id": 2,
            "nombre": "VIMENCA - OFICINA SANTO DOMINGO ESTE",
            "direccion": "Avenida San Vicente de Paúl No. 100",
            "Provincia": "Santo Domingo",
            "Latitud": 18.500000,
            "Longitud": -69.900000,
            "Lunes - Viernes": "07:30AM - 10:00PM",
            "Sábado": "08:00AM - 10:00PM",
            "Domingo": "08:00AM - 10:00PM",
            "Teléfono": "(809) 123-4567",
            "Agente de Cambio": "SI",
            "Vimenpaq": "NO",
            "PagaTodo": "SI",
            "Banco Vimenca": "SI",
            "Tipo de Oficina": "Sucursal"
        },
        
        
    ] */

function useEstafetasContext() {
    return useContext(EstafetasContext);
}

function useItemsEstafetasContext() {
    return useContext(ItemsEstafetasContext);
}

function useEditEstafeta() {
    const context = useContext(OnEditEstafetaContext);
    if (context === undefined) {
        throw new Error(
            "useEditEstafeta must be used within a OnEditEstafetaProvider"
        );
    }
    return context;
}

const getEstafetas = (token, setItemsEstafetas) => {
    axios
        .get(`${serverUrl}/sucursales/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setItemsEstafetas(response.data); // Actualiza el estado con los nuevos datos
            console.log("Datos obtenidos de la API:", response.data);
        })
        .catch((error) => console.error("Error fetching data:", error.response ? error.response.data : error.message));
};

function EstafetasProviders({ children }) {
    const [activeEstafeta, setActiveEstafeta] = useState(0);
    const [ItemsEstafetas, setItemsEstafetas] = useState([]); // Inicializar como un array vacío
    const [editEstafeta, setEditEstafeta] = useState(null); // Estado para la estafeta en edición
    const { token } = useUserContext();
    const updateEstafeta = (updatedEstafeta) => {
        setItemsEstafetas((prevItems) =>
            prevItems.map((item) =>
                item.id === updatedEstafeta.id ? updatedEstafeta : item
            )
        );
    };
    
    const updateEstafetaInDB = (id, updatedOficina, token) => {
        console.log("Actualizando estafeta en la base de datos con ID:", id);
        console.log("Datos enviados a la API:", updatedOficina);

        return axios
            .put(`${serverUrl}/sucursales/${id}`, updatedOficina, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log("Respuesta de la API al actualizar:", response.data);
                return response.data; // Retorna la respuesta de la API
            })
            .catch((error) => {
                console.error("Error updating office:", error.response ? error.response.data : error.message);
                throw error; // Lanza el error para manejarlo en el componente
            });
    };

    const addEstafeta = (newEstafeta) => {
        setItemsEstafetas((prevItems) => [...prevItems, newEstafeta]);
    };

    const deleteEstafeta = (id, token) => {
        console.log("Eliminando estafeta con ID:", id); // Para depuración
        console.log("Token utilizado:", token); // Verifica el token

        axios
            .delete(`${serverUrl}/sucursales/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Asegúrate de que el token sea correcto
                },
            })
            .then(() => {
                setItemsEstafetas(
                    (prevItems) => prevItems.filter((item) => item.id !== id) // Cambia a !== para eliminar correctamente
                );
            })
            .catch((error) => {
                console.error(
                    "Error deleting item:",
                    error.response ? error.response.data : error.message
                );
            });
    };

    useEffect(() => {
        if (token) {
            // Verifica si hay un token antes de hacer la petición
            axios
                .get(`${serverUrl}/sucursales/`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Agregar el token en los encabezados
                    },
                })
                .then((response) => {
                    setItemsEstafetas(response.data); // Usar response.data directamente
                    console.log(response.data); // Mostrar los datos en consola
                })
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [token/* , ItemsEstafetas */]); // Dependencias del token y ItemsEstafetas

    return (
        <EstafetasContext.Provider
            value={{ activeEstafeta, setActiveEstafeta }}
        >
            <ItemsEstafetasContext.Provider
                value={{
                    ItemsEstafetas,
                    setItemsEstafetas,
                    updateEstafetaInDB,
                    addEstafeta,
                    deleteEstafeta,
                }}
            >
                <OnEditEstafetaContext.Provider
                    value={{ editEstafeta, setEditEstafeta }}
                >
                    {children}
                </OnEditEstafetaContext.Provider>
            </ItemsEstafetasContext.Provider>
        </EstafetasContext.Provider>
    );
}

export {
    EstafetasProviders,
    useEstafetasContext,
    useItemsEstafetasContext,
    useEditEstafeta,
    getEstafetas, // Asegúrate de que esta línea esté aquí
};
