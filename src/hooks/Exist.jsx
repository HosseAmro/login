import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Exist() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  return token ? (
    <Navigate to="/profile" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
