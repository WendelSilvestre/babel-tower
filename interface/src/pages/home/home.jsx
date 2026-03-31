import "./home.css"
import { Link } from "react-router-dom";

const options = [
  {"keyword": "home", "value": "/"},
  {"keyword": "about", "value": "/about"}
]

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <div id="home">
          {/* <Link to="/about">Ir para About</Link> */}
          <RouteSelection />
      </div>
    </>
  );
}

export function RouteSelection() {
  return (
    <div className="container-input">
      <input type="text" list="routes"></input>
        <datalist id="routes">
          {options.map(option => 
              <option value={option.value}>{option.keyword}</option>)
          }
        </datalist>
    </div>
  )
}
