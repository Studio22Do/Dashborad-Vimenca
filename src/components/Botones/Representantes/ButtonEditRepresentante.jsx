import React from "react";
import { useEditRepresentante, useRepresentantesContext } from "../../../providers/RepresentantesProviders";

function ButtonEditRepresentante({ id }) {
    const { setEditRepresentante } = useEditRepresentante();
    const { setActiveRepresentante } = useRepresentantesContext();

    const handleClick = () => {
        console.log(`Editando el representante con el id número: ${id}`);
        setEditRepresentante(id); // Establece el representante a editar en el contexto
        setActiveRepresentante(3); // Cambia a la vista de edición
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

export default ButtonEditRepresentante;
