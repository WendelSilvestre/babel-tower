import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

const options = [
  { "keyword": "home", "value": "/" },
  { "keyword": "about", "value": "/about" },
  { "keyword": "phrase", "value": "/phrase" },
]

export function RouteSelection() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const value = e.target.value;
    setInputValue(value);

    const route = options.find(option => option.value === value);
    if (route) {
      navigate(value)
    }
  }

  return (
    <header className="flex my-4 mx-12">
      <section className="flex flex-row items-center justify-between w-full">
        <div>
          <a className="flex flex-row no-underline items-center" href="/">
            <img alt="babel-tower" src="./src/assets/babel-icon.png" width="40" height="45" />
            <p className="text-orange-400">Babel Tower</p>
          </a>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <Input
            className="w-[15vw] box-border"
            placeholder="Pesquisar"
            type="text"
            list="routes"
            value={inputValue}
            onChange={handleChange}
          />
          <datalist id="routes">
            {options.map(option =>
              <option key={option.value} value={option.value}>{option.keyword}</option>
            )}
          </datalist>
        </div>
        <div>
          <p className="text-white">Profile</p>
        </div>
      </section>
    </header>
  )
}
