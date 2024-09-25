import React, { useState, useEffect } from "react";

function ToggleKnob({ isOn }) {
    return (
        <span className={`toggleKnob ${isOn ? "isActive" : ""}`}></span>
    );
}

function ToggleButton({ icon, initialState, onChange }) {
    const [isOn, setIsOn] = useState(initialState);

    useEffect(() => {
        setIsOn(initialState);
    }, [initialState]);

    const handleClick = () => {
        setIsOn((prevState) => {
            const newState = !prevState; // Cambiar el estado a su opuesto
            console.log(`estado en el boton ${icon} es: ${newState}`); // Muestra el estado actualizado
            if (onChange) {
                onChange(newState); // Pasar el nuevo estado booleano
            }
            return newState;
        });
    };

    return (
        <div>
            <button
                type="button" // Asegúrate de que el botón no envíe el formulario
                className={`toggleContainer ${isOn ? "isActive" : ""}`}
                onClick={handleClick}
            >
                <ToggleKnob isOn={isOn} />
            </button>
        </div>
    );
}

export default ToggleButton;