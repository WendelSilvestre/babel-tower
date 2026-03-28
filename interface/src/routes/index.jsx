import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/home.jsx'
import About from '../pages/about/about.jsx'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
