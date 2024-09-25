import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../providers/UserProvider";

const PrivateRoute = ({ children }) => {
    const { token } = useUserContext();

    return token ? children : <Navigate to="/" />;
};

export default PrivateRoute; // Asegúrate de que esta línea esté presente