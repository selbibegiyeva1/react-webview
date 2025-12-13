import './App.css'

import { Routes, Route } from 'react-router-dom'

import Navbar from './component/layout/Navbar'
import Home from './pages/Home'
import Steam from './pages/Steam'
import Call from './pages/Call'

import SessionBootstrap from './component/SessionBootstrap'

function App() {

  return (
    <div className='bg-[#18181B]'>
      <SessionBootstrap />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/steam" element={<Steam />} />
        <Route path="/call" element={<Call />} />
      </Routes>
    </div>
  )
}

export default App