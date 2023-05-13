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
    setname((pev) => {
      return { ...pev, valid: result };
    });
  }, [names.user]);

  useEffect(() => {
    const result2 = PWS_REGEXG.test(pas.user);
    setpas((pev) => {
      return { ...pev, valid: result2 };
    });
    const match = pas.user === pas22.user;
    if (result2) {
      setpas22((pev) => {
        return { ...pev, valid: match };
      });
    }
  }, [pas.user, pas22.user]);

  useEffect(() => {
    setErrMsg("");
  }, [names.user, pas.user, pas22.user]);

  const landleSub = async (e) => {
    e.preventDefault();
    setSuccess(true);
    console.log(success);
  };

  return (
    <>
      <main className="main signUp">
        {success ? (
          <section>
            <h1>Account created</h1>
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
            <h1>Sign Up</h1>
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
                <p className={`note ${names.focus ? ` none ` : ` hidden `} `}>
                  4 to 24 characters. Must begin with a letter. Letters,
                  numbers, underscores, hyphens allowed.
                </p>
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
                <p className={`note ${pas.focus ? ` none ` : ` hidden `} `}>
                  8 to 24 characters. <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character. <br />
                  Allowed special characters: ! @ # $ %
                </p>
              </div>
              <br />
              <div className="part-inpot">
                <label className="label-inpout" htmlFor="mach-pws">
                  confirm:{" "}
                </label>
                <br />
                <input
                  type="password"
                  name="mach-pws"
                  id="mach-pws"
                  autoComplete="off"
                  required
                  value={pas22.user}
                  onChange={(e) =>
                    setpas22((pev) => {
                      return { ...pev, user: e.target.value };
                    })
                  }
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
                  className={`${pas22.valid ? " green" : " none"}${
                    pas22.valid || !pas22.user ? " none" : " red"
                  }`}
                />
                <p className={`note ${pas22.focus ? ` none ` : ` hidden `} `}>
                  Must match the first password input field.
                </p>
              </div>
              <br />
              <button className="sub">sign up</button>
              <br />
              <p className="p-link">Need an Account?</p>
              <Link className="link" to="/login">
                Login
              </Link>
            </form>
          </section>
        )}
      </main>
    </>
  );
}
