import React, { useState } from "react";
import Clock from "../../assets/Clock.png";
import Loc from "../../assets/location.png";
import Phone from "../../assets/phone.png";
import Iconvimenca from "../../assets/iconremesas.png";
import Iconvimenpaq from "../../assets/iconvimenpaq.png";
import Iconpagatodo from "../../assets/iconpagatodo.png";
import Iconbancox from "../../assets/iconbancox.png";
import ToggleButton from "../Botones/ToggleButton";
import { useEstafetasContext, useItemsEstafetasContext } from "../../providers/EstafetasProviders";

function FormCard() {
    const { setActiveEstafeta } = useEstafetasContext();
    const { addEstafeta } = useItemsEstafetasContext();

    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [provincia, setProvincia] = useState("");
    const [latitud, setLatitud] = useState("");
    const [longitud, setLongitud] = useState("");
    const [lunesViernesDesde, setLunesViernesDesde] = useState("");
    const [lunesViernesHasta, setLunesViernesHasta] = useState("");
    const [sabadoDesde, setSabadoDesde] = useState("");
    const [sabadoHasta, setSabadoHasta] = useState("");
    const [domingoDesde, setDomingoDesde] = useState("");
    const [domingoHasta, setDomingoHasta] = useState("");
    const [telefono, setTelefono] = useState("");
    const [agenteCambio, setAgenteCambio] = useState(false);
    const [vimenpaq, setVimenpaq] = useState(false);
    const [pagaTodo, setPagaTodo] = useState(false);
    const [bancoVimenca, setBancoVimenca] = useState(false);
    const [tipoOficina, setTipoOficina] = useState("");

    const convertTo12HourFormat = (time) => {
        let [hours, minutes] = time.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes}${period}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEstafeta = {
            id: Date.now(), // Generar un ID único
            nombre,
            direccion,
            Provincia: provincia,
            Latitud: latitud,
            Longitud: longitud,
            "Lunes - Viernes": `${convertTo12HourFormat(lunesViernesDesde)} - ${convertTo12HourFormat(lunesViernesHasta)}`,
            Sábado: `${convertTo12HourFormat(sabadoDesde)} - ${convertTo12HourFormat(sabadoHasta)}`,
            Domingo: `${convertTo12HourFormat(domingoDesde)} - ${convertTo12HourFormat(domingoHasta)}`,
            Teléfono: telefono,
            "Agente de Cambio": agenteCambio ? "SI" : "NO",
            Vimenpaq: vimenpaq ? "SI" : "NO",
            PagaTodo: pagaTodo ? "SI" : "NO",
            "Banco Vimenca": bancoVimenca ? "SI" : "NO",
            "Tipo de Oficina": tipoOficina,
        };
        console.log("newEstafeta: ", newEstafeta);
        addEstafeta(newEstafeta);
        setActiveEstafeta(0); // Volver a la vista principal
    };

    return (
        <div className="flex justify-center">
            <div className="border p-16 rounded-2xl">
                <h2 className="font-bold text-xl text-[--primary] text-center border-b mb-2">
                    CREAR NUEVA OFICINA
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-2 items-end mb-4 p-1 w-full">
                        <div className="w-7"></div>
                        <div className="w-full">
                            <h3 className="font-semibold">Nombre de la oficina</h3>
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500 w-full">
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 items-end mb-4 p-1">
                        <img
                            src={Clock}
                            alt=""
                            style={{ backgroundSize: "cover" }}
                            title="Horario"
                        />
                        <div>
                            <h3 className="font-semibold">Lunes a viernes</h3>
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={lunesViernesDesde}
                                        onChange={(e) => setLunesViernesDesde(e.target.value)}
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={lunesViernesHasta}
                                        onChange={(e) => setLunesViernesHasta(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-5 mb-4  p-1">
                        <div className="w-4"></div>
                        <div>
                            <h3 className="font-semibold">Sabados</h3>
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={sabadoDesde}
                                        onChange={(e) => setSabadoDesde(e.target.value)}
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={sabadoHasta}
                                        onChange={(e) => setSabadoHasta(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-5 p-1">
                        <div className="w-4"></div>
                        <div>
                            <h3 className="font-semibold">Domingos</h3>
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={domingoDesde}
                                        onChange={(e) => setDomingoDesde(e.target.value)}
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={domingoHasta}
                                        onChange={(e) => setDomingoHasta(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3  p-1">
                        <img
                            src={Loc}
                            alt=""
                            style={{ backgroundSize: "cover" }}
                            title="Direccion"
                        />
                        <div className=" w-full">
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm w-full">
                                    <textarea
                                        className="de text-black relative flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="text"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-end gap-3  p-1">
                        <img
                            src={Phone}
                            alt=""
                            style={{ backgroundSize: "cover" }}
                            title="Telefono"
                        />
                        <div className=" w-full">
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm w-full">
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="tel"
                                        placeholder="809-000-0000"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 py-7 justify-center w-full ">
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconvimenca} alt="" className="w-11" />
                            <ToggleButton
                                icon={"Agente de Cambio"}
                                initialState={agenteCambio}
                                onChange={(newState) => setAgenteCambio(newState === "SI")}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconvimenpaq} alt="" className="w-11" />
                            <ToggleButton
                                icon={"Vimenpaq"}
                                initialState={vimenpaq}
                                onChange={(newState) => setVimenpaq(newState === "SI")}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconbancox} alt="" className="w-11" />
                            <ToggleButton
                                icon={"Banco Vimenca"}
                                initialState={bancoVimenca}
                                onChange={(newState) => setBancoVimenca(newState === "SI")}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconpagatodo} alt="" className="w-11" />
                            <ToggleButton
                                icon={"PagaTodo"}
                                initialState={pagaTodo}
                                onChange={(newState) => setPagaTodo(newState === "SI")}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            className="py-2 px-8 rounded-lg text-[--primary] font-semibold border border-[--primary]"
                            onClick={() => setActiveEstafeta(0)}
                        >
                            Atras
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-8 rounded-lg text-white font-semibold border border-[--primary] bg-[--primary]"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormCard;
