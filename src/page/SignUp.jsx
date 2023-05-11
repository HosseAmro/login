import { Result } from "postcss";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NAME_REGEXG = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWS_REGEXG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function SignUp() {
  const nameRef = useRef();
  const errRef = useRef();

  const [names, setname] = useState({ user: "", valid: false, focus: false });
  const [pas, setpas] = useState({ user: "", valid: false, focus: false });
  const [pas22, setpas22] = useState({ user: "", valid: false, focus: false });
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEXG.test(names.user);
    console.log(result);
    console.log(names.user);
    setname((pev) => {
      return { ...pev, valid: result };
    });
  }, [names.user]);
  useEffect(() => {
    const result2 = PWS_REGEXG.test(pas.user);
    console.log(result2);
    console.log(pas.user);
    setpas((pev) => {
      return { ...pev, valid: result2 };
    });
    const match = pas.user === pas22.user;
    setpas22((pev) => {
      return { ...pev, valid: match };
    });
  }, [pas.user, pas22.user]);

  useEffect(() => {
    setErrMsg("");
  }, [names.user, pas.user, pas22.user]);

  return (
    <main className="main signUp">
      <section>
        <p ref={errRef} className={errMsg ? "errMsg" : "hidden"}>
          Error:{errMsg}
        </p>
        ;<h1>Login</h1>
        <form>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            name="username"
            id="username"
            ref={nameRef}
            autoComplete="off"
            onChange={(e) =>
              setname((pev) => {
                return { ...pev, user: e.target.value };
              })
            }
            required
            onFocus={(e) =>
              setname((pev) => {
                return { ...pev, focus: true };
              })
            }
            onBlur={(e) =>
              setname((pev) => {
                return { ...pev, focus: false };
              })
            }
            className={`ss ${names.valid ? " green" : " none"}${
              names.valid || !names.user ? " none" : " red"
            }`}
          />
          <p>point for name</p>

          <br />

          <label htmlFor="pwd">password:</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            onChange={(e) =>
              setpas((pev) => {
                return { ...pev, user: e.target.value };
              })
            }
            required
            onFocus={(e) =>
              setpas((pev) => {
                return { ...pev, focus: true };
              })
            }
            onBlur={(e) =>
              setpas((pev) => {
                return { ...pev, focus: false };
              })
            }
            className={`ss ${pas.valid ? " green" : " none"}${
              pas.valid || !pas.user ? " none" : " red"
            }`}
          />
          <p>point for password</p>

          <br />

          <label htmlFor="mach-pws">confirm:</label>
          <input
            type="password"
            name="mach-pws"
            id="mach-pws"
            onChange={(e) =>
              setpas22((pev) => {
                return { ...pev, user: e.target.value };
              })
            }
            required
            onFocus={(e) =>
              setpas22((pev) => {
                return { ...pev, focus: true };
              })
            }
            onBlur={(e) =>
              setpas22((pev) => {
                return { ...pev, focus: false };
              })
            }
            className={`ss ${pas22.valid ? " green" : " none"}${
              pas22.valid || !pas22.user ? " none" : " red"
            }`}
          />
          <p>point for confirm</p>
          <br />
          <button>sign up</button>
        </form>
      </section>
      <Link to="/login">login</Link>
    </main>
  );
}
