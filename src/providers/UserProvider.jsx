import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const UserContext = createContext();
const serverUrl = import.meta.env.VITE_SERVER_URL;
console.log("este es el serverUrl: ", serverUrl);
export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [password, setPassword] = useState("");

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                `${serverUrl}/login/`,
                {
                    /* useremail: email, //server */
                    usermail: email, // ionos
                    password,
                },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        /* Accept: "application/json", */
                    },
                }
            );
            const newToken = response.data.access_token; // Accede directamente al token
            console.log("este es el token: ", newToken);
            setPassword(password);
            if (newToken && newToken !== token) {
                // Solo establece el token si es diferente
                setToken(newToken); // Guarda el token
                console.log("este es el token después de setear: ", newToken);
            }

            return true; // Indica que el inicio de sesión fue exitoso
        } catch (error) {
            console.error(
                "Error al iniciar sesión:",
                error.response ? error.response.data : error.message
            );
            return false; // Indica que el inicio de sesión falló
        }
    };

    return (
        <UserContext.Provider
            value={{ user, token, setToken, login, password }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
