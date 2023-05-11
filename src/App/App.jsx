import React from "react";

import Navbar from "../page/Navbar";
import Home from "../page/Home";
import Profile from "../page/Profile";
import SignUp from "../page/SignUp";
import Login0 from "../page/Login0";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path ="/"  element={<Home/>}/>
      <Route path ="/profile"  element={<Profile/>}/>
      <Route path ="/signup"  element={<SignUp/>}/>
      <Route path ="/signup"  element={<SignUp/>}/>
      <Route path ="/login"  element={<Login0/>}/>
      </Routes>
    </>
  );
}

export default App;
