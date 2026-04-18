import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/home.jsx'
import About from '../pages/about/about.jsx'
import Phrase from '../pages/phrase/phrase.jsx'
import UserLogin from '../pages/users/users.jsx'

export const options = [
  { "keyword": "home", "value": "/", "description": "Teste de description"},
  { "keyword": "about", "value": "/about", "description": "Teste de description"},
  { "keyword": "phrase", "value": "/phrase", "description": "Teste de description"},
  { "keyword": "user", "value": "/user", "description": "Teste de description"},
]

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/phrase" element={<Phrase />} />
        <Route path="/user" element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  )
}
