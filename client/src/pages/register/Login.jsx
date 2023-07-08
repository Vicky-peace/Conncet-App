import React from 'react'
import {BiSolidPhoneCall} from 'react-icons/bi';
import './login.css';


const Login = () => {
  return (
    <>
    <div className="Auth">
        <div className="a-left">
        
          <div className="Webname">
            <h1>Connect App <BiSolidPhoneCall/></h1>
            <h6>Explore the ideas throughout the world</h6>
            <h6>To keep connected with us please log in</h6>
          </div>
        </div>
        <div className='a-right'>
        <form className="infoForm authForm">
        <h3>Log In</h3>
  
  <div>
    <input
      type="text"
      placeholder="Username"
      className="infoInput"
      name="username"
    />
  </div>

  <div>
    <input
      type="password"
      className="infoInput"
      placeholder="Password"
      name="password"
    />
  </div>

  <div>
      <span style={{ fontSize: "20px" }}>
        Don't have an account ? <span style={{color: "#008080", cursor: 'pointer'}}>Sign up</span> 
      </span>
    <button className="button infoButton">Login</button>
  </div>
</form>

      
    </div>
    
      </div>
   
    </>
   
  )
}

export default Login
