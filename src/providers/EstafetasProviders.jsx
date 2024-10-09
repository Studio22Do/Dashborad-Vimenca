import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useUserContext } from "./UserProvider";
const EstafetasContext = React.createContext();
const ItemsEstafetasContext = React.createContext();
const OnEditEstafetaContext = React.createContext();

const serverUrl = import.meta.env.VITE_SERVER_URL;

const getEstafetas = async (token) => {
    const response = await axios.get(`${serverUrl}/sucursales/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

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

function EstafetasProviders({ children }) {
    const [activeEstafeta, setActiveEstafeta] = useState(0);
    const [ItemsEstafetas, setItemsEstafetas] = useState([]); // Inicializar como un array vacío
    const [editEstafeta, setEditEstafeta] = useState(null); // Estado para la estafeta en edición
    const { token } = useUserContext();

    const updateEstafeta = useCallback((updatedEstafeta) => {
        setItemsEstafetas((prevItems) =>
            prevItems.map((item) =>
                item.id === updatedEstafeta.id ? updatedEstafeta : item
            )
        );
    }, []);

    const updateEstafetaInDB = useCallback((id, updatedOficina, token) => {
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
    }, []);

    const addEstafeta = useCallback(async (newEstafeta) => {
        try {
            const response = await axios.post(`${serverUrl}/sucursales/`, newEstafeta, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItemsEstafetas((prevItems) => [...prevItems, response.data]); // Agrega la nueva estafeta a la lista
            console.log("Estafeta agregada:", response.data);
        } catch (error) {
            console.error("Error adding estafeta:", error.response ? error.response.data : error.message);
        }
    }, [token]);

    const deleteEstafeta = useCallback((id, token) => {
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
    }, []);

    

    useEffect(() => {
        const fetchEstafetas = async () => {
            if (token && ItemsEstafetas.length === 0) {
                console.log("rrr")
                const data = await getEstafetas(token);
                console.log(data)
                setItemsEstafetas(data);
            }
        };
        fetchEstafetas();
    }, []);

    const estafetasContextValue = useMemo(() => ({
        activeEstafeta,
        setActiveEstafeta
    }), [activeEstafeta]);

    const itemsEstafetasContextValue = useMemo(() => ({
        ItemsEstafetas,
        setItemsEstafetas,
        updateEstafetaInDB,
        addEstafeta,
        deleteEstafeta,
    }), [ItemsEstafetas, updateEstafetaInDB, addEstafeta, deleteEstafeta]);

    const onEditEstafetaContextValue = useMemo(() => ({
        editEstafeta,
        setEditEstafeta
    }), [editEstafeta]);

    return (
        <EstafetasContext.Provider value={estafetasContextValue}>
            <ItemsEstafetasContext.Provider value={itemsEstafetasContextValue}>
                <OnEditEstafetaContext.Provider value={onEditEstafetaContextValue}>
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