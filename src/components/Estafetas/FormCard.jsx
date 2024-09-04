import React from "react";
import Clock from "../../assets/Clock.png";
import Loc from "../../assets/location.png";
import Phone from "../../assets/phone.png";
import Iconvimenca from "../../assets/iconremesas.png";
import Iconvimenpaq from "../../assets/iconvimenpaq.png";
import Iconpagatodo from "../../assets/iconpagatodo.png";
import Iconbancox from "../../assets/iconbancox.png";
import ToggleButton from "../Botones/ToggleButton";
import { useEstafetasContext } from "../../providers/EstafetasProviders";

function FormCard() {
    const { activeEstafeta, setActiveEstafeta } = useEstafetasContext();
    return (
        <div className="flex justify-center">
            <div className=" border p-16 rounded-2xl">
                <h2 className="font-bold text-xl text-[--primary] text-center border-b mb-2">
                    Informacion de la estafeta
                </h2>
                <div>
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
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
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
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
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
                                    />
                                </label>
                                <label className="text-sm text-gray-500">
                                    Hasta:
                                    <input
                                        className="de text-black relative flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id=""
                                        type="time"
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
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 py-7 justify-center w-full ">
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconvimenca} alt="" className="w-11" />
                            <ToggleButton icon={"vimenca"} />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconvimenpaq} alt="" className="w-11" />
                            <ToggleButton icon={"vimenpaq"} />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconbancox} alt="" className="w-11" />
                            <ToggleButton icon={"bancovimenca"} />
                        </div>
                        <div className="flex gap-8 items-center justify-center">
                            <img src={Iconpagatodo} alt="" className="w-11" />
                            <ToggleButton icon={"pagatodo"} />
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            className="py-2 px-8 rounded-lg text-[--primary] font-semibold border border-[--primary]"
                            onClick={() => setActiveEstafeta(0)}
                        >
                            Atras
                        </button>
                        <button className="py-2 px-8 rounded-lg text-white font-semibold border border-[--primary] bg-[--primary]">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormCard;
