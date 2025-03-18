import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/css/index.css'

import Home from './pages/Home'
import { WatchMovie, WatchTV } from './pages/Watch'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watch/movie/:id" element={<WatchMovie />} />
        <Route path="/watch/tv/:id/:season/:episode" element={<WatchTV />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)