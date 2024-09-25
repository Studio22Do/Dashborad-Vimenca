import { React, useState } from "react";
import sidebar from "../assets/side-sm.png";
import Logo from "../assets/Logo-blanco.png";
import Estafetas from "../components/Estafetas";
import Subagente from "../components/Subagente";
import Sucursales from "../components/Sucursales";
import { EstafetasProviders } from "../providers/EstafetasProviders";

function Dashboard() {
    const [activeButton, setActiveButton] = useState(2);
    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    return (
        <EstafetasProviders>
            <div className="flex">
                <div
                    className="flex flex-col w-2/12 h-lvh px-12 py-24 items-center sticky top-0"
                    style={{
                        backgroundImage: `url(${sidebar})`,
                        backgroundSize: "cover",
                    }}
                >
                    <img src={Logo} alt="Logo" />
                    <div className="flex flex-col items-start w-full mt-14 gap-2">
                        <button
                            className={`w-full text-start px-10 py-3 rounded-md font-semibold text-white ${
                                activeButton === 0 ? "active" : ""
                            } button-side`}
                            onClick={() => handleButtonClick(0)}
                        >
                            Sucursales
                        </button>
                        <button
                            className={`w-full text-start px-10 py-3 rounded-md font-semibold text-white ${
                                activeButton === 1 ? "active" : ""
                            } button-side`}
                            onClick={() => handleButtonClick(1)}
                        >
                            Sub Agente
                        </button>
                        <button
                            className={`w-full text-start px-10 py-3 rounded-md font-semibold text-white ${
                                activeButton === 2 ? "active" : ""
                            } button-side`}
                            onClick={() => handleButtonClick(2)}
                        >
                            Estafetas
                        </button>
                    </div>
                </div>

                <div className="w-10/12 min-h-lvh px-20 py-20 bg-[--gris]">
                    {activeButton === 0 && <Sucursales />}
                    {activeButton === 1 && <Subagente />}
                    {activeButton === 2 && <Estafetas />}
                </div>
            </div>
        </EstafetasProviders>
    );
}

export default Dashboard;
