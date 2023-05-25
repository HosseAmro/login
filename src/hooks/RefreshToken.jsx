import useAuth from "./useAuth";
import axios from "axios";
export default function refreshToken() {
  const { Auth, setAuth } = useAuth();

  const refresh = async () => {
    const response11 = await axios.post(
      "http://185.213.167.156:8080/v1/service/ali/user/login",

      JSON.stringify({
        username: Auth.user,
        password: Auth.pas,
      }),
      {
        headers: {
          "Api-Key":
            "f2165063fdd61d4de33c389f5ea9aaa110097e2903c6b1b723cabe593886eebb",
        },
      }
    );
    setAuth((old) => {
      console.log(old);
      console.log(response11.data.info.token);
      return { ...old, token: response11.data.info.token };
    });
  };

  return refresh;
}
