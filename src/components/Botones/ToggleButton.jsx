import React, { useState } from "react";

function ToggleKnob({ isOn }) {
    return (
        <span className={`toggleKnob ${isOn ? "isActive" : ""}`}></span>
    );
}

function ToggleButton({icon}) {
    const [isOn, setIsOn] = useState(false);

    const handleClick = () => {
        setIsOn((prevState) => !prevState);
        console.log(`estado en el boton ${icon} es: ${!isOn}`); // Muestra el estado anterior
    };

    return (
        <div>
            <button
                className={`toggleContainer ${isOn ? "isActive" : ""}`}
                onClick={handleClick}
            >
                <ToggleKnob isOn={isOn} />
            </button>
        </div>
    );
}

export default ToggleButton;