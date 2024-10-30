import React from "react";
import Oficinas from "./Sucursales/Oficinas";
// import Noticias from "./Estafetas/Noticias";
import FormCard from "./Sucursales/FormCard";
import EditCard from "./Sucursales/EditCard";
import { useSucursalesContext } from "../providers/SucursalesProviders";



function Sucursales() {
    const { activeSucursal, setActiveSucursal } = useSucursalesContext();

    const handleButtonClick = (index) => {
        setActiveSucursal(index);
    };

    const handleBack = () => {
        setActiveSucursal(0); // Regresa a la vista de Oficinas
    };

    return (
        <div className="">
            {(activeSucursal === 0 || activeSucursal === 1) && (
                <div className="flex ">
                    <button
                        className={`w-80 px-10 py-3 rounded-t-2xl font-bold text-gray-600 buttontab ${
                            activeSucursal === 0 ? "active" : ""
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
            {(activeSucursal === 3 || activeSucursal === 2) && (
                <button
                    onClick={handleBack}
                    className="py-2 mb-4 px-8 rounded-lg text-[--primary] font-semibold border border-[--primary] "
                >
                    Atras
                </button>
            )}

            <div>
                {activeSucursal === 0 && <Oficinas />}
                {/* {activeSucursal === 1 && <Noticias />} */}
                {activeSucursal === 2 && <FormCard />}
                {activeSucursal === 3 && (
                    <EditCard
                        onSave={(updatedSucursal) =>
                            console.log(updatedSucursal)
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default Sucursales;
