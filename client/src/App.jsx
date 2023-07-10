import { useState } from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg';
import Home from './pages/home/Home';
import Profile from './pages/Profile/Profile';
import Login from './pages/AuthForm/Login';
import Register from './pages/AuthForm/Register';
import './App.css'




function App() {


  return (
    <>
       <div className='App'>
       
       <div className='blur' style={{top:'-18%',right: '0'}}></div>
       <div className='blur' style={{top: '36%', left:'-8rem'}}></div>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/profile' element={<Profile/> }/>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/login' element={  <Login/>}/>
       
      
      
       </Routes>
      
      </BrowserRouter>
      
    </div>
    </>
 
  )
}

export default App
