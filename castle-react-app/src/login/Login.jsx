import React, { useState } from 'react';
import axios from 'axios';
import sha256 from 'js-sha256'; // Ha nem lenne telepítve, telepítsd: npm install js-sha256

const Login = () => {
  // Állapotok létrehozása
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');

  // Bejelentkezési logika
  const handleLogin = () => {

        const loginUrl = "http://localhost:5004/api/Login";
        const body = {
          loginName: loginName,
          tmpHash: password,
        };
        console.log(body);

        // Bejelentkezési kérés
        axios.post(loginUrl, body)
          .then((response) => {
            if (response.status === 200) {
              let user = response.data;
              console.log(user);
              
              // Token és felhasználónév mentése sessionStorage-be
              sessionStorage.setItem("token", user.token);
              sessionStorage.setItem("loginName", loginName);
              alert("Sikeres bejelentkezés!");
              
              // Átirányítás a játék oldalra
              window.location.href = "/game";
            } else {
              alert("Hiba történt a bejelentkezéskor!");
            }
          })
          .catch((error) => {
            alert("Hiba történt a bejelentkezés során: " + error);
          }); 
  };

  return (
    <div className="content">
      <div className="login-box">
        <h2 className="text-light">Bejelentkezés</h2>
        
        <input
          type="text"
          placeholder="Felhasználónév"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)} // Állapot frissítése
        />
        
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Állapot frissítése
        />
        
        <button type="button" onClick={handleLogin}>
          Bejelentkezés
        </button>
        
        <span className="text-light">
          Nincs még fiókod? <a href="register.html">Regisztrálj</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
