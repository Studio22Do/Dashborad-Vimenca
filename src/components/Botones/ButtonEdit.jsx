import React from "react";
import { useEditEstafeta, useEstafetasContext } from "../../providers/EstafetasProviders";


function ButtonEdit({ id }) {
    const { setEditEstafeta } = useEditEstafeta();
    const { setActiveEstafeta } = useEstafetasContext();

    const handleClick = () => {
        
        setEditEstafeta(id); // Establece la estafeta a editar en el contexto
        setActiveEstafeta(3);
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

export default ButtonEdit;