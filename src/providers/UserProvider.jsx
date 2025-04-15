import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
const serverUrl = import.meta.env.VITE_SERVER_URL;

export function useUserContext() {
    return useContext(UserContext);
}

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                `${serverUrl}/login/`,
                {
                    usermail: email,
                    password,
                },
                {
                    withCredentials: true,
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                        
                    },
                }
            );
            const newToken = response.data.access_token;
            setPassword(password);
            if (newToken && newToken !== token) {
                setToken(newToken);
            }
            return true;
        } catch (error) {
            console.error(
                "Error al iniciar sesión:",
                error.response ? error.response.data : error.message
            );
            throw error;
        }
    };

    const logout = async () => {
        try {
            setToken(null);
            navigate("/");
        } catch (error) {
            console.error("Error durante el logout:", error);
        }
    };

    return (
        <UserContext.Provider
            value={{ user, token, setToken, login, password, logout }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
