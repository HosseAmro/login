import { Result } from "postcss";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NAME_REGEXG = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWS_REGEXG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;

export default function SignUp() {
  const nameRef = useRef();
  const errRef = useRef();

  const [name1, setName1] = useState("");
 const [nameValid, setNameValid] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [pas, setPas] = useState("");
  const [pasValid, setPasValid] = useState(false);
  const [pasFocus, setPasFocus] = useState(false);

  const [pas2, setPas2] = useState("");
  const [pas2Valid, setPas2Valid] = useState(false);
  const [pas2Focus, setPas2Focus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEXG.test(name1);
    console.log(result);
    console.log(name1);
    setNameValid(Result);
  }, );
  useEffect(() => {
    const Result2 = NAME_REGEXG.test(pas);
    console.log(Result2);
    console.log(pas);
    setPasValid(Result2);
    const match = pas === pas2;
    setPas2Valid(match);
  }, );

  useEffect(() => {
    setErrMsg("");
  }, [name1, pas, pas2]);

  return (
    <main className="main signUp">
      <section>
        <p ref={errRef} className={errMsg ? "errMsg" : "hidden"}>
          Error:{errMsg}
        </p>
        <h1>Login</h1>
        <form>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            name="username"
            id="username"
            ref={nameRef}
            autoComplete="off"
            onChange={(e) => setName1(e.target.value)}
            required
            onFocus={(e) => setNameFocus(true)}
            onBlur={(e) => setNameFocus(false)}
            className={`ss ${nameValid ? ` green ` : ` none `}${
              nameValid || !name ? ` none ` : ` red `
            }`}
          />
          <p>point for name</p>
          <br />
          <label htmlFor="pwd">password:</label>
          <input type="password" name="pwd" id="pwd" />
          <p>point for password</p>
          <br />
          <label htmlFor="mach-pws">confirm:</label>
          <input type="password" name="mach-pws" id="mach-pws" />
          <p>point for confirm</p>
          <br />
          {/* <button>sign up</button> */}
        </form>
      </section>
      <Link to="/login">login</Link>
    </main>
  );
}
