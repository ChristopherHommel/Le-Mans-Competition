import React from 'react';
import Register from './authentication/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserProfile from './authentication/UserProfile'
import Login from './authentication/Login'
import PrivateRoute from './authentication/PrivateRoute';
import ForgotPassword from './authentication/ForgotPassword'
import UpdateProfile from './authentication/UpdateProfile'
import NavBar from './navigation_bar'
import Home from './home'
import About from './about'
import Competition from './competition'
import Download from './download'
import Leaderboard from './leaderboard'
import Verification from './verification'
import Support from './support'
import Footer from './footer'
import { useAuth } from '../contexts/AuthContexts';


function App() {
  const { isAuth } = useAuth()
  console.log(isAuth)
  return (
    <div className='h-100 w-100'>
      <Router>
        <NavBar />
        <div className='h-100 w-100'>
          <Routes>
            <Route path='/user-profile' element={<PrivateRoute component={UserProfile} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/update-profile' element={<PrivateRoute component={UpdateProfile} />} />
          </Routes>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/competition' element={<Competition />} />
            <Route path='/download' element={<Download />} />
            <Route path='/support' element={<Support />} />
            <Route path='/verification' element={<Verification />} />
            <Route path='/leaderboard' element={<Leaderboard />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>

  )
}


export default App;
