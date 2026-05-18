import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Employees from "./pages/Employees";
import PrivateRoute from "./components/PrivateRoutes";
import KB from "./pages/KB";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/KB"
            element={
              <PrivateRoute>
                <KB />
              </PrivateRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <PrivateRoute>
                <Inventory />
              </PrivateRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <Employees />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
