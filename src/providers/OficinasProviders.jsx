import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useContext,
} from "react";
import axios from "axios";
import { useUserContext } from "./UserProvider";

const ItemsOficinasContext = React.createContext();

const serverUrl = import.meta.env.VITE_SERVER_URL;

function useItemsOficinasContext() {
    return useContext(ItemsOficinasContext);
}

const getOficinas = async (token) => {
    const response = await axios.get(`${serverUrl}/sucursales/`, {
        /* headers: {
            Authorization: `Bearer ${token}`,
        }, */
    });
    return response.data;
};

function OficinasProviders({ children }) {
    const [itemsOficinas, setItemsOficinas] = useState({
        sucursales: [],
        representantes: [],
        estafetas: [],
    });


    const { token } = useUserContext();

    const updateOficinaInDB = useCallback(
        async (id, updatedOficina) => {
            try {
                const response = await axios.put(
                    `${serverUrl}/sucursales/${id}/`, // Añadimos la barra al final
                    updatedOficina,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                
                const newData = await getOficinas(token);
                setItemsOficinas({
                    sucursales: newData.filter(d => d.tipo_de_oficina === "Sucursal"),
                    representantes: newData.filter(d => d.tipo_de_oficina === "Representante"),
                    estafetas: newData.filter(d => d.tipo_de_oficina === "Estafeta")
                });
                
                return response.data;
            } catch (error) {
                console.error("Error updating office:", error.response?.data || error.message);
                throw error;
            }
        },
        [token]
    );
    const addOficina = useCallback(
        async (newOficina, tipo) => {
            try {
                await axios.post(`${serverUrl}/sucursales/`, newOficina, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Obtener los datos actualizados después de agregar la nueva oficina
                const data = await getOficinas(token);
                // Actualizar el estado con los datos filtrados
                setItemsOficinas({
                    sucursales: data.filter(
                        (d) => d.tipo_de_oficina === "Sucursal"
                    ),
                    representantes: data.filter(
                        (d) => d.tipo_de_oficina === "Representante"
                    ),
                    estafetas: data.filter(
                        (d) => d.tipo_de_oficina === "Estafeta"
                    ),
                });
            } catch (error) {
                console.error(
                    "Error al agregar oficina:",
                    error.response ? error.response.data : error.message
                );
                throw error;
            }
        },
        [token]
    );

    const deleteOficina = useCallback(
        async (id, tipo) => {
            try {
                await axios.delete(`${serverUrl}/sucursales/${id}/`, { // Añadir barra al final
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
    
                // Obtener los datos actualizados después de eliminar la oficina
                const data = await getOficinas(token);
    
                // Actualizar el estado con los datos filtrados
                setItemsOficinas({
                    sucursales: data.filter(d => d.tipo_de_oficina === "Sucursal"),
                    representantes: data.filter(d => d.tipo_de_oficina === "Representante"),
                    estafetas: data.filter(d => d.tipo_de_oficina === "Estafeta")
                });
            } catch (error) {
                console.error("Error al eliminar oficina:", error.response?.data || error.message);
                alert("Error al eliminar oficina");
                throw error;
            }
        },
        [token]
    );

    useEffect(() => {
        const fetchOficinas = async () => {
            if (token) {
                const data = await getOficinas(token);
                
                setItemsOficinas({
                    sucursales: data.filter(
                        (d) => d.tipo_de_oficina === "Sucursal"
                    ),
                    representantes: data.filter(
                        (d) => d.tipo_de_oficina === "Representante"
                    ),
                    estafetas: data.filter(
                        (d) => d.tipo_de_oficina === "Estafeta"
                    ),
                });
            }
        };
        fetchOficinas();
    }, [token]); // Agregar token como dependencia

    useEffect(() => {
    }, [itemsOficinas]); // Este efecto se ejecutará cada vez que itemsOficinas cambie

    const itemsOficinasContextValue = useMemo(
        () => ({
            itemsOficinas,
            setItemsOficinas,
            updateOficinaInDB,
            addOficina,
            deleteOficina,
        }),
        [itemsOficinas, updateOficinaInDB, addOficina, deleteOficina]
    );

    return (
        <ItemsOficinasContext.Provider value={itemsOficinasContextValue}>
            {children}
        </ItemsOficinasContext.Provider>
    );
}

export { OficinasProviders, useItemsOficinasContext };
