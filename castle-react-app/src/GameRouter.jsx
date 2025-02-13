import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./menu/Menu";
import Game from "./game/Game";
import Register from "./register/Register";
import Login from "./login/Login";
import Ranglista from "./ranglista/Ranglista";

function PageRouter() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/game" element={<Game />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/ranklist" element={<Ranglista />} />
      </Routes>
    </BrowserRouter>)
}

export default PageRouter;