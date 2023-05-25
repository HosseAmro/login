import useAuth from "./useAuth";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

export default function NeedAuth() {
  const { Auth } = useAuth();
  const location = useLocation();
  return Auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
