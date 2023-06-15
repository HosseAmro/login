import { Routes, Route } from "react-router-dom";
import { actions } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Navbar from "../components/page/Navbar";
import Home from "../components/page/Home";
import Profile from "../components/page/Profile";
import Signin from "../components/page/Signin";
import Login0 from "../components/page/Login0";
import Need from "../hooks/Need";
import Exist from "../hooks/Exist";

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.token(token));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Route path="/Signin" element={<Signin />} />
          <Route path="/login" element={<Login0 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
