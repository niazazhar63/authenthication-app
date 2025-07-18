import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Admin/Dashboard'
import AllUsers from './pages/Admin/AllUsers'
import PrivateRoute from './Routes/PrivateRoute'

function App() {

  return (
    <Routes>
      <Route  path='/' element={<LandingPage />}/>
      <Route  path='/login' element={<LoginPage />}/>


      {/* dashboard route here  */}
      <Route
      path='dashboard'
      element={<PrivateRoute> <Dashboard /> </PrivateRoute> }
      >
      <Route index element={<AllUsers />}></Route>


      </Route>
    </Routes>
  )
}

export default App
