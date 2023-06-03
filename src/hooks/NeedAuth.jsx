import {  Navigate, Outlet, useLocation } from "react-router-dom";

export default function NeedAuth() {
  const username = localStorage.getItem("username")
  const location = useLocation();
  return username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
