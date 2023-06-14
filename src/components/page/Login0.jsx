import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/authSlice";
import Send from "../../services/send";
import Inpot from "../Inpot/Inpot";
import Button from "../Button/Button";


import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const names = useSelector((store) => store.auth.names.user);
  const pas = useSelector((store) => store.auth.pas.user);

  useEffect(() => {
    dispatch(actions.test0("names"));
    dispatch(actions.test0("pas"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names, pas]);

  const landleSub = async (e) => {
    e.preventDefault();
    if (!auth.names.valid || !auth.pas.valid) {
      setMsg("اصلاعات وارد شده صحیح نمی باشند");
      return;
    }
    try {
      const response = await Send({
        type: "/login",
        names: auth.names.user,
        pas: auth.pas.user,
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

      dispatch(actions.clear());
      setMsg(stamsg);
      setTimeout(() => {
        navigate(from, { required: true });
      }, 1000);
    } catch (error) {
      const stamsg = error?.message;
      setMsg(stamsg);
      dispatch(actions.clear());
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
                : "hidden"
            }
          >
            {msg}
          </p>
          <form onSubmit={landleSub}>
            <Inpot nameInpot="username" type="text" storeName="names" />
            <br />
            <Inpot nameInpot="password" type="password" storeName="pas" />
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
