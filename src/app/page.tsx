"use client"

import Image from 'next/image';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Logo from "../../public/logo.png";
import cleanLogin from "../../public/cleanLogin.png";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="logo">
        <Image src={Logo} alt="logo" />
      </div>

      <div className="bigBox">
        <div className="templeftBox">
          <Image src={cleanLogin} alt="cleanLogin" className='cleanLogin' />
        </div>
        <div className="temprightBox">
          <h1>Hello Again</h1>
          <p>Welcome Back, Keep The World Clean!</p>
          <div>
            <input type="text" placeholder='Enter username' />
          </div>
          <div className="password-container">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder='Password' 
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className = "login-button">Sign In</button>
        </div>
      </div>
    </>
  );
}