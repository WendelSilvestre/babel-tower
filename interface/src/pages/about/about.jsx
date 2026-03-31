import "./about.css"
import { RouteSelection } from "../../components/searchHeader";

export default function About() {
  return (
    <>
      <RouteSelection />
      <div>
        <h1>Sobre</h1>
        <p>Essa é a página About em React</p>
      </div>
    </>
  );
}