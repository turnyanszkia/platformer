import React, { useState } from 'react';
import './menu.css';  // Biztosítsd, hogy a CSS fájlok elérhetők legyenek
import { Link } from 'react-router-dom';

const Menu = () => {
  const [settingsMenuVisible, setSettingsMenuVisible] = useState(false);
  const [brightness, setBrightness] = useState(1);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleSettingsMenu = () => {
    setSettingsMenuVisible(!settingsMenuVisible);
  };

  const updateBrightness = (event) => {
    setBrightness(event.target.value);
  };

  const updateVolume = (event) => {
    setVolume(event.target.value);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div>
      {/* Háttérvideó */}
      <video
        id="backgroundVideo"
        autoplay
        loop
        muted
        style={{ filter: `brightness(${brightness})` }}
      >
        <source src="/kepek/hattervideo.mp4" type="video/mp4" />
        A böngésződ nem támogatja a videók lejátszását.
      </video>

      {/* Beállítások gomb */}
      <button className="settings-button" onClick={toggleSettingsMenu}>
        ⚙️ Beállítások
      </button>

      {/* Beállítások menü */}
      {settingsMenuVisible && (
        <div className="settings-menu" id="settingsMenu">
          <label>
            Fényerő:
            <input
              type="range"
              id="brightnessControl"
              min="0.5"
              max="2"
              step="0.1"
              value={brightness}
              onChange={updateBrightness}
            />
          </label>
          <label>
            Hangerő:
            <input
              type="range"
              id="volumeControl"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={updateVolume}
            />
          </label>
          <button onClick={toggleFullScreen}>
            {isFullscreen ? 'Ablakos mód' : 'Teljes képernyő'}
          </button>
        </div>
      )}

      {/* Bejelentkezési ablak */}
      <div className="content">
        <div className="login-box">
          <h2 className="text-light">Bejelentkezés</h2>
          <input type="text" placeholder="Felhasználónév" required id="LoginName" />
          <input type="password" placeholder="Jelszó" required id="Password" />
          <input
            type="button"
            value="Bejelentkezés"
            id="Bejelentkezes"
            // onClick={Login()}  -- Itt implementálni kell a Login funkciót
          />
          <span className="text-light">
            Nincs még fiókod? <Link to={"/register"}>Regisztráció</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
