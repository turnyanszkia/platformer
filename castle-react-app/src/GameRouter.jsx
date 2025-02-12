import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./menu/Menu";

function PageRouter() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
      </Routes>
    </BrowserRouter>)
}

export default PageRouter;