import { useCarrinho } from "../../components/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const carrinhoContext = useCarrinho();
  const [id, setId] = useState(1);
  const navigate = useNavigate();

  function adicionar() {
    // Pegar o último ID do carrinho
    const ultimoId = carrinhoContext.carrinho.length > 0 ? carrinhoContext.carrinho.length : 0;
    const novoId = ultimoId + 1;
  
    // Criar novo produto
    const novoProduto = { id: novoId, nome: "Produto " + novoId };
  
    // Adicionar ao carrinho corretamente
    carrinhoContext.adicionarAoCarrinho(novoProduto);
  }

  function irParaCheckout(){
    navigate('/Sobre');
  }

  return (
    <div>
      <h1>Bem-Vindo a Nossa Loja</h1>
      <h2>Adicione Itens ao seu Carrinho</h2>
      <h2>Itens:</h2>
      {carrinhoContext.carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {carrinhoContext.carrinho.map((item) => (
            <li key={item.id}>{item.nome}</li>
          ))}
        </ul>
      )}
      <button onClick={adicionar}>Adicionar</button>
      <button onClick={irParaCheckout}>Ir para Checkout</button>
    </div>
  );
}