import React from "react";
import Game from "./game/Game";
import Login from "./login/Login";
import Ranglista from "./ranglista/Ranglista";
import Menu from "./menu/Menu";
import Register from "./register/Register";

function App() {
  return (
    <div className="App">
      <Game />
      <Menu />
      <Register />
      <Login />
      <Ranglista />
    </div>
  );
}

export default App;
