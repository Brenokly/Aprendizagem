import { createContext, useState, useContext } from "react";

// Criando o contexto
const CarrinhoContext = createContext();

// Hook personalizado para acessar o contexto
export function useCarrinho() {
  return useContext(CarrinhoContext);
}

// Provedor do contexto
export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  // Função para adicionar itens ao carrinho
  function adicionarAoCarrinho(item) {
    setCarrinho((prev) => [...prev, item]);
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}