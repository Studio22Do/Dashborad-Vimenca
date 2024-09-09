import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../providers/UserProvider";

const PrivateRoute = ({ children }) => {
    const { user } = useUserContext(); // Obtén el usuario del contexto

    return user ? children : <Navigate to="/" />; // Redirige a Login si no hay usuario
};

export default PrivateRoute; // Asegúrate de que esta línea esté presente