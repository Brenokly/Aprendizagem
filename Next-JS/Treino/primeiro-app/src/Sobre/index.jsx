import { useCarrinho } from "../components/CarrinhoContext";

export default function Sobre() {
  const { carrinho } = useCarrinho(); // Pegando os itens do carrinho global

  return (
    <div>
      <h1>Checkout</h1>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {carrinho.map((item) => (
            <li key={item.id}>{item.nome}</li>
          ))}
        </ul>
      )}
    </div>
  );
}