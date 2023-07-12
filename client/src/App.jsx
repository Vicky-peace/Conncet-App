import { useState } from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import {useSelector} from 'react-redux';
import viteLogo from '/vite.svg';
import Home from './pages/home/Home';
import Profile from './pages/Profile/Profile';
import Login from './pages/AuthForm/Login';
import Register from './pages/AuthForm/Register';
import './App.css'




function App() {
const user = useSelector((state) =>
 state.user.data);
 const isLoggedIn = user !==null; //Check if user is logged in

  return (
    <>
       <div className='App'>
       
       <div className='blur' style={{top:'-18%',right: '0'}}></div>
       <div className='blur' style={{top: '36%', left:'-8rem'}}></div>
       <BrowserRouter>
       <Routes>
        <Route path='/' element={isLoggedIn ? <Home/> :  <Navigate to='/login' />}/>
        <Route path='/profile' element={isLoggedIn ? <Profile/> :  <Navigate to='/login' />}/>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/login' element={  <Login/>}/>
       
      
      
       </Routes>
      
      </BrowserRouter>
      
    </div>
    </>
 
  )
}

export default App
