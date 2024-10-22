import React, { useEffect, useState } from "react";
import Clock from "../../assets/Clock.png";
import Loc from "../../assets/location.png";
import Phone from "../../assets/phone.png";
import Iconvimenca from "../../assets/iconremesas.png";
import Iconvimenpaq from "../../assets/iconvimenpaq.png";
import Iconpagatodo from "../../assets/iconpagatodo.png";
import Iconbancox from "../../assets/iconbancox.png";
import ToggleButton from "../Botones/ToggleButton";
import Popup from "reactjs-popup";
import ButtonDelete from "../Botones/ButtonDelete";
import Mapa from "../Mapa";
import { format, parse } from "date-fns";

import {
    useEditRepresentante,
    useRepresentantesContext,
} from "../../providers/RepresentantesProviders";

import { useItemsOficinasContext } from "../../providers/OficinasProviders";

import { useUserContext } from "../../providers/UserProvider";

function EditCard({ onSave }) {
    console.log("onSave en estafeta:", onSave);
    const { editRepresentante, setEditRepresentante } = useEditRepresentante();
    
    const { itemsOficinas, updateOficinaInDB } = useItemsOficinasContext();
    const [ItemsRepresentantes, setItemsRepresentantes] = useState([]);
    const { setActiveRepresentante } = useRepresentantesContext();
    const { user, password, token } = useUserContext(); // Obtén el usuario, la contraseña y el token
    const [ItemActual, setItemActual] = useState(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [inputPassword, setInputPassword] = useState(""); // Estado para la contraseña ingresada
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error
    useEffect(() => {
        setItemsRepresentantes(itemsOficinas.representantes);
        /* console.log("ItemsEstafetas:", ItemsEstafetas); */
        console.log("ItemsOficinas: ^^^^^^^^^^", itemsOficinas);
    }, [itemsOficinas]);

    useEffect(() => {
        console.log("ItemsRepresentantes:", ItemsRepresentantes); // Verifica el contenido de ItemsEstafetas
        if (editRepresentante) {
            if (!ItemsRepresentantes || ItemsRepresentantes.length === 0) {
                console.warn("No hay representantes disponibles para editar."); // Mensaje de advertencia
                return; // Detiene la ejecución si no hay representantes
            }
            const currentItem = ItemsRepresentantes.find(
                (item) => item.id === editRepresentante
            );
            if (currentItem) {
                setItemActual(currentItem);
            } else {
                console.warn(`No se encontró el item con id: ${editRepresentante}`); // Mensaje de advertencia
                setEditRepresentante(null); // Resetea editRepresentante si no se encuentra
                setActiveRepresentante(0); // Regresa a la vista de Oficinas después de guardar
            }
        }
    }, [editRepresentante, ItemsRepresentantes]);

    useEffect(() => {
        console.log("ItemActual:", ItemActual);
        console.log("editRepresentante:", editRepresentante);
    }, [ItemActual, editRepresentante]);


    const [id, setId] = useState("");
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
    const [agenteCambio, setAgenteCambio] = useState(false); // Cambiado a booleano
    const [vimenpaq, setVimenpaq] = useState(false); // Cambiado a booleano
    const [pagaTodo, setPagaTodo] = useState(false); // Cambiado a booleano
    const [bancoVimenca, setBancoVimenca] = useState(false); // Cambiado a booleano
    const [remesas, setRemesas] = useState(false); // Cambiado a booleano
    const [tipoOficina, setTipoOficina] = useState("");

    const convertTo24HourFormat = (time) => {
        if (!time || typeof time !== "string") {
            return "Formato de hora inválido";
        }
        time = time.replace(/\s+/g, "");

        let hours, minutes, modifier;
        const timeParts = time.toLowerCase().match(/(\d+):(\d+)(am|pm)/);

        if (!timeParts) {
            return "Formato de hora inválido";
        }

        [, hours, minutes, modifier] = timeParts;
        hours = parseInt(hours, 10);

        if (isNaN(hours) || minutes.length !== 2) {
            return "Formato de hora inválido";
        }

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
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // la hora '0' debe ser '12'
        return `${hours}:${minutes.padStart(2, "0")}${ampm}`;
    };

    const formatTimeRange = (start, end) => {
        const formattedStart = convertTo12HourFormat(start);
        const formattedEnd = convertTo12HourFormat(end);
        return `${formattedStart} - ${formattedEnd}`;
    };

    // Función auxiliar para convertir "Y"/"N" a booleano
    const convertYNToBoolean = (value) => value === "Y";

    // Función auxiliar para convertir booleano a "Y"/"N"
    const convertBooleanToYN = (value) => value ? "Y" : "N";

    useEffect(() => {
        if (ItemActual) {
            setId(ItemActual.id);
            setNombre(ItemActual.nombre_oficina);
            setDireccion(ItemActual.direccion);
            setProvincia(ItemActual.provincia);
            setLatitud(ItemActual.latitud || 0);
            setLongitud(ItemActual.longitud || 0);

            // Manejo de horarios
            const lunesViernes = ItemActual.lunes_viernes_a
                ? ItemActual.lunes_viernes_a.split(" - ").map((time) => time.trim())
                : ["", ""];
            setLunesViernesDesde(convertTo24HourFormat(lunesViernes[0]));
            setLunesViernesHasta(convertTo24HourFormat(lunesViernes[1]));

            const sabado = ItemActual.sabado_a
                ? ItemActual.sabado_a.split(" - ").map((time) => time.trim())
                : ["", ""];
            setSabadoDesde(convertTo24HourFormat(sabado[0]));
            setSabadoHasta(convertTo24HourFormat(sabado[1]));

            // Manejo del domingo
            if (ItemActual.domingo_a === "CERRADO") {
                setDomingoDesde("");
                setDomingoHasta("");
            } else {
                const domingo = ItemActual.domingo_a
                    .split(" - ")
                    .map((time) => time.trim());
                setDomingoDesde(convertTo24HourFormat(domingo[0]));
                setDomingoHasta(convertTo24HourFormat(domingo[1]));
            }

            setTelefono(ItemActual.telefono);

            setAgenteCambio(convertYNToBoolean(ItemActual.agente_de_cambio));
            setVimenpaq(convertYNToBoolean(ItemActual.vimenpaq));
            setPagaTodo(convertYNToBoolean(ItemActual.pagatodo));
            setBancoVimenca(convertYNToBoolean(ItemActual.banco_vimenca));
            setRemesas(convertYNToBoolean(ItemActual.remesas));
            setTipoOficina(ItemActual.tipo_de_oficina);
        }
    }, [ItemActual]);

    const handleSaveClick = () => {
        setShowConfirmPopup(true); // Muestra el popup de confirmación
    };

    const handleConfirmSave = async () => {
        console.log("Contraseña ingresada:", inputPassword);
        console.log("Contraseña almacenada:", password);

        // Verifica la contraseña ingresada
        if (inputPassword !== password) {
            setErrorMessage("La contraseña es incorrecta."); // Establece el mensaje de error
            console.log("Error: La contraseña es incorrecta.");
            return; // Detiene la ejecución si la contraseña es incorrecta
        }

        // Validación de campos requeridos
        if (!nombre || !direccion) {
            setErrorMessage("Por favor, completa todos los campos requeridos."); // Mensaje de error
            return; // Detiene la ejecución si hay campos vacíos
        }

        // Crea un objeto con los datos actualizados
        const updatedOficina = {
            id,
            nombre_oficina: nombre,
            direccion,
            provincia,
            latitud,
            longitud,
            a_lunes_viernes: formatTimeRange(lunesViernesDesde, lunesViernesHasta),
            a_sabado: formatTimeRange(sabadoDesde, sabadoHasta),
            a_domingo: domingoDesde && domingoHasta
                ? formatTimeRange(domingoDesde, domingoHasta)
                : "NO LABORA",
            telefono,
            agente_de_cambio: convertBooleanToYN(agenteCambio),
            vimenpaq: convertBooleanToYN(vimenpaq),
            pagatodo: convertBooleanToYN(pagaTodo),
            banco_vimenca: convertBooleanToYN(bancoVimenca),
            remesas: convertBooleanToYN(remesas),
            tipo_de_oficina: tipoOficina,
        };

        console.log("Datos a actualizar:", updatedOficina);

        try {
            // Llama a la función para actualizar la oficina en la base de datos
            const updatedData = await updateOficinaInDB(id, updatedOficina);
            console.log("Datos actualizados desde la API:", updatedData);

            // Actualiza el estado de la oficina en edición
            setEditRepresentante(null);
            setActiveRepresentante(0);
            setShowConfirmPopup(false);
            onSave(updatedData);
        } catch (error) {
            setErrorMessage("Error al guardar los cambios.");
            console.error("Error al guardar los cambios:", error);
        }
    };

    const handleCancelSave = () => {
        setShowConfirmPopup(false);
    };

    const handleBack = () => {
        setActiveRepresentante(0);
    };

    const handleToggleChange = (setter) => (newState) => {
        setter(newState);
    };

    return (
        <div className="flex justify-center">
            <div className="border p-16 rounded-2xl">
                <h2 className="font-bold text-xl text-[--primary] text-center border-b mb-2">
                    EDITAR OFICINA - {tipoOficina}
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
                                        type="text"
                                        value={nombre}
                                        name="nombreEstafeta"
                                        id="nombreEstafeta"
                                        autoComplete="off"
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
                                    Desde: {sabadoDesde}
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={sabadoDesde}
                                        onChange={(e) =>
                                            setSabadoDesde(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta: {sabadoHasta}
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                            style={{ backgroundSize: "cover" }}
                            title="Direccion"
                        />
                        <div className="w-full">
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm w-full">
                                    <textarea
                                        className="de text-black relative flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                    <div className="flex text-xs gap-3 text-center justify-center py-2 text-gray-400 w-full">
                        <p>Lat: {latitud}</p>
                        <p>Long: {longitud}</p>
                    </div>
                    <div className="flex flex-col gap-3 py-7 justify-center w-full">
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconvimenca} alt="" className="w-11" />
                            <ToggleButton
                                icon={"Remesas"}
                                setState={handleToggleChange(setRemesas)}
                                state={remesas}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconvimenpaq} alt="" className="w-11" />
                            <ToggleButton
                                icon={"vimenpaq"}
                                setState={handleToggleChange(setVimenpaq)}
                                state={vimenpaq}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconbancox} alt="" className="w-11" />
                            <ToggleButton
                                icon={"bancovimenca"}
                                setState={handleToggleChange(setBancoVimenca)}
                                state={bancoVimenca}
                            />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconpagatodo} alt="" className="w-11" />
                            <ToggleButton
                                icon={"pagatodo"}
                                setState={handleToggleChange(setPagaTodo)}
                                state={pagaTodo}
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <ButtonDelete id={id} />

                        <button
                            className="py-2 px-8 rounded-lg text-white font-semibold border border-[--primary] bg-[--primary]"
                            onClick={handleSaveClick}
                        >
                            Guardar
                        </button>
                        {/* <button
                            className="py-2 px-8 rounded-lg text-[--primary] font-semibold border border-[--primary]"
                            onClick={handleBack}
                        >
                            Atras
                        </button> */}
                    </div>
                    <Popup
                        open={showConfirmPopup}
                        onClose={handleCancelSave}
                        modal
                    >
                        <div className="bg-white py-8 px-12 rounded-lg shadow-lg">
                            <h2 className="font-bold text-xl text-center mb-4 text-[--primary]">
                                Are you sure you want to continue?
                            </h2>
                            <label htmlFor="editCardPassword">
                                Write your password
                                <input
                                    type="password"
                                    id="editCardPassword" // Cambia el id a uno único
                                    name="editCardPassword" // Agrega un nombre único
                                    value={inputPassword}
                                    onChange={(e) =>
                                        setInputPassword(e.target.value)
                                    } // Actualiza el estado
                                    className="border rounded-md p-2 w-full"
                                    placeholder="Your Password"
                                    autoComplete="off" // Cambia a "new-password"
                                />
                            </label>
                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    className="py-2 px-8 rounded-lg text-[--primary] font-semibold border border-[--primary]"
                                    onClick={handleCancelSave}
                                >
                                    No, cancel
                                </button>
                                <button
                                    className="py-2 px-8 rounded-lg text-white font-semibold border border-[--primary] bg-[--primary]"
                                    onClick={handleConfirmSave}
                                >
                                    Yes, confirm
                                </button>
                            </div>
                        </div>
                    </Popup>
                    {errorMessage && (
                        <p className="text-red-500 text-center py-1">
                            {errorMessage}
                        </p>
                    )}{" "}
                    {/* Muestra el mensaje de error */}
                </div>
            </div>
            <div className="w-full h-[600px] p-1 border m-3 rounded-lg">
                {" "}
                {/* Asegúrate de que el contenedor tenga un tamaño definido */}
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

export default EditCard;
