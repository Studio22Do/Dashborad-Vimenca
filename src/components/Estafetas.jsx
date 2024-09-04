import React from "react";
import Oficinas from "./Estafetas/Oficinas";
import Noticias from "./Estafetas/Noticias";
import FormCard from "./Estafetas/FormCard";
import { useEstafetasContext } from "../providers/EstafetasProviders";

function Estafetas() {
    const { activeEstafeta, setActiveEstafeta } = useEstafetasContext();
    const handleButtonClick = (index) => {
        setActiveEstafeta(index);
    };

    return (
        <div className="">
            {activeEstafeta !== 2 && (
                <div className="flex ">
                    <button
                        className={`w-80 px-10 py-3 rounded-t-2xl font-bold text-gray-600 buttontab ${
                            activeEstafeta === 0 ? "active" : ""
                        }`}
                        onClick={() => handleButtonClick(0)}
                    >
                        Oficinas
                    </button>

                    <button
                        className={`w-80 px-10 py-3 rounded-t-2xl font-bold text-gray-600 buttontab ${
                            activeEstafeta === 1 ? "active" : ""
                        }`}
                        onClick={() => handleButtonClick(1)}
                    >
                        Noticias
                    </button>
                </div>
            )}

            <div>
                {activeEstafeta === 0 && <Oficinas />}
                {activeEstafeta === 1 && <Noticias />}
                {activeEstafeta === 2 && <FormCard />}
            </div>
        </div>
    );
}

export default Estafetas;