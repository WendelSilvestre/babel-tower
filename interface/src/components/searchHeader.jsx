import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Input } from "@/components/ui/input";
import { options } from "@/routes";


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
    <header className="bg-white/5 backdrop-blur-md border-b border-white/10">
      <section className="grid grid-cols-3 items-center w-full px-8 py-3">
        <div className="justify-self-start">
          <a className="flex flex-row items-center gap-2 no-underline hover:opacity-80 transition" href="/">
            <img alt="babel-tower" src="/assets/babel-icon.png" width="36" height="40" />
            <p className="text-orange-400 font-semibold tracking-tight text-lg">Babel Tower</p>
          </a>
        </div>
        <div className="justify-self-center w-full max-w-sm relative">
          <MagnifyingGlassIcon aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
          <Input
            className="w-full pl-9 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-indigo-400"
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
        <div className="justify-self-end">
          {localStorage.getItem("sessionId") ? (
            <a
              className="flex flex-row items-center gap-2 px-3 py-1.5 rounded-lg text-white no-underline hover:bg-white/10 transition"
              href="/profile"
            >
              <UserCircleIcon aria-hidden="true" className="size-5 text-gray-200" />
              <span className="text-sm font-medium">Olá, {localStorage.getItem("userName")?.split(" ")[0] || "usuário"}</span>
            </a>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <a
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-white no-underline hover:bg-white/10 transition"
                href="/user"
              >
                Entrar
              </a>
              <a
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-white no-underline bg-orange-500 hover:bg-orange-400 transition"
                href="/user?view=signup"
              >
                Criar conta
              </a>
            </div>
          )}
        </div>
      </section>
    </header>
  )
}
