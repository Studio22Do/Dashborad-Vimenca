import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { useUserContext } from "./UserProvider";

const OficinasContext = React.createContext();
const ItemsOficinasContext = React.createContext();
const OnEditOficinasContext = React.createContext();

const serverUrl = import.meta.env.VITE_SERVER_URL;

const getOficinas = async (token) => {
    const response = await axios.get(`${serverUrl}/sucursales/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

function OficinasProviders({ children }) {
    const [activeOficinas, setActiveOficinas] = useState(0);
    const [itemsOficinas, setItemsOficinas] = useState([]);
    const [editOficinas, setEditOficinas] = useState(null);
    const { token } = useUserContext();

    const updateOficinaInDB = useCallback((id, updatedOficina) => {
        return axios
            .put(`${serverUrl}/sucursales/${id}`, updatedOficina, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error updating office:", error.response ? error.response.data : error.message);
                throw error;
            });
    }, [token]);

    const addOficina = useCallback(async (newOficina) => {
        try {
            const response = await axios.post(`${serverUrl}/sucursales/`, newOficina, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setItemsOficinas((prevItems) => [...prevItems, response.data]);
        } catch (error) {
            console.error("Error adding office:", error.response ? error.response.data : error.message);
        }
    }, [token]);

    const deleteOficina = useCallback((id) => {
        axios
            .delete(`${serverUrl}/sucursales/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                setItemsOficinas((prevItems) => prevItems.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting office:", error.response ? error.response.data : error.message);
            });
    }, [token]);

    useEffect(() => {
        const fetchOficinas = async () => {
            if (token && itemsOficinas.length === 0) {
                const data = await getOficinas(token);
                setItemsOficinas(data);
            }
        };
        fetchOficinas();
    }, [token, itemsOficinas.length]);

    const oficinasContextValue = useMemo(() => ({
        activeOficinas,
        setActiveOficinas
    }), [activeOficinas]);

    const itemsOficinasContextValue = useMemo(() => ({
        itemsOficinas,
        setItemsOficinas,
        updateOficinaInDB,
        addOficina,
        deleteOficina,
    }), [itemsOficinas, updateOficinaInDB, addOficina, deleteOficina]);

    const onEditOficinasContextValue = useMemo(() => ({
        editOficinas,
        setEditOficinas
    }), [editOficinas]);

    return (
        <OficinasContext.Provider value={oficinasContextValue}>
            <ItemsOficinasContext.Provider value={itemsOficinasContextValue}>
                <OnEditOficinasContext.Provider value={onEditOficinasContextValue}>
                    {children}
                </OnEditOficinasContext.Provider>
            </ItemsOficinasContext.Provider>
        </OficinasContext.Provider>
    );
}

export default OficinasProviders;
