import React from 'react'
import Hero3D from './components/Hero3D'
import Timer from './components/Timer'
import FooterNote from './components/FooterNote'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Subtle pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_top,rgba(59,130,246,0.15),transparent_60%)]"></div>

      <div className="relative">
        <Hero3D />
        <Timer />
        <FooterNote />
      </div>
    </div>
  )
}

export default App
