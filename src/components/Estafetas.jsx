import { React, useState } from "react";
import Oficinas from "./Estafetas/Oficinas";
import Noticias from "./Estafetas/Noticias";
import Edit from "./Estafetas/Edit";


function Estafetas() {
    const [activeButton, setActiveButton] = useState(0);
    const handleButtonClick = (index) => {
        setActiveButton(index);
    };
    return (
        <div>
            
            <div className="flex ">
                <button
                    className={`w-80  px-10 py-3 rounded-t-2xl font-bold text-gray-600 buttontab ${
                        activeButton === 0 ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick(0)}
                >
                    Oficinas
                </button>
                <button
                    className={`w-80  px-10 py-3 rounded-t-2xl font-bold text-gray-600 buttontab ${
                        activeButton === 1 ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick(1)}
                >
                    Noticias
                </button>
            </div>

            <div>
                {activeButton === 0 && <Oficinas />}
                {activeButton === 1 && <Noticias />}
                {activeButton === 2 && <Edit />}
            </div>
        </div>
    );
}

export default Estafetas;
