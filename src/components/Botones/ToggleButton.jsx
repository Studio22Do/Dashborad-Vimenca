import React, { useState, useEffect } from "react";

function ToggleKnob({ isOn }) {
    return (
        <span className={`toggleKnob ${isOn ? "isActive" : ""}`}></span>
    );
}

function ToggleButton({ icon, state, setState }) {
    const [isOn, setIsOn] = useState(state);

    useEffect(() => {
        setIsOn(state);
    }, [state]);

    const handleClick = () => {
        const newState = !isOn; // Cambia el estado a su opuesto
        setIsOn(newState); // Actualiza el estado local
        if (setState) {
            setState(newState); // Actualiza el estado en el componente padre
        }
    };

    return (
        <div>
            <button
                type="button" // Asegúrate de que el botón no envíe el formulario
                className={`toggleContainer ${isOn ? "isActive" : ""}`} // Asegúrate de que estas clases estén definidas
                onClick={handleClick}
            >
                <ToggleKnob isOn={isOn} />
            </button>
        </div>
    );
}

export default ToggleButton;