import "./home.css"
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
        <h1>Home</h1>
        <Link to="/about">Ir para About</Link>
        <Input />
    </div>
  );
}

export function Input() {
  return (
    <div className="container">
      <p>Teste</p>
      <input type="text" className="input" placeholder="O que procura?"></input>
    </div>
  )
}
