import "./styles.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const options = [
  {"keyword": "home", "value": "/"},
  {"keyword": "about", "value": "/about"},
  {"keyword": "phrase", "value": "/phrase"},
]

export function RouteSelection() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const value = e.target.value;
    setInputValue(value);
    
    const route = options.find(option => option.value === value);
    if (route){
      navigate(value)
    }
  }

  return (
    <header className="header">   
      <section className="header-container-section">
        <div className="header-title-icon">
          <a href="/">
            <img alt="babel-tower" src="./src/assets/babel-icon.png" width="40vw" height="45vh"></img>
            <p>Babel Tower</p>
          </a>
        </div>
        <div className="container-input">
          <input 
            className="search-input"
            type="text"
            list="routes" 
            value={inputValue} 
            onChange={handleChange}>
          </input>
            <datalist id="routes">
              {options.map(option => 
                  <option key={option.value} value={option.value}>{option.keyword}</option>)
              }
            </datalist>
        </div>
        <div className="header-profile">
          <p>Profile</p>
        </div>
      </section>   
    </header>
  )
}

