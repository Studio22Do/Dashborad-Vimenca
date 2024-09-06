import React from "react";
import { useItemsEstafetasContext } from "../../providers/EstafetasProviders";

function ButtonDelete({ id }) {
    const { deleteEstafeta } = useItemsEstafetasContext();

    function handleClick() {
        deleteEstafeta(id);
        console.log(`Oficina con el id ${id} ha sido eliminada`);
    }

    return (
        <div>
            <button
                className="border border-red-500 bg-red-300 text-red-700 font-semibold py-1 px-4 rounded-md"
                onClick={handleClick}
            >
                Eliminar
            </button>
        </div>
    );
}

export default ButtonDelete;
