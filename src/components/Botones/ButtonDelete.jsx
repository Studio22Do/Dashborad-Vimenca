import React, { useState } from "react"; // Importa useState
import { useItemsEstafetasContext } from "../../providers/EstafetasProviders";
import Popup from "reactjs-popup"; // Importa Popup

function ButtonDelete({ id }) {
    const { deleteEstafeta } = useItemsEstafetasContext();
    const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Estado para el popup
    const [inputPassword, setInputPassword] = useState(""); // Estado para la contraseña ingresada
    const [password, setPassword] = useState("tu_contraseña"); // Cambia esto por la forma de obtener la contraseña

    function handleClick() {
        setShowConfirmPopup(true); // Muestra el popup de confirmación
    }

    const handleConfirmDelete = () => {
        if (inputPassword === password) { // Compara la contraseña
            deleteEstafeta(id);
            console.log(`Oficina con el id ${id} ha sido eliminada`);
            setShowConfirmPopup(false); // Cierra el popup
        } else {
            alert("Contraseña incorrecta"); // Mensaje de error
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmPopup(false); // Cierra el popup
    };

    return (
        <div>
            <button
                className="border border-red-500 bg-red-300 text-red-700 font-semibold py-1 px-4 rounded-md"
                onClick={handleClick}
            >
                Eliminar
            </button>
            <Popup open={showConfirmPopup} onClose={handleCancelDelete} modal>
                <div className="bg-white py-8 px-12 rounded-lg shadow-lg">
                    <h2 className="font-bold text-xl text-center mb-4 text-[--primary]">
                        ¿Estás seguro de que quieres eliminar?
                    </h2>
                    <label htmlFor="deletePassword">
                        Escribe tu contraseña
                        <input
                            type="password"
                            id="deletePassword"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                            className="border rounded-md p-2 w-full"
                            placeholder="Tu Contraseña"
                            autoComplete="off"
                        />
                    </label>
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            className="py-2 px-8 rounded-lg text-[--primary] font-semibold border border-[--primary]"
                            onClick={handleCancelDelete}
                        >
                            No, cancelar
                        </button>
                        <button
                            className="py-2 px-8 rounded-lg text-white font-semibold border border-[--primary] bg-[--primary]"
                            onClick={handleConfirmDelete}
                        >
                            Sí, confirmar
                        </button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default ButtonDelete;
