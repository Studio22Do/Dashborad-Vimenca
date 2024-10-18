import React, {
    useState,
    useContext,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import axios from "axios";
import { useUserContext } from "./UserProvider";

const SucursalesContext = React.createContext();
const ItemsSucursalesContext = React.createContext();
const OnEditSucursalContext = React.createContext();

const serverUrl = import.meta.env.VITE_SERVER_URL;

function useSucursalesContext() {
    return useContext(SucursalesContext);
}

function useItemsSucursalesContext() {
    return useContext(ItemsSucursalesContext);
}

function useEditSucursal() {
    const context = useContext(OnEditSucursalContext);
    if (context === undefined) {
        throw new Error(
            "useEditSucursal must be used within a OnEditSucursalProvider"
        );
    }
    return context;
}

function SucursalesProvider({ children }) {
    const [activeSucursal, setActiveSucursal] = useState(0);

    const [editSucursal, setEditSucursal] = useState(null); // Estado para la sucursal en edición
    const { token } = useUserContext();

    const sucursalesContextValue = useMemo(
        () => ({
            activeSucursal,
            setActiveSucursal,
        }),
        [activeSucursal]
    );

    const onEditSucursalContextValue = useMemo(
        () => ({
            editSucursal,
            setEditSucursal,
        }),
        [editSucursal]
    );

    return (
        <SucursalesContext.Provider value={sucursalesContextValue}>
            <OnEditSucursalContext.Provider value={onEditSucursalContextValue}>
                {children}
            </OnEditSucursalContext.Provider>
        </SucursalesContext.Provider>
    );
}

export {
    SucursalesProvider,
    useSucursalesContext,
    useItemsSucursalesContext,
    useEditSucursal,
};
