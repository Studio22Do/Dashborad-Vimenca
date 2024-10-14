import React, { useState, useContext, useMemo, useCallback, useEffect } from "react";
import { useItemsEstafetasContext } from "./EstafetasProviders";

// Crear el contexto para Representantes
const RepresentantesContext = React.createContext();
const OnEditRepresentanteContext = React.createContext();
const ItemsRepresentantesContext = React.createContext();

// Hook para usar el contexto de Representantes
function useRepresentantesContext() {
    const context = useContext(RepresentantesContext);
    if (context === undefined) {
        throw new Error("useRepresentantesContext must be used within a RepresentantesProvider");
    }
    return context;
}

function useEditRepresentante() {
    const context = useContext(OnEditRepresentanteContext);
    if (context === undefined) {
        throw new Error("useEditRepresentante must be used within a RepresentantesProvider");
    }
    return context;
}

// Nuevo hook para usar el contexto de ItemsRepresentantes
function useItemsRepresentantesContext() {
    const context = useContext(ItemsRepresentantesContext);
    if (context === undefined) {
        throw new Error("useItemsRepresentantesContext must be used within a RepresentantesProvider");
    }
    return context;
}

// Proveedor para el contexto de Representantes
function RepresentantesProvider({ children }) {
    const [activeRepresentante, setActiveRepresentante] = useState(0);
    const [editRepresentante, setEditRepresentante] = useState(null);
    const [itemsRepresentantes, setItemsRepresentantes] = useState([]);
    const { itemsEstafetas } = useItemsEstafetasContext();

    // Sincronizar itemsRepresentantes con itemsEstafetas
    useEffect(() => {
        setItemsRepresentantes(itemsEstafetas);
    }, [itemsEstafetas]);

    console.log("itemsEstafetas en representante:", itemsEstafetas);




    const updateRepresentante = useCallback((updatedRepresentante) => {
        setItemsRepresentantes((prevItems) =>
            prevItems.map((item) =>
                item.id === updatedRepresentante.id ? updatedRepresentante : item
            )
        );
    }, []);

    
    // Memoizar el valor del contexto para evitar renders innecesarios
    const contextValue = useMemo(() => ({
        activeRepresentante,
        setActiveRepresentante,
    }), [activeRepresentante]);

    const onEditRepresentanteContextValue = useMemo(() => ({
        editRepresentante,
        setEditRepresentante
    }), [editRepresentante]);

    const itemsRepresentantesContextValue = useMemo(() => ({
        itemsRepresentantes,
        setItemsRepresentantes,
        updateRepresentante
    }), [itemsRepresentantes, updateRepresentante]);

    return (
        <RepresentantesContext.Provider value={contextValue}>
            <OnEditRepresentanteContext.Provider value={onEditRepresentanteContextValue}>
                <ItemsRepresentantesContext.Provider value={itemsRepresentantesContextValue}>
                    {children}
                </ItemsRepresentantesContext.Provider>
            </OnEditRepresentanteContext.Provider>
        </RepresentantesContext.Provider>
    );
}

export { RepresentantesProvider, useRepresentantesContext, useEditRepresentante, useItemsRepresentantesContext };
