import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import ThreadingPage from './pages/ThreadingPage.jsx'
import WaxingPage from './pages/WaxingPage.jsx'
import FacialsPage from './pages/FacialsPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import AdminPanel from './pages/AdminPanel.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/threading-dublin-ca" element={<ThreadingPage />} />
        <Route path="/waxing-dublin-ca" element={<WaxingPage />} />
        <Route path="/facials-dublin-ca" element={<FacialsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
