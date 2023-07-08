import { useState } from 'react';
import viteLogo from '/vite.svg';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Register from './pages/register/Register';
import Login from './pages/register/Login';
import './App.css'



function App() {


  return (
    <div className='App'>
       <div className='blur' style={{top:'-18%',right: '0'}}></div>
       <div className='blur' style={{top: '36%', left:'-8rem'}}></div>
       {/* <Home/> */}
       {/* <Profile/> */}
       {/* <Register/> */}
       <Login/>
    </div>
  )
}

export default App
