import "./index.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/Dashboard" element={<Dashboard />}></Route>
                
            </Routes>
        </BrowserRouter>
    );
}

export default App;
