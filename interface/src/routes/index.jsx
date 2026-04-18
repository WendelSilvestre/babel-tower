import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/home.jsx'
import About from '../pages/about/about.jsx'
import Phrase from '../pages/phrase/phrase.jsx'
import UserLogin from '../pages/users/users.jsx'
import Strikethrough from '../pages/utilities/strikethrough.jsx'

export const options = [
  { "keyword": "home", "value": "/", "description": "Tela inicial"},
  { "keyword": "user", "value": "/user", "description": "Área do usuário"},
  { "keyword": "phrase", "value": "/phrase", "description": "Pequeno jogo de frases"},
  { "keyword": "about", "value": "/about", "description": "Informações sobre mim"},
  { "keyword": "string", "value": "/strike", "description": "Formatação de texto: tachados"},
]

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/phrase" element={<Phrase />} />
        <Route path="/user" element={<UserLogin />} />
        <Route path="/strike" element={<Strikethrough />} />
      </Routes>
    </BrowserRouter>
  )
}
