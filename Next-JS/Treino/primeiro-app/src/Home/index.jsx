import { useCarrinho } from "../components/CarrinhoContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const { carrinho, adicionarAoCarrinho } = useCarrinho();
  const [id, setId] = useState(1);
  const navigate = useNavigate();

  function adicionar(){
    adicionarAoCarrinho({ id: id, nome: "Produto " + id });
    setId(id+1);
  }

  function irParaCheckout(){
    navigate('/Sobre');
  }

  return (
    <div>
      <h1>Bem-Vindo a Nossa Loja</h1>
      <h2>Adicione Itens ao seu Carrinho</h2>
      <h2>Itens:</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {carrinho.map((item) => (
            <li key={item.id}>{item.nome}</li>
          ))}
        </ul>
      )}
      <button onClick={adicionar}>Adicionar</button>
      <button onClick={irParaCheckout}>Ir para Checkout</button>
    </div>
  );
}