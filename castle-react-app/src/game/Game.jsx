import React, { useEffect, useRef, useState } from "react";
import "./game.css";

const Game = () => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const platformok = [
      { x: 50, y: 350, width: 200, height: 20 },
      { x: 300, y: 250, width: 200, height: 20 },
      { x: 550, y: 150, width: 200, height: 20 }
    ];

    const falak = [
      { x: 0, y: 0, width: 10, height: 400 },
      { x: 790, y: 0, width: 10, height: 400 },
      { x: 0, y: 0, width: 800, height: 10 },
      { x: 0, y: 390, width: 800, height: 10 }
    ];

    const doorImage = new Image();
    doorImage.src =
      "https://cdn.streamloots.com/uploads/5beeb9a487b681002fbd373e/fe0dff78-1d03-47a2-ab64-4bd9926f9a36.gif";

    const idleImage = new Image();
    idleImage.src = "/kepek/stand.gif";
    const walkImage = new Image();
    walkImage.src = "/kepek/knigth.gif";

    const karakter = {
      x: 100,
      y: 320,
      width: 40,
      height: 50,
      speed: 5,
      velY: 0,
      jumping: false,
      gravity: 0.8,
      jumpPower: -15,
      moving: false,
      facingRight: true
    };

    const keys = { right: false, left: false, up: false };

    const keyDownHandler = (e) => {
      if (e.code === "KeyA") keys.left = true;
      if (e.code === "KeyD") keys.right = true;
      if (e.code === "KeyW" && !karakter.jumping) {
        keys.up = true;
        karakter.jumping = true;
        karakter.velY = karakter.jumpPower;
      }
    };

    const keyUpHandler = (e) => {
      if (e.code === "KeyA") keys.left = false;
      if (e.code === "KeyD") keys.right = false;
      if (e.code === "KeyW") keys.up = false;
    };

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    function updateCharacter() {
      karakter.moving = false;
      if (keys.left) {
        karakter.x -= karakter.speed;
        karakter.moving = true;
        karakter.facingRight = false;
      }
      if (keys.right) {
        karakter.x += karakter.speed;
        karakter.moving = true;
        karakter.facingRight = true;
      }

      karakter.velY += karakter.gravity;
      karakter.y += karakter.velY;

      platformok.forEach((platform) => {
        if (
          karakter.x + karakter.width > platform.x &&
          karakter.x < platform.x + platform.width
        ) {
          if (
            karakter.y + karakter.height >= platform.y &&
            karakter.y + karakter.height <= platform.y + karakter.velY
          ) {
            karakter.y = platform.y - karakter.height;
            karakter.velY = 0;
            karakter.jumping = false;
          }
        }
      });

      if (karakter.y + karakter.height >= canvas.height) {
        karakter.y = canvas.height - karakter.height;
        karakter.velY = 0;
        karakter.jumping = false;
      }
    }

    function drawCharacter() {
      ctx.save();
      if (!karakter.facingRight) {
        ctx.scale(-1, 1);
        ctx.drawImage(
          karakter.moving ? walkImage : idleImage,
          -karakter.x - karakter.width,
          karakter.y,
          karakter.width,
          karakter.height
        );
      } else {
        ctx.drawImage(
          karakter.moving ? walkImage : idleImage,
          karakter.x,
          karakter.y,
          karakter.width,
          karakter.height
        );
      }
      ctx.restore();
    }

    function drawLevel() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      platformok.forEach((platform) => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.drawImage(
          doorImage,
          platform.x + platform.width / 2 - 50,
          platform.y - 100,
          100,
          100
        );
      });
      falak.forEach((fal) => {
        ctx.fillRect(fal.x, fal.y, fal.width, fal.height);
      });
      drawCharacter();
    }

    function gameLoop() {
      updateCharacter();
      drawLevel();
      requestAnimationFrame(gameLoop);
    }

    gameLoop();

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  const toggleSettingsMenu = () => {
    setSettingsVisible(!settingsVisible);
  };

  const updateVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div>
      <audio ref={audioRef} autoPlay loop>
        <source src="/kepek/hatterhang.mp3" type="audio/mpeg" />
        A böngésződ nem támogatja a hangfájlokat.
      </audio>
      <button className="settings-button" onClick={toggleSettingsMenu} aria-label="Beállítások">
        ⚙️
      </button>
      {settingsVisible && (
        <div className="settings-menu">
          <label>
            Hangerő:
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={updateVolume}
            />
          </label>
          <button onClick={toggleFullScreen}>Teljes képernyő / Ablakos mód</button>
        </div>
      )}
      <canvas ref={canvasRef} width="800" height="400"></canvas>
    </div>
  );
};

export default Game;
