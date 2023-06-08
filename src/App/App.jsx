import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/page/Navbar";
import Home from "../components/page/Home";
import Profile from "../components/page/Profile";
import Signing from "../components/page/Signing";
import Login0 from "../components/page/Login0";
import Need from "../hooks/Need";
import Exist from "../hooks/Exist";
import useAuth from "../hooks/useAuth";

function App() {
  const { Auth, setAuth } = useAuth();
  const token = localStorage.getItem("token");
  const info = localStorage.getItem("info");
  console.log("App new:", Auth);
  useEffect(() => {
    setAuth({
      token: token,
      info: info,
    });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Need />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<Exist />}>
          <Route path="/Signing" element={<Signing />} />
          <Route path="/login" element={<Login0 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
