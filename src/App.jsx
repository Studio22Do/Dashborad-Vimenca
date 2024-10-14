import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProvider from "./providers/UserProvider";
import PrivateRoute from "./components/PrivateRoute";
import { EstafetasProviders } from "./providers/EstafetasProviders";

function App() {
    return (
        <UserProvider>
            <EstafetasProviders> {/* Envuelve el BrowserRouter con EstafetasProviders */}
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />}></Route>
                        <Route
                            path="/Dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </EstafetasProviders>
        </UserProvider>
    );
}

export default App;
