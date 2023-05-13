import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NAME_REGEXG = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWS_REGEXG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function login() {
  const nameRef = useRef();
  const errRef = useRef();

  const [names, setname] = useState({ user: "", valid: false, focus: false });
  const [pas, setpas] = useState({ user: "", valid: false, focus: false });

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = NAME_REGEXG.test(names.user);
    setname((pev) => {
      return { ...pev, valid: result };
    });
  }, [names.user]);

  useEffect(() => {
    const result2 = PWS_REGEXG.test(pas.user);
    setpas((pev) => {
      return { ...pev, valid: result2 };
    });
  }, [pas.user]);

  useEffect(() => {
    setErrMsg("");
  }, [names.user, pas.user]);

  const landleSub = async (e) => {
    e.preventDefault();
    setSuccess(true);
    console.log(success);
  };

  return (
    <>
      <main className="main">
        {success ? (
          <section>
            <h1>you are logged in!</h1>
            <br />
            <p>
              go to{" "}
              <Link className="link" to="/">
                #home
              </Link>
            </p>
          </section>
        ) : (
          <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "hidden"}>
              Error:{errMsg}
            </p>
            <h1>Login</h1>
            <form onSubmit={landleSub}>
              <div className="part-inpot">
                <label className="label-inpout" htmlFor="username">
                  username:{" "}
                </label>
                <br />
                <input
                  type="text"
                  name="username"
                  id="username"
                  ref={nameRef}
                  value={names.user}
                  autoComplete="off"
                  required
                  onChange={(e) =>
                    setname((pev) => {
                      return { ...pev, user: e.target.value };
                    })
                  }
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
              </div>
              <br />
              <div className="part-inpot">
                <label className="label-inpout" htmlFor="pwd">
                  password:{" "}
                </label>
                <br />
                <input
                  type="password"
                  name="pwd"
                  id="pwd"
                  autoComplete="off"
                  required
                  value={pas.user}
                  onChange={(e) =>
                    setpas((pev) => {
                      return { ...pev, user: e.target.value };
                    })
                  }
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
              </div>
              <br />
              <button className="sub">sign up</button>
              <br />
              <p className="p-link">Need an Account?</p>
              <Link className="link" to="/signup">
                Sign Up
              </Link>
            </form>
          </section>
        )}
      </main>
    </>
  );
}
