import React, { useState, useContext, useMemo } from "react";

const EstafetasContext = React.createContext();
const ItemsEstafetasContext = React.createContext();
const OnEditEstafetaContext = React.createContext();



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
    const [editEstafeta, setEditEstafeta] = useState(null); // Estado para la estafeta en edición


    const estafetasContextValue = useMemo(() => ({
        activeEstafeta,
        setActiveEstafeta
    }), [activeEstafeta]);


    const onEditEstafetaContextValue = useMemo(() => ({
        editEstafeta,
        setEditEstafeta
    }), [editEstafeta]);

    return (
        <EstafetasContext.Provider value={estafetasContextValue}>
                <OnEditEstafetaContext.Provider value={onEditEstafetaContextValue}>
                    {children}
                </OnEditEstafetaContext.Provider>
        </EstafetasContext.Provider>
    );
}

export {
    EstafetasProviders,
    useEstafetasContext,
    useItemsEstafetasContext,
    useEditEstafeta,
};