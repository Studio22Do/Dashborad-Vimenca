import React, { useEffect, useState } from "react";
import Clock from "../../assets/Clock.png";
import Loc from "../../assets/location.png";
import Phone from "../../assets/phone.png";
import Iconvimenca from "../../assets/iconremesas.png";
import Iconvimenpaq from "../../assets/iconvimenpaq.png";
import Iconpagatodo from "../../assets/iconpagatodo.png";
import Iconbancox from "../../assets/iconbancox.png";
import ToggleButton from "../Botones/ToggleButton";
import {
    useEditEstafeta,
    useItemsEstafetasContext,
    useEstafetasContext,
} from "../../providers/EstafetasProviders";

function EditCard({ onSave }) {
    const { editEstafeta, setEditEstafeta } = useEditEstafeta();
    const { ItemsEstafetas, updateEstafeta } = useItemsEstafetasContext();
    const { setActiveEstafeta } = useEstafetasContext();
    const [ItemActual, setItemActual] = useState(null);

    useEffect(() => {
        if (editEstafeta) {
            const currentItem = ItemsEstafetas.find(
                (item) => item.id === editEstafeta
            );
            setItemActual(currentItem);
        }
    }, [editEstafeta, ItemsEstafetas]);

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
    const [agenteCambio, setAgenteCambio] = useState("");
    const [vimenpaq, setVimenpaq] = useState("");
    const [pagaTodo, setPagaTodo] = useState("");
    const [bancoVimenca, setBancoVimenca] = useState("");
    const [tipoOficina, setTipoOficina] = useState("");

    const convertTo24HourFormat = (time) => {
        let hours, minutes, modifier;
        if (time.length === 7) {
            // Formato "10:00PM"
            hours = parseInt(time.substr(0, 2), 10);
            minutes = time.substr(3, 2);
            modifier = time.substr(5);
        } else if (time.length === 6) {
            // Formato "1:00PM"
            hours = parseInt(time.substr(0, 1), 10);
            minutes = time.substr(2, 2);
            modifier = time.substr(4);
        } else {
            return "Formato de hora inválido";
        }

        if (modifier.toUpperCase() === "PM" && hours !== 12) {
            hours += 12;
        } else if (modifier.toUpperCase() === "AM" && hours === 12) {
            hours = 0;
        }

        return `${hours.toString().padStart(2, "0")}:${minutes}`;
    };

    const convertTo12HourFormat = (time) => {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);
        const modifier = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes}${modifier}`;
    };

    useEffect(() => {
        if (ItemActual) {
            setNombre(ItemActual.nombre);
            setDireccion(ItemActual.direccion);
            setProvincia(ItemActual.Provincia);
            setLatitud(ItemActual.Latitud);
            setLongitud(ItemActual.Longitud);
            setLunesViernesDesde(
                convertTo24HourFormat(
                    ItemActual["Lunes - Viernes"].split(" - ")[0]
                )
            );
            setLunesViernesHasta(
                convertTo24HourFormat(
                    ItemActual["Lunes - Viernes"].split(" - ")[1]
                )
            );
            setSabadoDesde(
                convertTo24HourFormat(ItemActual.Sábado.split(" - ")[0])
            );
            setSabadoHasta(
                convertTo24HourFormat(ItemActual.Sábado.split(" - ")[1])
            );
            setDomingoDesde(
                convertTo24HourFormat(ItemActual.Domingo.split(" - ")[0])
            );
            setDomingoHasta(
                convertTo24HourFormat(ItemActual.Domingo.split(" - ")[1])
            );
            setTelefono(ItemActual.Teléfono);
            setAgenteCambio(ItemActual["Agente de Cambio"] === "SI");
            setVimenpaq(ItemActual.Vimenpaq === "SI");
            setPagaTodo(ItemActual.PagaTodo === "SI");
            setBancoVimenca(ItemActual["Banco Vimenca"] === "SI");
            setTipoOficina(ItemActual["Tipo de Oficina"]);
        }
    }, [ItemActual]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedOficina = {
            ...ItemActual,
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
        updateEstafeta(updatedOficina);
        setActiveEstafeta(0);
        onSave(updatedOficina);
    };

    const handleBack = () => {
        setActiveEstafeta(0);
    };

    const handleToggleChange = (setter) => (newState) => {
        setter(newState === "SI");
    };

    return (
        <div className="flex justify-center">
            <div className="border p-16 rounded-2xl">
                <h2 className="font-bold text-xl text-[--primary] text-center border-b mb-2">
                    EDITAR OFICINA
                </h2>
                <h3 className="text-center text-gray-500 mb-4">{nombre}</h3>
                <div>
                    <div className="flex gap-2 items-end mb-4 p-1 w-full">
                        <div className="w-7"></div>
                        <div className="w-full">
                            <h3 className="font-semibold">
                                Nombre de la oficina
                            </h3>
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500 w-full">
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="text"
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
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
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={lunesViernesDesde}
                                        onChange={(e) =>
                                            setLunesViernesDesde(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={lunesViernesHasta}
                                        onChange={(e) =>
                                            setLunesViernesHasta(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5 mb-4 p-1">
                        <div className="w-4"></div>
                        <div>
                            <h3 className="font-semibold">Sábados</h3>
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={sabadoDesde}
                                        onChange={(e) =>
                                            setSabadoDesde(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={sabadoHasta}
                                        onChange={(e) =>
                                            setSabadoHasta(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                            setDomingoDesde(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
                                        value={domingoHasta}
                                        onChange={(e) =>
                                            setDomingoHasta(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-1">
                        <img
                            src={Loc}
                            alt=""
                            style={{ backgroundSize: "cover" }}
                            title="Direccion"
                        />
                        <div className="w-full">
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm w-full">
                                    <textarea
                                        className="de text-black relative flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="text"
                                        value={direccion}
                                        onChange={(e) =>
                                            setDireccion(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end gap-3 p-1">
                        <img
                            src={Phone}
                            alt=""
                            style={{ backgroundSize: "cover" }}
                            title="Telefono"
                        />
                        <div className="w-full">
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm w-full">
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="tel"
                                        placeholder="809-000-0000"
                                        value={telefono}
                                        onChange={(e) =>
                                            setTelefono(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 py-7 justify-center w-full">
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconvimenca} alt="" className="w-11" />
                            <ToggleButton
                                icon={"Agente de Cambio"}
                                initialState={agenteCambio}
                                onChange={handleToggleChange(setAgenteCambio)}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconvimenpaq} alt="" className="w-11" />
                            <ToggleButton
                                icon={"vimenpaq"}
                                initialState={vimenpaq}
                                onChange={handleToggleChange(setVimenpaq)}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconbancox} alt="" className="w-11" />
                            <ToggleButton
                                icon={"bancovimenca"}
                                initialState={bancoVimenca}
                                onChange={handleToggleChange(setBancoVimenca)}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconpagatodo} alt="" className="w-11" />
                            <ToggleButton
                                icon={"pagatodo"}
                                initialState={pagaTodo}
                                onChange={handleToggleChange(setPagaTodo)}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button
                            className="py-2 px-8 rounded-lg text-[--primary] font-semibold border border-[--primary]"
                            onClick={handleBack}
                        >
                            Atras
                        </button>
                        <button
                            className="py-2 px-8 rounded-lg text-white font-semibold border border-[--primary] bg-[--primary]"
                            onClick={handleSubmit}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditCard;
