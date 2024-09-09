import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProvider from "./providers/UserProvider"; // Asegúrate de importar el UserProvider
import PrivateRoute from "./components/PrivateRoute"; // Importa PrivateRoute

function App() {
    return (
        <UserProvider> {/* Envuelve las rutas con UserProvider */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/Dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }></Route>
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
