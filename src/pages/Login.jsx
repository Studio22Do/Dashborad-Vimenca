import React, { useEffect } from "react"; // Asegúrate de importar useEffect
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
    const { login, token } = useUserContext(); // No es necesario obtener setToken aquí
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false); // Estado para controlar el botón
    const navigate = useNavigate(); // Inicializa useNavigate
    const [hasRedirected, setHasRedirected] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Desactiva el botón al enviar
        const success = await login(email, password); // Llama a la función de login

        if (success) {
            /* console.log("Inicio de sesión exitoso"); */
            // Aquí no redirigimos inmediatamente, ya que el useEffect se encargará de eso
        } else {
            alert("Error al iniciar sesión"); // Mensaje de error
        }
        setIsSubmitting(false); // Reactiva el botón después de la respuesta
    };

    useEffect(() => {
        if (token && !hasRedirected) {
            navigate("/Dashboard");
            setHasRedirected(true); // Marca que ya se ha redirigido
        }
    }, [token, hasRedirected]); // Asegúrate de que dependa de 'token' y 'hasRedirected'

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-row">
                <div
                    className="w-3/12 min-h-lvh bg-red-700"
                    style={{
                        backgroundImage: `url(${sidebar})`,
                        backgroundSize: "cover",
                    }}
                ></div>
                <div className="w-9/12 min-h-lvh flex flex-col items-center justify-end">
                    <div className="w-5/12 flex flex-col items-center relative">
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    } // Actualiza el estado
                                    className="w-full bg-white rounded-full border border-[--primary] border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <button
                                type="submit"
                                className="text-white text-nowrap bg-[--primary] border py-2 px-16 rounded-full w-10/12 m-auto"
                                disabled={isSubmitting} // Desactiva el botón si está enviando
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                        {isSubmitting && <div className="loader"></div>}
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
