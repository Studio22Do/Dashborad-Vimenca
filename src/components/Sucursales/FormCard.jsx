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
    const { addOficina } = useItemsOficinasContext(); // Función para crear oficina
    const { setActiveSucursal } = useSucursalesContext();

    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [provincia, setProvincia] = useState("");
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
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
    const [remesas, setRemesas] = useState(false);
    const [tipoOficina, setTipoOficina] = useState("Sucursal");
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [inputPassword, setInputPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSaveClick = () => {
        setShowConfirmPopup(true); // Muestra el popup de confirmación
    };

    const handleConfirmSave = async () => {
        // Validación de campos requeridos
        if (!nombre || !direccion) {
            setErrorMessage("Por favor, completa todos los campos requeridos.");
            return; // Detiene la ejecución si hay campos vacíos
        }

        // Crea un objeto con los datos ingresados
        const newOficina = {
            nombre_oficina: nombre,
            direccion,
            provincia,
            latitud,
            longitud,
            a_lunes_viernes: `${lunesViernesDesde} - ${lunesViernesHasta}`,
            a_sabado: `${sabadoDesde} - ${sabadoHasta}`,
            a_domingo: domingoDesde ? `${domingoDesde} - ${domingoHasta}` : "NO LABORA",
            telefono,
            agente_de_cambio: agenteCambio,
            vimenpaq,
            pagatodo: pagaTodo,
            banco_vimenca: bancoVimenca,
            remesas,
            tipo_de_oficina: tipoOficina, // Asegúrate de que este valor sea correcto
            servicio_principal: "Remesas",
            id: Math.floor(Math.random() * 1000000) // Genera un número entero aleatorio
        };

        try {
            // Llama a la función para crear la nueva oficina en la base de datos
            await addOficina(newOficina, tipoOficina); // Asegúrate de que tipoOficina se pase correctamente
            console.log("newOficina: ", newOficina);
            // Limpia los campos después de guardar
            setNombre("");
            setDireccion("");
            setProvincia("");
            setLatitud(null);
            setLongitud(null);
            setLunesViernesDesde("");
            setLunesViernesHasta("");
            setSabadoDesde("");
            setSabadoHasta("");
            setDomingoDesde("");
            setDomingoHasta("");
            setTelefono("");
            setAgenteCambio(false);
            setVimenpaq(false);
            setPagaTodo(false);
            setBancoVimenca(false);
            setRemesas(false);
            setTipoOficina("Sucursal"); // Asegúrate de que el tipo de oficina se restablezca correctamente
            setShowConfirmPopup(false); // Cierra el popup de confirmación
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
