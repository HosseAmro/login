import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const NAME_REGEXG = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWS_REGEXG = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NUM_REGEXG = /^(\d{4})[ ]?(\d{3})[ ]?(\d{4})$/;

export default function SignUp() {
  const { setAuth } = useAuth();
  const nameRef = useRef();
  const errRef = useRef();

  const [names, setname] = useState({ user: "", valid: false, focus: false });
  const [num, setnum] = useState({ user: "", valid: false, focus: false });
  const [pas, setpas] = useState({ user: "", valid: false, focus: false });
  const [pas22, setpas22] = useState({ user: "", valid: false, focus: false });

  const [msg, setMsg] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

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
    const result = NUM_REGEXG.test(num.user);
    setnum((pev) => {
      return { ...pev, valid: result };
    });
  }, [num.user]);

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

  const landleSub = async (e) => {
    e.preventDefault();
    if (!names.valid || !pas.valid || pas22.valid || num.valid) {
      setMsg("اصلاعات وارد شده صحیح نمی باشند");
      return;
    }
    try {
      let num1 = parseInt(num.user);
      const response = await axios.post(
        "http://185.213.167.156:8080/v1/service/ali/user/save",
        JSON.stringify({
          username: names.user,
          password: pas.user,
          cellphone: num1,
        }),
        {
          headers: {
            "Api-Key":
              "f2165063fdd61d4de33c389f5ea9aaa110097e2903c6b1b723cabe593886eebb",
          },
        }
      );

      const AuthData = JSON.parse(response.config.data);
      const token = response.data.info.token;
      setAuth({
        user: AuthData.username,
        pas: AuthData.password,
        number: AuthData.cellphone,
        token: token,
      });

      const stamsg = response?.data?.resultMessage;
      const stacode = response?.data?.resultCode;

      setname((pev) => {
        return { user: "", valid: false, focus: false };
      });
      setpas((pev) => {
        return { user: "", valid: false, focus: false };
      });
      setMsg(stamsg);
      setTimeout(() => {
        localStorage.setItem("Authuser", Auth.user);
        localStorage.setItem("Authtoken", Auth.token);
        localStorage.setItem("Authpas", Auth.pas);
        localStorage.setItem("Authnumber", Auth.number);
        
        navigate(from, { required: true });
      }, 1000);
    } catch (error) {
      const stamsg = error?.message;
      setMsg(stamsg);
      setname((pev) => {
        return { user: "", valid: false, focus: false };
      });
      setpas((pev) => {
        return { user: "", valid: false, focus: false };
      });
    }
  };

  return (
    <>
      <main className="main signUp">
        <section>
          <p ref={errRef} className={msg ? "msg" : "hidden"}>
            Error:{msg}
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
                4 to 24 characters. Must begin with a letter. Letters, numbers,
                underscores, hyphens allowed.
              </p>
            </div>
            <br />
            <div className="part-inpot">
              <label className="label-inpout" htmlFor="number">
                number:{" "}
              </label>
              <br />
              <input
                type="text"
                name="number"
                id="number"
                value={num.user}
                autoComplete="off"
                required
                onChange={(e) =>
                  setnum((pev) => {
                    return { ...pev, user: e.target.value };
                  })
                }
                onFocus={(e) =>
                  setnum((pev) => {
                    return { ...pev, focus: true };
                  })
                }
                onBlur={(e) =>
                  setnum((pev) => {
                    return { ...pev, focus: false };
                  })
                }
                className={`ss ${num.valid ? " green" : " none"}${
                  num.valid || !num.user ? " none" : " red"
                }`}
              />
              <p className={`note ${num.focus ? ` none ` : ` hidden `} `}>
                The phone number must be 10 characters long and contain only the
                numbers 0 to 9
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
            <p className="p-link">Need an Login?</p>
            <Link className="link" to="/login">
              Login
            </Link>
          </form>
        </section>
      </main>
    </>
  );
}
