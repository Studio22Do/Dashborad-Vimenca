import React from "react";
import { useEditSucursal, useSucursalesContext } from "../../../providers/SucursalesProviders";

function ButtonEditSucursal({ id }) {
    const { setEditSucursal } = useEditSucursal();
    const { setActiveSucursal } = useSucursalesContext();

    const handleClick = () => {
        
        setEditSucursal(id); // Establece el representante a editar en el contexto
        setActiveSucursal(3); // Cambia a la vista de edición
    };

    return (
        <div className="relative">
            <button
                className="text-blue-800 font-semibold py-1 px-4 rounded-md buttonedit"
                onClick={handleClick}
            >
                Editar
            </button>
        </div>
    );
}

export default ButtonEditSucursal;
