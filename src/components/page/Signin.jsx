import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Inpot from "../Inpot/Inpot";
import Button from "../Button/Button";
import Send from "../../services/send";

const NAME_REGEXG = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const PWS_REGEXG = /^.{4,24}$/;
const NUM_REGEXG = /^[0-9]{11,13}$/;

export default function Signin() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  const [names, setname] = useState({ user: "", valid: false, focus: false });
  const [num, setnum] = useState({ user: "", valid: false, focus: false });
  const [pas, setpas] = useState({ user: "", valid: false, focus: false });
  const [pas22, setpas22] = useState({ user: "", valid: false, focus: false });
  const [msg, setMsg] = useState("");

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
    const result = PWS_REGEXG.test(pas.user);
    setpas((pev) => {
      return { ...pev, valid: result };
    });
    const match = pas.user === pas22.user;
    if (result) {
      setpas22((pev) => {
        return { ...pev, valid: match };
      });
    }
  }, [pas.user, pas22.user]);

  const landleSub = async (e) => {
    e.preventDefault();
    if (!names.valid || !pas.valid || !pas22.valid || !num.valid) {
      setMsg("اصلاعات وارد شده صحیح نمی باشند");
      return;
    }
    try {
      let num1 = parseInt(num.user);
      console.log(num1);
      const response = await Send({
        type: "/save",
        names: names.user,
        pas: pas.user,
        num1: num1,
      });
      console.log(response);
      const info = await response?.data?.info;
      const token = await response.data.info.token;
      const stamsg = await response?.data?.resultMessage;
      const AuthData = await JSON.parse(response?.config?.data);

      localStorage.setItem("info", info);
      localStorage.setItem("token", token);

      setAuth({
        username: AuthData.username,
        password: AuthData.password,
        cellphone: AuthData.cellphone,
        token: token,
      });

      setname(() => {
        return { user: "", valid: false, focus: false };
      });
      setpas(() => {
        return { user: "", valid: false, focus: false };
      });
      setnum(() => {
        return { user: "", valid: false, focus: false };
      });
      setpas22(() => {
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
      setnum(() => {
        return { user: "", valid: false, focus: false };
      });
      setpas22(() => {
        return { user: "", valid: false, focus: false };
      });
    }
  };

  return (
    <>
      <main className="bg-blue0 text-center rounded-3xl font-4xl mt-12 mx-auto p-8 min-w-[38rem] max-w-[75%] max-h-[62rem] aspect-[3/4]">
        <section>
          <p
            className={
              msg
                ? "font-black my-2 p-4 rounded-larger text-dark bg-red-600"
                : " hidden"
            }
          >
            Error:{msg}
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
              nameInpot="number"
              type="text"
              State={num}
              setState={setnum}
            />
            <br />
            <Inpot
              nameInpot="password"
              type="password"
              State={pas}
              setState={setpas}
            />
            <br />
            <Inpot
              nameInpot="Confirm password"
              type="password"
              State={pas22}
              setState={setpas22}
            />
            <br />
            <Button nameButton="Signin" />
            <br />
            <p className="my-5">Need an Login?</p>
            <Link className="hover:text-dark font-black " to="/login">
              Login
            </Link>
          </form>
        </section>
      </main>
    </>
  );
}
