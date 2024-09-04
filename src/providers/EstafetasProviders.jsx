import React, { useState, useContext } from "react";

const EstafetasContext = React.createContext();

function useEstafetasContext() {
    return useContext(EstafetasContext);
}

function EstafetasProviders({ children }) {
    const [activeEstafeta, setActiveEstafeta] = useState(0);
    return (
        <EstafetasContext.Provider value={{ activeEstafeta, setActiveEstafeta }}>
            {children}
        </EstafetasContext.Provider>
    );
}

export { EstafetasProviders, useEstafetasContext };