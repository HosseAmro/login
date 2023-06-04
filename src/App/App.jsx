import Navbar from "../page/Navbar";
import Home from "../page/Home";
import Profile from "../page/Profile";
import Signing from "../page/Signing";
import Login0 from "../page/Login0";
import Need from "../hooks/Need";
import Exist from "../hooks/Exist";
import { Routes, Route } from "react-router-dom";

function App() {
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
