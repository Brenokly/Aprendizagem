import { Link } from "react-router-dom";

export default function Erro() {
  return (
    <div>
      <h1>Erro 404</h1> <br/>
      <h2>Desculpe, a página que você está procurando não existe.</h2> <br/> <br/>

      <span>Talvez você esteja procurando alguma dessas páginas abaixo</span> <br/>
      <Link to="/">Home</Link><br/>
      <Link to="/catalogo">Catalogo</Link><br/>
    </div>
  );
}