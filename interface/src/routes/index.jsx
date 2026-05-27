import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from '../pages/home/home.jsx'
import Copa from '../pages/copa/copa.jsx'
import Manga from '@/pages/manga/manga.jsx'
import About from '../pages/about/about.jsx'
import Phrase from '../pages/phrase/phrase.jsx'
import UserLogin from '../pages/users/users.jsx'
import Profile from '@/pages/profile/profile.jsx'
import Strikethrough from '../pages/utilities/strikethrough.jsx'
import FiapCalculate from '../pages/utilities/calculate.jsx'
import { Footer } from '../components/footer.jsx'

export const options = [
  { "keyword": "home", "value": "/", "description": "Tela inicial"},
  { "keyword": "user", "value": "/user", "description": "Área do usuário"},
  { "keyword": "phrase", "value": "/phrase", "description": "Pequeno jogo de frases"},
  { "keyword": "about", "value": "/about", "description": "Informações sobre mim"},
  { "keyword": "string", "value": "/strike", "description": "Formatação de texto: tachados"},
  { "keyword": "manga", "value": "/manga", "description": "Controle de volumes de manga"},
  { "keyword": "profile", "value": "/profile", "description": "Página do usuário"},
  { "keyword": "copa", "value": "/copa", "description": "Marcação de figurinhas da copa"},
  { "keyword": "fiap", "value": "/fiap-calculator", "description": "Calculadora da Fiap"},
]

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/phrase" element={<Phrase />} />
            <Route path="/user" element={<UserLogin />} />
            <Route path="/strike" element={<Strikethrough />} />
            <Route path="/manga" element={<Manga />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/copa" element={<Copa />} />
            <Route path="/fiap-calculator" element={<FiapCalculate />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
