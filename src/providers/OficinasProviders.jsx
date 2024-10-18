import React, { useState, useEffect, useCallback, useMemo, useContext } from "react";
import axios from "axios";
import { useUserContext } from "./UserProvider";

const ItemsOficinasContext = React.createContext();


const serverUrl = import.meta.env.VITE_SERVER_URL;


function useItemsOficinasContext() {
    return useContext(ItemsOficinasContext);
}

const getOficinas = async (token) => {
    const response = await axios.get(`${serverUrl}/sucursales/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

function OficinasProviders({ children }) {
    const [itemsOficinas, setItemsOficinas] = useState({
        sucursales: [],
        representantes: [],
        estafetas: [],
    });
    
    console.log("itemsOficinas despues de declarar: ", itemsOficinas);

    const { token } = useUserContext();

    const updateOficinaInDB = useCallback(
        
        (id, updatedOficina) => {
            console.log("se ejecuto la funcion de editar en oficinasproviers")
            return axios
                .put(`${serverUrl}/sucursales/${id}`, updatedOficina, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => response.data)
                .then(getOficinas(token))
                .catch((error) => {
                    console.error(
                        "Error updating office:",
                        error.response ? error.response.data : error.message
                    );
                    throw error;
                });
        },
        [token]
    );

    const addOficina = useCallback(
        async (newOficina, tipo) => {
            try {
                const response = await axios.post(
                    `${serverUrl}/sucursales/`,
                    newOficina,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setItemsOficinas((prevItems) => ({
                    ...prevItems,
                    [tipo]: [...prevItems[tipo], response.data],
                }));
            } catch (error) {
                console.error(
                    "Error adding office:",
                    error.response ? error.response.data : error.message
                );
            }
        },
        [token]
    );

    const deleteOficina = useCallback(
        (id, tipo) => {
            axios
                .delete(`${serverUrl}/sucursales/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(() => {
                    setItemsOficinas((prevItems) => ({
                        ...prevItems,
                        [tipo]: prevItems[tipo].filter(
                            (item) => item.id !== id
                        ),
                    }));
                })
                .catch((error) => {
                    console.error(
                        "Error deleting office:",
                        error.response ? error.response.data : error.message
                    );
                });
        },
        [token]
    );

    useEffect(() => {
        const fetchOficinas = async () => {
            if (token) {
                const data = await getOficinas(token);
                console.log("data desde oficinas", data);
                setItemsOficinas({
                    sucursales: data.filter((d) => d.tipo_de_oficina
                    === "Sucursal"),
                    representantes: data.filter(
                        (d) => d.tipo_de_oficina === "Representante"
                    ),
                    estafetas: data.filter((d) => d.tipo_de_oficina === "Estafeta"),
                });
                
            }
        };
        fetchOficinas();
        
    }, [token]); // Agregar token como dependencia

    useEffect(() => {
        console.log("itemsOficinas después de set: ********** ", itemsOficinas);
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
