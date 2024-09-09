import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function useUserContext() {
    return useContext(UserContext);
}

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState("");
    const [timeoutId, setTimeoutId] = useState(null);
    const inactivityTime = 30000000; // 5 minutos en milisegundos 300000

    const login = (userData, userPassword) => {
        if (userData === "admin@example.com" && userPassword === "admin123") {
            setUser(userData);
            setPassword(userPassword);
            resetInactivityTimer(); // Reinicia el temporizador al iniciar sesión
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setPassword("");
        clearTimeout(timeoutId); // Limpia el temporizador al cerrar sesión
    };

    const resetInactivityTimer = () => {
        clearTimeout(timeoutId);
        const id = setTimeout(() => {
            logout(); // Cierra sesión después de inactividad
        }, inactivityTime);
        setTimeoutId(id);
    };

    const handleUserActivity = () => {
        resetInactivityTimer(); // Reinicia el temporizador en cada actividad
    };

    useEffect(() => {
        // Escucha eventos de actividad del usuario
        window.addEventListener("click", handleUserActivity);
        window.addEventListener("mousemove", handleUserActivity);
        window.addEventListener("keypress", handleUserActivity);

        return () => {
            // Limpia los event listeners al desmontar el componente
            window.removeEventListener("click", handleUserActivity);
            window.removeEventListener("mousemove", handleUserActivity);
            window.removeEventListener("keypress", handleUserActivity);
            clearTimeout(timeoutId); // Limpia el temporizador
        };
    }, [timeoutId]);

    const value = {
        user,
        password,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export default UserProvider;
