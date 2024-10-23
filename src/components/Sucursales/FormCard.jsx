import React, { useState } from "react";
import Clock from "../../assets/Clock.png";
import Loc from "../../assets/location.png";
import Phone from "../../assets/phone.png";
import Iconvimenca from "../../assets/iconremesas.png";
import Iconvimenpaq from "../../assets/iconvimenpaq.png";
import Iconpagatodo from "../../assets/iconpagatodo.png";
import Iconbancox from "../../assets/iconbancox.png";
import ToggleButton from "../Botones/ToggleButton";
import Popup from "reactjs-popup";
import Mapa from "../Mapa";
import { useItemsOficinasContext } from "../../providers/OficinasProviders";
import { useSucursalesContext } from "../../providers/SucursalesProviders";

function FormCard() {
    const { addOficina } = useItemsOficinasContext();
    const { setActiveSucursal } = useSucursalesContext();

    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [provincia, setProvincia] = useState("");
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [lunesViernesDesde, setLunesViernesDesde] = useState("");
    const [lunesViernesHasta, setLunesViernesHasta] = useState("");
    const [lunesViernesDesde2, setLunesViernesDesde2] = useState("");
    const [lunesViernesHasta2, setLunesViernesHasta2] = useState("");
    const [sabadoDesde, setSabadoDesde] = useState("");
    const [sabadoHasta, setSabadoHasta] = useState("");
    const [sabadoDesde2, setSabadoDesde2] = useState("");
    const [sabadoHasta2, setSabadoHasta2] = useState("");
    const [domingoDesde, setDomingoDesde] = useState("");
    const [domingoHasta, setDomingoHasta] = useState("");
    const [domingoDesde2, setDomingoDesde2] = useState("");
    const [domingoHasta2, setDomingoHasta2] = useState("");
    const [telefono, setTelefono] = useState("");
    const [servicioPrincipal, setServicioPrincipal] = useState("");
    const [agenteCambio, setAgenteCambio] = useState(false);
    const [vimenpaq, setVimenpaq] = useState(false);
    const [pagaTodo, setPagaTodo] = useState(false);
    const [bancoVimenca, setBancoVimenca] = useState(false);
    const [remesas, setRemesas] = useState(false);
    const [tipoOficina, setTipoOficina] = useState("Sucursal");
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [inputPassword, setInputPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const convertTo24HourFormat = (time) => {
        if (!time || typeof time !== "string") {
            return "";
        }
        time = time.replace(/\s+/g, "");
        let hours, minutes, modifier;
        const timeParts = time.toLowerCase().match(/(\d+):(\d+)(am|pm)/);
        if (!timeParts) {
            return "";
        }
        [, hours, minutes, modifier] = timeParts;
        hours = parseInt(hours, 10);
        if (modifier === "pm" && hours !== 12) {
            hours += 12;
        } else if (modifier === "am" && hours === 12) {
            hours = 0;
        }
        return `${hours.toString().padStart(2, "0")}:${minutes}`;
    };

    const convertTo12HourFormat = (time) => {
        if (!time) return "";
        let [hours, minutes] = time.split(":");
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes.padStart(2, '0')}${ampm}`;
    };

    const formatTimeRange = (start, end) => {
        const formattedStart = convertTo12HourFormat(start);
        const formattedEnd = convertTo12HourFormat(end);
        return `${formattedStart} - ${formattedEnd}`;
    };

    const handleSaveClick = () => {
        setShowConfirmPopup(true); // Muestra el popup de confirmación
    };

    const handleConfirmSave = async () => {
        // Validación de campos requeridos
        if (!nombre || !direccion) {
            setErrorMessage("Por favor, completa todos los campos requeridos.");
            return;
        }

        // Formatear los horarios
        const lunesViernesHorario = formatTimeRange(lunesViernesDesde, lunesViernesHasta);
        const lunesViernesHorario2 = formatTimeRange(lunesViernesDesde2, lunesViernesHasta2);
        const sabadoHorario = formatTimeRange(sabadoDesde, sabadoHasta);
        const sabadoHorario2 = formatTimeRange(sabadoDesde2, sabadoHasta2);
        const domingoHorario = domingoDesde && domingoHasta
            ? formatTimeRange(domingoDesde, domingoHasta)
            : "NO LABORA";
        const domingoHorario2 = domingoDesde2 && domingoHasta2
            ? formatTimeRange(domingoDesde2, domingoHasta2)
            : "NO LABORA";

        // Crear un objeto con los datos ingresados
        const newOficina = {
            nombre_oficina: nombre,
            direccion,
            provincia,
            latitud,
            longitud,
            lunes_viernes_a: lunesViernesHorario,
            lunes_viernes_b: lunesViernesHorario2,
            sabado_a: sabadoHorario,
            sabado_b: sabadoHorario2,
            domingo_a: domingoHorario,
            domingo_b: domingoHorario2,
            telefono,
            
            agente_de_cambio: agenteCambio ? "Y" : "N",
            vimenpaq: vimenpaq ? "Y" : "N",
            pagatodo: pagaTodo ? "Y" : "N",
            banco_vimenca: bancoVimenca ? "Y" : "N",
            remesas: remesas ? "Y" : "N",
            tipo_de_oficina: tipoOficina,
            servicio_principal: servicioPrincipal,
            id: Math.floor(Math.random() * 1000000)
        };

        try {
            await addOficina(newOficina, tipoOficina);
            console.log("Nueva oficina creada:", newOficina);
            // Limpiar campos y cerrar popup
            setNombre("");
            setDireccion("");
            setProvincia("");
            setLatitud(null);
            setLongitud(null);
            setLunesViernesDesde("");
            setLunesViernesHasta("");
            setLunesViernesDesde2("");
            setLunesViernesHasta2("");
            setSabadoDesde("");
            setSabadoHasta("");
            setSabadoDesde2("");
            setSabadoHasta2("");
            setDomingoDesde("");
            setDomingoHasta("");
            setDomingoDesde2("");
            setDomingoHasta2("");
            setTelefono("");
            setServicioPrincipal("");
            setAgenteCambio(false);
            setVimenpaq(false);
            setPagaTodo(false);
            setBancoVimenca(false);
            setRemesas(false);
            setTipoOficina("Sucursal");
            setShowConfirmPopup(false);
            setActiveSucursal(0);
        } catch (error) {
            setErrorMessage("Error al guardar los cambios.");
            console.error("Error al guardar los cambios:", error);
        }
    };

    const handleCancelSave = () => {
        setShowConfirmPopup(false);
    };

    return (
        <div className="flex justify-center">
            <div className="border p-16 rounded-2xl">
                <h2 className="font-bold text-xl text-[--primary] text-center border-b mb-2">
                    CREAR OFICINA - {tipoOficina}
                </h2>
                <div>
                    <div className="flex gap-2 items-end mb-4 p-1 w-full">
                        <div className="w-7"></div>
                        <div className="w-full">
                            <h3 className="font-semibold">Nombre de la oficina</h3>
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500 w-full">
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 items-end mb-4 p-1 w-full">
                        <img src={Clock} title="Horario" />
                        <div>
                            <h3 className="font-semibold">Lunes a viernes</h3>
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={lunesViernesDesde}
                                        onChange={(e) => setLunesViernesDesde(e.target.value)}
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={lunesViernesHasta}
                                        onChange={(e) => setLunesViernesHasta(e.target.value)}
                                    />
                                </label>
                            </div>
                            {/* #################### */}
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={lunesViernesDesde2}
                                        onChange={(e) => setLunesViernesDesde2(e.target.value)}
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={lunesViernesHasta2}
                                        onChange={(e) => setLunesViernesHasta2(e.target.value)}
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
                                        type="time"
                                        value={sabadoDesde}
                                        onChange={(e) => setSabadoDesde(e.target.value)}
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={sabadoHasta}
                                        onChange={(e) => setSabadoHasta(e.target.value)}
                                    />
                                </label>
                            </div>
                            {/* #################### */}
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={sabadoDesde2}
                                        onChange={(e) => setSabadoDesde2(e.target.value)}
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={sabadoHasta2}
                                        onChange={(e) => setSabadoHasta2(e.target.value)}
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
                                        type="time"
                                        value={domingoDesde}
                                        onChange={(e) => setDomingoDesde(e.target.value)}
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={domingoHasta}
                                        onChange={(e) => setDomingoHasta(e.target.value)}
                                    />
                                </label>
                            </div>
                            {/* #################### */}
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={domingoDesde2}
                                        onChange={(e) => setDomingoDesde2(e.target.value)}
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={domingoHasta2}
                                        onChange={(e) => setDomingoHasta2(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-1">
                        <img src={Loc} title="Dirección" />
                        <div className="w-full">
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm w-full">
                                    <textarea
                                        className="de text-black relative flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end gap-3 p-1">
                        <img src={Phone} title="Teléfono" />
                        <div className="w-full">
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm w-full">
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="tel"
                                        placeholder="809-000-0000"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className="flex gap-2 items-end mb-1 p-1">
                        <div className="w-6"></div>
                        <div className="w-full">
                            <div className="w-full">
                                <select
                                    className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={servicioPrincipal}
                                    onChange={(e) =>
                                        setServicioPrincipal(e.target.value)
                                    }
                                >
                                    <option value="">
                                        Seleccione un servicio principal
                                    </option>
                                    <option value="PagaTodo">PagaTodo</option>
                                    <option value="Remesas">Remesas</option>
                                    <option value="Banco vimenca">
                                        Banco vimenca
                                    </option>
                                    <option value="Vimenpaq">Vimenpaq</option>
                                </select>
                            </div>
                        </div>
                    </div>




                    <div className="flex flex-col gap-3 py-7 justify-center w-full">
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconvimenca} alt="" className="w-11" />
                            <ToggleButton
                                icon={"Remesas"}
                                setState={setRemesas}
                                state={remesas}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconvimenpaq} alt="" className="w-11" />
                            <ToggleButton
                                icon={"vimenpaq"}
                                setState={setVimenpaq}
                                state={vimenpaq}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconbancox} alt="" className="w-11" />
                            <ToggleButton
                                icon={"bancovimenca"}
                                setState={setBancoVimenca}
                                state={bancoVimenca}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconpagatodo} alt="" className="w-11" />
                            <ToggleButton
                                icon={"pagatodo"}
                                setState={setPagaTodo}
                                state={pagaTodo}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button
                            className="py-2 px-8 rounded-lg text-white font-semibold border border-[--primary] bg-[--primary]"
                            onClick={handleSaveClick}
                        >
                            Guardar
                        </button>
                    </div>
                    <Popup open={showConfirmPopup} onClose={handleCancelSave} modal>
                        <div className="bg-white py-8 px-12 rounded-lg shadow-lg">
                            <h2 className="font-bold text-xl text-center mb-4 text-[--primary]">
                                ¿Estás seguro de que deseas continuar?
                            </h2>
                            <label htmlFor="editCardPassword">
                                Escribe tu contraseña
                                <input
                                    type="password"
                                    id="editCardPassword"
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    className="border rounded-md p-2 w-full"
                                    placeholder="Tu Contraseña"
                                    autoComplete="off"
                                />
                            </label>
                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    className="py-2 px-8 rounded-lg text-[--primary] font-semibold border border-[--primary]"
                                    onClick={handleCancelSave}
                                >
                                    No, cancelar
                                </button>
                                <button
                                    className="py-2 px-8 rounded-lg text-white font-semibold border border-[--primary] bg-[--primary]"
                                    onClick={handleConfirmSave}
                                >
                                    Sí, confirmar
                                </button>
                            </div>
                        </div>
                    </Popup>
                    {errorMessage && (
                        <p className="text-red-500 text-center py-1">
                            {errorMessage}
                        </p>
                    )}
                </div>
            </div>
            <div className="w-full h-[600px] p-1 border m-3 rounded-lg">
                <Mapa
                    setLatitud={setLatitud}
                    setLongitud={setLongitud}
                    latitud={latitud}
                    longitud={longitud}
                    className="w-full h-full"
                />
            </div>
        </div>
    );
}

export default FormCard;
