import React from "react";
import Oficinas from "./Representantes/Oficinas";
// import Noticias from "./Estafetas/Noticias";
import FormCard from "./Representantes/FormCard";
import EditCard from "./Representantes/EditCard";
import { useRepresentantesContext } from "../providers/RepresentantesProviders";


function Representantes() {
    const { activeRepresentante, setActiveRepresentante } = useRepresentantesContext();

    const handleButtonClick = (index) => {
        setActiveRepresentante(index);
    };

    const handleBack = () => {
        setActiveRepresentante(0); // Regresa a la vista de Oficinas
    };

    return (
        <div className="">
            {(activeRepresentante === 0 || activeRepresentante === 1) && (
                <div className="flex ">
                    <button
                        className={`w-80 px-10 py-3 rounded-t-2xl font-bold text-gray-600 buttontab ${
                            activeRepresentante === 0 ? "active" : ""
                        }`}
                        onClick={() => handleButtonClick(0)}
                    >
                        Oficinas
                    </button>

                    {/* <button
                            className={`w-80 px-10 py-3 rounded-t-2xl font-bold text-gray-600 buttontab ${
                                activeRepresentante === 1 ? "active" : ""
                            }`}
                            onClick={() => handleButtonClick(1)}
                        >
                            Noticias
                        </button> */}
                </div>
            )}
            {(activeRepresentante === 3 || activeRepresentante === 2) && (
                <button
                    onClick={handleBack}
                    className="py-2 mb-4 px-8 rounded-lg text-[--primary] font-semibold border border-[--primary] "
                >
                    Atras
                </button>
            )}

            <div>
                {activeRepresentante === 0 && <Oficinas />}
                {/* {activeRepresentante === 1 && <Noticias />} */}
                {activeRepresentante === 2 && <FormCard />}
                {activeRepresentante === 3 && (
                    <EditCard
                        onSave={(updatedRepresentante) =>
                            console.log(updatedRepresentante)
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default Representantes;
