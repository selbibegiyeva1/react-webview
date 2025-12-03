import './App.css'

import { Routes, Route } from 'react-router-dom'

import Navbar from './component/layout/Navbar'
import Home from './pages/Home'

function App() {

  return (
    <div className='bg-[#18181B]'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
