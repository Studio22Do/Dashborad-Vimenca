import React from "react";
import LogoAzul from "../assets/Logo-Azul.png";
import sidebar from "../assets/side-lg.png";
import vimenca from "../assets/vimenca.png";
import Bancovimenca from "../assets/Banco-vimenca.png";
import vimenpaq from "../assets/vimenpaq.png";
import Datavimenca from "../assets/Data-vimenca.png";
import pagatodo from "../assets/pagatodo.png";

function Login() {
    return (
        <div className="flex flex-row">
            <div
                className="w-3/12 min-h-lvh bg-red-700"
                style={{ 
                    backgroundImage: `url(${sidebar})`, 
                    backgroundSize:"cover"
                }}
            ></div>
            <div className="w-9/12 min-h-lvh flex flex-col items-center justify-end">
                <div className="w-5/12 flex flex-col items-center">
                    <img src={LogoAzul} alt="" className="w-96" />
                    <p className="font-bold text-2xl mt-24 mb-10 text-[--primary]">
                        Dashboard Vimenca
                    </p>

                    <div className="flex flex-col w-7/12">
                        <div className="relative mb-4 ">
                            <label
                                for="email"
                                className="leading-7 text-sm text-[--primary] font-medium"
                            >
                                Correo
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full bg-white rounded-full border border-[--primary] border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div className="relative mb-4">
                            <label
                                for="password"
                                className="leading-7 text-sm text-gray-600"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full bg-white rounded-full border border-[--primary] border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <button className="text-white bg-[--primary] border py-2 px-16 rounded-full w-10/12 m-auto focus:outline-none hover:bg-white hover:text-[--primary] border-[--primary] text-lg">
                            Iniciar Sesión
                        </button>
                    </div>

                    
                </div>
                <div className="flex gap-12 mt-44 mb-10">
                        <img src={vimenca} alt="" />
                        <img src={Bancovimenca} alt="" />
                        <img src={vimenpaq} alt="" />
                        <img src={Datavimenca} alt="" />
                        <img src={pagatodo} alt="" />
                    </div>
            </div>
            
        </div>
    );
}

export default Login;
