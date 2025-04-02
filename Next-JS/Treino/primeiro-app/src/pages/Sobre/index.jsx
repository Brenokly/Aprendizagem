import { useCarrinho } from "../../components/CarrinhoContext";

export default function Sobre() {
  const carrinhoContext = useCarrinho();

  return (
    <div>
      <h1>Checkout</h1>
      {carrinhoContext.carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {carrinhoContext.carrinho.map((item) => (
            <li key={item.id}>{item.nome}</li>
          ))}
        </ul>
      )}
    </div>
  );
}