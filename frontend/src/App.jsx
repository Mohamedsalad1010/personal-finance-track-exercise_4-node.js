import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard/Dashboard'
import ProtectRout from './components/Auth/ProtectedRoute'

function App() {
  

  return (
  <>
  <Routes>
    <Route path='/login' element={<LoginPage/>} />
    <Route path='signup' element={<SignUpPage/>} />

    {/* protected route */}
    <Route path='/dashboard' element={ <ProtectRout> <Dashboard/></ProtectRout>}/>

    <Route path='/' element={<Navigate to="/dashboard" replace />} />
  </Routes>
  
  </>
  )
}

export default App
