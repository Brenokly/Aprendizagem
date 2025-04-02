import { CarrinhoProvider } from "./components/CarrinhoContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Catalogo from "./pages/Catalogo";
import Erro from "./pages/Erro";
import Produto from "./pages/Produto";
import { Outlet } from "react-router-dom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          element={
            <CarrinhoProvider>
              <ProtectedRoutes />
            </CarrinhoProvider>
          }
        >
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sobre" element={<Sobre />} />
        </Route>
        <Route exact path="/catalogo" element={<Catalogo />} />
        <Route exact path="/produto/:id" element={<Produto />} />
        <Route path="*" element={<Erro/>} />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoutes() {
  return <Outlet />;
}

export default AppRoutes;