"use client"

import Image from 'next/image';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Logo from "../../public/logo.png";
import cleanLogin from "../../public/cleanLogin.png";
import { validateUserCredentials } from './utils/auth';

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setError('');
    
    if (!username || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    const admin = await validateUserCredentials(username, password);
    
    if (admin) {
      // Connexion réussie
      console.log('Admin connecté:', admin);
      // Redirection ou gestion d'état global
      alert(`Bienvenue ${admin.prenom} ${admin.nom}!`);
    } else {
      setError('Identifiants incorrects ou compte inactif');
    }
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
          <h1>Bonjour à Nouveau</h1>
          <p>Bienvenue, Gardons le Monde Propre!</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <div>
            <input 
              type="text" 
              placeholder='Enter username' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="password-container">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder='Password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="login-button" onClick={handleLogin}>
            Connecter
          </button>
        </div>
      </div>
    </>
  );
}