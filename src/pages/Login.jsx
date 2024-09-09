import React, { useContext } from "react";
import { useUserContext } from "../providers/UserProvider"; // Asegúrate de importar el contexto
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import LogoAzul from "../assets/Logo-Azul.png";
import sidebar from "../assets/side-lg.png";
import vimenca from "../assets/vimenca.png";
import Bancovimenca from "../assets/Banco-vimenca.png";
import vimenpaq from "../assets/vimenpaq.png";
import Datavimenca from "../assets/Data-vimenca.png";
import pagatodo from "../assets/pagatodo.png";

function Login() {
    const { login } = useUserContext(); // Obtén la función de login
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí deberías verificar si el correo y la contraseña son correctos
        // Por simplicidad, asumimos que son correctos
        if (login(email, password)) { // Verifica el resultado del login
            console.log("Inicio de sesión exitoso"); // Mensaje de éxito
            navigate("/Dashboard"); // Redirige al Dashboard
        } else {
            alert("Credenciales incorrectas"); // Mensaje de error
        }
    };

    return (
        <form onSubmit={handleSubmit}> {/* Asegúrate de envolver el contenido en un formulario */}
            <div className="flex flex-row">
                <div
                    className="w-3/12 min-h-lvh bg-red-700"
                    style={{
                        backgroundImage: `url(${sidebar})`,
                        backgroundSize: "cover",
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
                                    htmlFor="email"
                                    className="leading-7 text-sm text-[--primary] font-medium"
                                >
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // Actualiza el estado
                                    className="w-full bg-white rounded-full border border-[--primary] border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>

                            <div className="relative mb-4">
                                <label
                                    htmlFor="password"
                                    className="leading-7 text-sm text-gray-600"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                                    className="w-full bg-white rounded-full border border-[--primary] border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <button type="submit" className="text-white bg-[--primary] border py-2 px-16 rounded-full w-10/12 m-auto">
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
        </form>
    );
}

export default Login;
