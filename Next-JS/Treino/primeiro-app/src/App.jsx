import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CarrinhoProvider } from "./components/CarrinhoContext";
import Home from "./Home";
import Sobre from "./Sobre";

function App() {
  return (
    <CarrinhoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </CarrinhoProvider>
  );
}

export default App;