import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export function RoutingProvider() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
