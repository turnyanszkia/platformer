import React, { useState } from 'react';
import axios from 'axios';
import './register.css';  // CSS fájl importálása

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('default.jpg');

  const handleRegister = () => {
    // Adatok összeállítása
    const data = {
      LoginNev: userName,
      Hash: password, // Titkosítást alkalmazz a jelszón, ha szükséges
      Salt: 'asd', // A só értékét itt is dinamikusan generálhatod, ha szükséges
      Name: fullName,
      PermissionId: 2,
      Active: true,
      Email: email,
      ProfilePicturePath: profilePic,
    };

    // Axios kérés a regisztrációhoz
    axios
      .post('http://localhost:5000/api/Registry', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        alert('Sikeres regisztráció');
        window.location.href = 'menu.html'; // Navigálás a bejelentkezési oldalra
      })
      .catch((error) => {
        console.error('Regisztrációs hiba:', error);
      });
  };

  return (
    <div className="content">
      <div className="login-box">
        <h1 className="text-light">Regisztráció</h1>
        <input
          type="text"
          placeholder="Felhasználónév"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teljes név"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={handleRegister}>
          Regisztráció
        </button>
        <span className="text-light">
          Már van fiókod? <a href="menu.html">Bejelentkezés</a>
        </span>
      </div>
    </div>
  );
};

export default Register;
