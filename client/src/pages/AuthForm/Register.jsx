import React from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./register.css";

function Register() {
  return (
    <div className="Auth">
      <div className="a-left">
        <div className="Webname">
          <h1>
            Connect App <BiSolidPhoneCall />
          </h1>
          <h6>Explore the ideas throughout the world</h6>
          <h6>To keep connected with us please signup</h6>
        </div>
      </div>
      <div className="a-right">
        <form className="infoForm authForm">
          <h3>Sign up</h3>

          <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
            />
          </div>

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="username"
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
            />
            <input
              type="password"
              className="infoInput"
              name="confirmpass"
              placeholder="Confirm Password"
            />
          </div>

          <div>
            <span style={{ fontSize: "20px" }}>
              Already have an account.
              <Link to="/login" style={{ color: "#008080", cursor: "pointer" }}>
                Login!
              </Link>
            </span>
          </div>
          <button className="button infoButton" type="submit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
