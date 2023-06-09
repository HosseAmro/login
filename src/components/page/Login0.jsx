import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Inpot from "../Inpot/Inpot";
import Button from "../Button/Button";
import Send from "../../services/send";

const NAME_REGEXG = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const PWS_REGEXG = /^.{4,24}$/;

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  const [names, setname] = useState({ user: "", valid: false, focus: false });
  const [pas, setpas] = useState({ user: "", valid: false, focus: false });
  const [msg, setMsg] = useState("");
  const errRef = useRef();

  useEffect(() => {
    const result = NAME_REGEXG.test(names.user);
    setname((pev) => {
      return { ...pev, valid: result };
    });
  }, [names.user]);

  useEffect(() => {
    const result = PWS_REGEXG.test(pas.user);
    setpas((pev) => {
      return { ...pev, valid: result };
    });
  }, [pas.user]);

  const landleSub = async (e) => {
    e.preventDefault();
    if (!names.valid || !pas.valid) {
      setMsg("اصلاعات وارد شده صحیح نمی باشند");
      return;
    }
    try {
      const response = await Send({
        type: "/login",
        names: names.user,
        pas: pas.user,
      });
      const info = await response?.data?.info;
      const token = await response?.data?.info?.token;
      const stamsg = await response?.data?.resultMessage;
      const AuthData = await JSON.parse(response?.config?.data);

      localStorage.setItem("info", info);
      localStorage.setItem("token", token);

      await setAuth({
        username: AuthData.username,
        password: AuthData.password,
        token: token,
      });
      setname(() => {
        return { user: "", valid: false, focus: false };
      });
      setpas(() => {
        return { user: "", valid: false, focus: false };
      });

      setMsg(stamsg);

      setTimeout(() => {
        navigate(from, { required: true });
      }, 1000);
    } catch (error) {
      const stamsg = error?.message;
      setMsg(stamsg);
      setname(() => {
        return { user: "", valid: false, focus: false };
      });
      setpas(() => {
        return { user: "", valid: false, focus: false };
      });
    }
  };

  return (
    <>
      <main className="bg-blue0 text-center rounded-3xl font-4xl mt-12 mx-auto p-8 min-w-[38rem] max-w-[75%] max-h-[62rem] aspect-[3/4]">
        <section>
          <p
            ref={errRef}
            className={
              msg
                ? "font-black my-2 p-4 rounded-larger text-dark bg-red-600"
                : "hidden"
            }
          >
            {msg}
          </p>
          <form onSubmit={landleSub}>
            <Inpot
              nameInpot="username"
              type="text"
              State={names}
              setState={setname}
            />
            <br />
            <Inpot
              nameInpot="password"
              type="password"
              State={pas}
              setState={setpas}
            />
            <br />
            <Button nameButton="Login" />
            <br />
            <p className="my-5">Need an Account?</p>
            <Link className="hover:text-dark font-black" to="/Signin">
              Signin
            </Link>
          </form>
        </section>
      </main>
    </>
  );
}
