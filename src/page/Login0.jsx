import React, { useEffect, useRef, useState } from "react";









export default function login() {

  const nameRef = useRef();
  const errRef = useRef();

  const [names, setname] = useState({ user: "", valid: false, focus: false });
  const [pas, setpas] = useState({ user: "", valid: false, focus: false });
  






  return (
    <div>Login</div>
  )
}
