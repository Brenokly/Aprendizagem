import { createContext, useState, useContext, useEffect } from "react";

// Criando o contexto
const CarrinhoContext = createContext();

// Provedor do contexto
export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  function adicionarAoCarrinho(item) {
    setCarrinho((prev) => [...prev, item]);
  }

  function removerDoCarrinho(itemId) {
    setCarrinho((prev) => prev.filter((item) => item.id !== itemId));
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  const carrinhoContextValue = {
    carrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho
  };

  return (
    <CarrinhoContext.Provider value={carrinhoContextValue}>
      {children}
    </CarrinhoContext.Provider>
  );
}

// Hook personalizado para acessar TODO o contexto como um objeto
export function useCarrinho() {
  return useContext(CarrinhoContext);
}