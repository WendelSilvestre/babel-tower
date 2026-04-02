import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/home.jsx'
import About from '../pages/about/about.jsx'
import Phrase from '../pages/phrase/phrase.jsx'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/phrase" element={<Phrase />} />
      </Routes>
    </BrowserRouter>
  )
}
