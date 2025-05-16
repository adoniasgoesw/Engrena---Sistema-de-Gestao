import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserProfile  from "../pages/UserProfile";

// importe outras páginas aqui

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
