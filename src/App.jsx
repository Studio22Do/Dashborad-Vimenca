import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserProvider from "./providers/UserProvider";
import PrivateRoute from "./components/PrivateRoute";
import { EstafetasProviders } from "./providers/EstafetasProviders";

function App() {
    return (
        <EstafetasProviders>
            
            <BrowserRouter>
                <UserProvider>
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
                </UserProvider>
            </BrowserRouter>
        </EstafetasProviders>
    );
}

export default App;
