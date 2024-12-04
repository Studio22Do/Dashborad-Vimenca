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

import {
    useEditSucursal,
    useSucursalesContext,
} from "../../providers/SucursalesProviders";

import { useItemsOficinasContext } from "../../providers/OficinasProviders";

import { useUserContext } from "../../providers/UserProvider";

function EditCard({ onSave }) {
    const { editSucursal, setEditSucursal } = useEditSucursal();
    
    const { itemsOficinas, updateOficinaInDB } = useItemsOficinasContext();
    const [ItemsSucursales, setItemsSucursales] = useState([]);
    const { setActiveSucursal } = useSucursalesContext();
    const { user, password, token } = useUserContext(); // Obtén el usuario, la contraseña y el token
    const [ItemActual, setItemActual] = useState(null);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [inputPassword, setInputPassword] = useState(""); // Estado para la contraseña ingresada
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error
    useEffect(() => {
        setItemsSucursales(itemsOficinas.sucursales);
        /* console.log("ItemsEstafetas:", ItemsEstafetas); */
    }, [itemsOficinas]);

    useEffect(() => {
        if (editSucursal) {
            if (!ItemsSucursales || ItemsSucursales.length === 0) {
                return; // Detiene la ejecución si no hay sucursales
            }
            const currentItem = ItemsSucursales.find(
                (item) => item.id === editSucursal
            );
            if (currentItem) {
                setItemActual(currentItem);
            } else {
                console.warn(`No se encontró el item con id: ${editSucursal}`); // Mensaje de advertencia
                setEditSucursal(null); // Resetea editSucursal si no se encuentra
                setActiveSucursal(0); // Regresa a la vista de Oficinas después de guardar
            }
        }
    }, [editSucursal, ItemsSucursales]);


    const [id, setId] = useState("");
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
    const [diasFeriadosDesde, setDiasFeriadosDesde] = useState("");
    const [diasFeriadosHasta, setDiasFeriadosHasta] = useState("");

    const [telefono, setTelefono] = useState("");
    const [servicioPrincipal, setServicioPrincipal] = useState("");
    const [agenteCambio, setAgenteCambio] = useState(false); // Cambiado a booleano
    const [vimenpaq, setVimenpaq] = useState(false); // Cambiado a booleano
    const [pagaTodo, setPagaTodo] = useState(false); // Cambiado a booleano
    const [bancoVimenca, setBancoVimenca] = useState(false); // Cambiado a booleano
    const [remesas, setRemesas] = useState(false); // Cambiado a booleano
    const [tipoOficina, setTipoOficina] = useState("");

    const convertTo24HourFormat = (time) => {
        if (!time || typeof time !== "string") {
            return "";
        }
        // Eliminar todos los espacios en blanco excepto el que separa la hora del AM/PM
        time = time.replace(/\s+/g, " ").trim();

        let hours, minutes, modifier;
        const timeParts = time.toLowerCase().match(/(\d+):(\d+)\s*(am|pm)?/);

        if (!timeParts) {
            return "";
        }

        [, hours, minutes, modifier] = timeParts;
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);

        if (isNaN(hours) || isNaN(minutes)) {
            return "";
        }

        if (modifier === "pm" && hours !== 12) {
            hours += 12;
        } else if (modifier === "am" && hours === 12) {
            hours = 0;
        }

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}`;
    };

    const convertTo12HourFormat = (time) => {
        if (!time) return "";
        let [hours, minutes] = time.split(":");
        hours = parseInt(hours, 10);
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes.padStart(2, "0")} ${ampm}`;
    };

    const formatTimeRange = (start, end) => {
        if (!start || !end) return "CERRADO";
        const formattedStart = convertTo12HourFormat(start);
        const formattedEnd = convertTo12HourFormat(end);
        if (!formattedStart || !formattedEnd) return "CERRADO";
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
            setLatitud(ItemActual.latitud || 0); // Asegúrate de que no sea null
            setLongitud(ItemActual.longitud || 0); // Asegúrate de que no sea null

            // Manejo de horarios
            const lunesViernes = ItemActual.lunes_viernes_a
                ? ItemActual.lunes_viernes_a.split(" - ")
                : ["", ""];
            setLunesViernesDesde(convertTo24HourFormat(lunesViernes[0]));
            setLunesViernesHasta(convertTo24HourFormat(lunesViernes[1]));

            const lunesViernes2 = ItemActual.lunes_viernes_b
                ? ItemActual.lunes_viernes_b.split(" - ")
                : ["", ""];
            setLunesViernesDesde2(convertTo24HourFormat(lunesViernes2[0]));
            setLunesViernesHasta2(convertTo24HourFormat(lunesViernes2[1]));

            const sabado = ItemActual.sabado_a
                ? ItemActual.sabado_a.split(" - ")
                : ["", ""];
            setSabadoDesde(convertTo24HourFormat(sabado[0]));
            setSabadoHasta(convertTo24HourFormat(sabado[1]));

            const sabado2 = ItemActual.sabado_b
                ? ItemActual.sabado_b.split(" - ")
                : ["", ""];
            setSabadoDesde2(convertTo24HourFormat(sabado2[0]));
            setSabadoHasta2(convertTo24HourFormat(sabado2[1]));

            // Manejo del domingo
            if (ItemActual.domingo_a === "CERRADO") {
                setDomingoDesde("");
                setDomingoHasta("");
            } else {
                const domingo = ItemActual.domingo_a.split(" - ");
                setDomingoDesde(convertTo24HourFormat(domingo[0]));
                setDomingoHasta(convertTo24HourFormat(domingo[1]));
            }

            const domingo2 = ItemActual.domingo_b
                ? ItemActual.domingo_b.split(" - ")
                : ["", ""];
            setDomingoDesde2(convertTo24HourFormat(domingo2[0]));
            setDomingoHasta2(convertTo24HourFormat(domingo2[1]));

            const diasFeriados = ItemActual.dias_feriados_a
                ? ItemActual.dias_feriados_a.split(" - ").map((time) => time.trim())
                : ["", ""];
            setDiasFeriadosDesde(convertTo24HourFormat(diasFeriados[0]));
            setDiasFeriadosHasta(convertTo24HourFormat(diasFeriados[1]));

            setTelefono(ItemActual.telefono);
            setServicioPrincipal(ItemActual.servicio_principal);
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


        // Verifica la contraseña ingresada
        if (inputPassword !== password) {
            setErrorMessage("La contraseña es incorrecta."); // Establece el mensaje de error
            return; // Detiene la ejecución si la contraseña es incorrecta
        }

        // Validación de campos requeridos
        if (!nombre || !direccion) {
            setErrorMessage("Por favor, completa todos los campos requeridos."); // Mensaje de error
            return; // Detiene la ejecución si hay campos vacíos
        }

        // Preparar los horarios en el formato correcto
        const lunesViernesHorario = formatTimeRange(
            lunesViernesDesde,
            lunesViernesHasta
        );
        const lunesViernesHorario2 = formatTimeRange(
            lunesViernesDesde2,
            lunesViernesHasta2
        );
        const sabadoHorario = formatTimeRange(sabadoDesde, sabadoHasta);
        const sabadoHorario2 = formatTimeRange(sabadoDesde2, sabadoHasta2);
        const domingoHorario =
            domingoDesde && domingoHasta
                ? formatTimeRange(domingoDesde, domingoHasta)
                : "CERRADO";
        const domingoHorario2 =
            domingoDesde2 && domingoHasta2
                ? formatTimeRange(domingoDesde2, domingoHasta2)
                : "CERRADO";

        const diasFeriadosHorario = formatTimeRange(
            diasFeriadosDesde,
            diasFeriadosHasta
        );


        // Crear el objeto con los datos actualizados
        const updatedOficina = {
            id,
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
            dias_feriados_a: diasFeriadosHorario,
            telefono,
            servicio_principal: servicioPrincipal,
            agente_de_cambio: convertBooleanToYN(agenteCambio),
            vimenpaq: convertBooleanToYN(vimenpaq),
            pagatodo: convertBooleanToYN(pagaTodo),
            banco_vimenca: convertBooleanToYN(bancoVimenca),
            tipo_de_oficina: tipoOficina,
            remesas: convertBooleanToYN(remesas),
            // Asegúrate de incluir todos los campos necesarios
        };
        setAgenteCambio(true);

        try {
            // Llama a la función para actualizar la estafeta en la base de datos
            const updatedData = await updateOficinaInDB(
                id,
                updatedOficina,
                
            );

            // Llama a la función que obtiene los datos de la API
            /* getEstafetas(token, setItemsEstafetas); // Pasa setItemsEstafetas como argumento */

            // Actualiza el estado de la estafeta en edición
            setEditSucursal(null); // Cierra el modo de edición
            setActiveSucursal(0); // Regresa a la vista de Oficinas después de guardar
            setShowConfirmPopup(false); // Cierra el popup de confirmación
            onSave(updatedData); // Llama a onSave con los datos actualizados
        } catch (error) {
            setErrorMessage("Error al guardar los cambios."); // Manejo de errores
            console.error("Error al guardar los cambios:", error);
        }
    };

    const handleCancelSave = () => {
        setShowConfirmPopup(false);
    };

    const handleBack = () => {
        setActiveSucursal(0);
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
                            {/* ############### */}
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={lunesViernesDesde2}
                                        onChange={(e) =>
                                            setLunesViernesDesde2(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={lunesViernesHasta2}
                                        onChange={(e) =>
                                            setLunesViernesHasta2(e.target.value)
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
                                        type="time"
                                        value={sabadoHasta}
                                        onChange={(e) =>
                                            setSabadoHasta(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                            {/* ############### */}
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={sabadoDesde2}
                                        onChange={(e) =>
                                            setSabadoDesde2(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={sabadoHasta2}
                                        onChange={(e) =>
                                            setSabadoHasta2(e.target.value)
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
                            {/* ############### */}
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={domingoDesde2}
                                        onChange={(e) =>
                                            setDomingoDesde2(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={domingoHasta2}
                                        onChange={(e) =>
                                            setDomingoHasta2(e.target.value)
                                        }
                                    />
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className="flex gap-5 p-1 my-4">
                        <div className="w-4"></div>
                        <div>
                            <h3 className="font-semibold">Dias Feriados</h3>
                            <div className="flex gap-8 mt-1">
                                <label className="text-sm text-gray-500">
                                    Desde:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={diasFeriadosDesde}
                                        onChange={(e) =>
                                            setDiasFeriadosDesde(e.target.value)
                                        }
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="time"
                                        value={diasFeriadosHasta}
                                        onChange={(e) =>
                                            setDiasFeriadosHasta(e.target.value)
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
                    





                    {/* #################### */}
                    <div className="flex gap-2 items-end mb-1 p-1">
                        <div className="w-6"></div>
                        <div className="w-full">
                            <div className="w-full">
                                <select
                                    className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={provincia}
                                    onChange={(e) =>
                                        setProvincia(e.target.value)
                                    }
                                >
                                    <option value="">
                                        --Seleccione una provincia--
                                    </option>
                                    <option value="Santo Domingo">Santo Domingo</option>
                                    <option value="Puerto Plata">Puerto Plata</option>
                                    <option value="Santiago">Santiago</option>
                                    <option value="La Romana">La Romana</option>
                                    <option value="San Pedro de Macorís">San Pedro de Macorís</option>
                                    <option value="La Vega">La Vega</option>
                                    <option value="San Cristóbal">San Cristóbal</option>
                                    <option value="Higüey">Higüey</option>
                                    <option value="Moca">Moca</option>
                                    <option value="Azua">Azua</option>
                                    <option value="Barahona">Barahona</option>
                                    <option value="San Juan">San Juan</option>
                                    <option value="Monte Cristi">Monte Cristi</option>
                                    <option value="Samana">Samana</option>
                                    <option value="Monte Plata">Monte Plata</option>
                                    <option value="Peravia">Peravia</option>
                                    <option value="Espaillat">Espaillat</option>
                                    <option value="Dajabón">Dajabón</option>
                                    <option value="Elías Piña">Elías Piña</option>
                                    <option value="Independencia">Independencia</option>
                                    <option value="María Trinidad Sánchez">María Trinidad Sánchez</option>
                                    <option value="Monseñor Nouel">Monseñor Nouel</option>
                                    <option value="Pedernales">Pedernales</option>
                                    <option value="Hermanas Mirabal">Hermanas Mirabal</option>
                                    <option value="Bahoruco">Bahoruco</option>
                                    <option value="Valverde">Valverde</option>
                                    <option value="Sánchez Ramírez">Sánchez Ramírez</option>
                                    <option value="Boca Chica">Boca Chica</option>
                                    <option value="Distrito Nacional">Distrito Nacional</option>
                                    <option value="Duarte">Duarte</option>
                                    <option value="El Seibo">El Seibo</option>
                                    <option value="Hato Mayor">Hato Mayor</option>
                                    <option value="San José de Ocoa">San José de Ocoa</option>
                                    <option value="San Juan de la Maguana">San Juan de la Maguana</option>
                                    <option value="Santiago Rodríguez">Santiago Rodríguez</option>
                                    <option value="Santo Domingo Este">Santo Domingo Este</option>
                                    <option value="Santo Domingo Norte">Santo Domingo Norte</option>
                                    <option value="Santo Domingo Oeste">Santo Domingo Oeste</option>
                                    
                                </select>
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
                                icon={"Agente de Cambio"}
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
            <div className="w-full max-h-fit p-1 border m-3 rounded-lg">
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
