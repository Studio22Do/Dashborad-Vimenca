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
    /* useItemsRepresentantesContext, */
    useSucursalesContext,
    /* getEstafetas, // Importa getEstafetas */
} from "../../providers/SucursalesProviders";

import { useItemsOficinasContext } from "../../providers/OficinasProviders";

import { useUserContext } from "../../providers/UserProvider"; // Importa el contexto de usuario

function EditCard({ onSave }) {
    console.log("onSave en estafeta:", onSave);
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
        console.log("ItemsOficinas: ^^^^^^^^^^", itemsOficinas);
    }, [itemsOficinas]);

    useEffect(() => {
        console.log("ItemsSucursales:", ItemsSucursales); // Verifica el contenido de ItemsEstafetas
        if (editSucursal) {
            if (!ItemsSucursales || ItemsSucursales.length === 0) {
                console.warn("No hay sucursales disponibles para editar."); // Mensaje de advertencia
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

    useEffect(() => {
        console.log("ItemActual:", ItemActual);
        console.log("editSucursal:", editSucursal);
    }, [ItemActual, editSucursal]);


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
            return "Formato de hora inválido"; // Manejo de caso donde time es undefined o no es una cadena
        }

        let hours, minutes, modifier;
        const timeParts = time.toLowerCase().split(" ");

        if (timeParts.length !== 2) {
            return "Formato de hora inválido";
        }

        const [timePart, modifierPart] = timeParts;
        const [hoursPart, minutesPart] = timePart.split(":");

        hours = parseInt(hoursPart, 10);
        minutes = minutesPart;
        modifier = modifierPart;

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
        let [hours, minutes] = time.split(":");
        hours = parseInt(hours, 10);
        const modifier = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        return `${hours}:${minutes}${modifier}`;
    };

    useEffect(() => {
        if (ItemActual) {
            console.log("ItemActual:", ItemActual); // Verifica los datos
            setId(ItemActual.id);
            setNombre(ItemActual.nombre_oficina);
            setDireccion(ItemActual.direccion);
            setProvincia(ItemActual.provincia);
            setLatitud(ItemActual.latitud || 0); // Asegúrate de que no sea null
            setLongitud(ItemActual.longitud || 0); // Asegúrate de que no sea null

            // Manejo de horarios
            const lunesViernes = ItemActual.a_lunes_viernes
                ? ItemActual.a_lunes_viernes.split(" - ")
                : ["", ""];
            setLunesViernesDesde(convertTo24HourFormat(lunesViernes[0]));
            setLunesViernesHasta(convertTo24HourFormat(lunesViernes[1]));

            const sabado = ItemActual.a_sabado
                ? ItemActual.a_sabado.split(" - ")
                : ["", ""];
            setSabadoDesde(convertTo24HourFormat(sabado[0]));
            setSabadoHasta(convertTo24HourFormat(sabado[1]));

            // Manejo del domingo
            if (ItemActual.a_domingo === "NO LABORA") {
                setDomingoDesde("");
                setDomingoHasta("");
            } else {
                const domingo = ItemActual.a_domingo.split(" - ");
                setDomingoDesde(convertTo24HourFormat(domingo[0]));
                setDomingoHasta(convertTo24HourFormat(domingo[1]));
            }

            setTelefono(ItemActual.telefono);

            setAgenteCambio(ItemActual.agente_de_cambio);
            setVimenpaq(ItemActual.vimenpaq);
            setPagaTodo(ItemActual.pagatodo);
            setBancoVimenca(ItemActual.banco_vimenca);
            setRemesas(ItemActual.remesas);
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
            a_lunes_viernes: `${convertTo12HourFormat(
                lunesViernesDesde
            )} - ${convertTo12HourFormat(lunesViernesHasta)}`,
            a_sabado: `${convertTo12HourFormat(
                sabadoDesde
            )} - ${convertTo12HourFormat(sabadoHasta)}`,
            a_domingo: domingoDesde
                ? `${convertTo12HourFormat(
                      domingoDesde
                  )} - ${convertTo12HourFormat(domingoHasta)}`
                : "NO LABORA",
            telefono,
            agente_de_cambio: agenteCambio,
            vimenpaq,
            pagatodo: pagaTodo,
            banco_vimenca: bancoVimenca,
            tipo_de_oficina: tipoOficina,
        };

        console.log("Datos a actualizar:", updatedOficina);
        setAgenteCambio(true);

        try {
            // Llama a la función para actualizar la estafeta en la base de datos
            const updatedData = await updateOficinaInDB(
                id,
                updatedOficina,
                
            );
            console.log("Datos actualizados desde la API:", updatedData);

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
