import "./about.css"
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1>Sobre</h1>
      <p>Essa é a página About em React</p>
      <Link to="/">Ir para Home</Link>
    </div>
  );
}