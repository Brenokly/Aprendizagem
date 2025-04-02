import { useParams } from "react-router-dom";

export default function Produto() {
  const { id } = useParams();

  return (
    <div>
      <h1>Produtos</h1>
      <p>Produto selecionado: {id}</p>
    </div>
  );
}