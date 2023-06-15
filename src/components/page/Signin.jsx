import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/authSlice";
import { useEffect } from "react";
import Inpot from "../Inpot/Inpot";
import Button from "../Button/Button";
import Send from "../../services/send";

export default function Signin() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const from = location.state?.from?.pathname || "/profile";

  useEffect(() => {
    dispatch(actions.test0("names"));
    dispatch(actions.test0("num"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.names.user, auth.num.user]);

  useEffect(() => {
    dispatch(actions.test0("pas"));
    dispatch(actions.test1());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.pas.user, auth.pas22.user]);

  const landleSub = async (e) => {
    e.preventDefault();
    if (
      !auth.names.valid ||
      !auth.pas.valid ||
      !auth.pas22.valid ||
      !auth.num.valid
    ) {
      dispatch(actions.msg("اصلاعات وارد شده صحیح نمی باشند"));
      return;
    }
    try {
      let num1 = parseInt(auth.num.user);
      console.log(num1);
      const response = await Send({
        type: "/save",
        names: auth.names.user,
        pas: auth.pas.user,
        num1: num1,
      });
      console.log(response);
      const info = await response?.data?.info;
      const token = await response.data.info.token;
      const stamsg = await response?.data?.resultMessage;
      const AuthData = await JSON.parse(response?.config?.data);

      localStorage.setItem("info", info);
      localStorage.setItem("token", token);
      
      dispatch(actions.msg(stamsg));
      dispatch(actions.clear());
      dispatch(actions.authset(token, AuthData.username, AuthData.password));
      setTimeout(() => {
        navigate(from, { required: true });
      }, 1000);
    } catch (error) {
      const stamsg = error?.message;
      dispatch(actions.msg(stamsg));
      dispatch(actions.clear());
    }
  };

  return (
    <>
      <main className="bg-blue0 text-center rounded-3xl font-4xl mt-12 mx-auto p-8 min-w-[38rem] max-w-[75%] max-h-[62rem] aspect-[3/4]">
        <section>
          <p
            className={
              auth.msg
                ? "font-black my-2 p-4 rounded-larger text-dark bg-red-600"
                : " hidden"
            }
          >
            Error:{auth.msg}
          </p>
          <form onSubmit={landleSub}>
            <Inpot nameInpot="username" type="text" storeName="names" />
            <br />
            <Inpot nameInpot="number" type="text" storeName="num" />
            <br />
            <Inpot nameInpot="password" type="password" storeName="pas" />
            <br />
            <Inpot nameInpot="confirm" type="password" storeName="pas22" />
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
