import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Dashboard from './pages/Dashboard/Dashboard'
import ProtectRout from './components/Auth/ProtectedRoute'
import PublicRoute  from './components/Auth/PublicRoute'
function App() {
  

  return (
  <>
  <Routes>
    <Route path='/login' element={ <PublicRoute><LoginPage/></PublicRoute>} />
    <Route path='signup' element={ <PublicRoute><SignUpPage/></PublicRoute>} />

    {/* protected route */}
    <Route path='/dashboard' element={ <ProtectRout> <Dashboard/></ProtectRout>}/>

    <Route path='/' element={<Navigate to="/login" replace />} />
  </Routes>
  
  </>
  )
}

export default App
