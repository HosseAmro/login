import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Exist() {
  const username = localStorage.getItem("username");
  const location = useLocation();
  return username ? (
    <Navigate to="/profile" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
