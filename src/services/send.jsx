import axios from "axios";
export default async function Send({ type, names, pas, num1 }) {
  const send = await axios.post(
    `http://185.213.167.156:8080/v1/service/ali/user${type}`,
    JSON.stringify({
      username: names,
      password: pas,
      cellphone: num1,
    }),
    {
      headers: {
        "Api-Key":
          "f2165063fdd61d4de33c389f5ea9aaa110097e2903c6b1b723cabe593886eebb",
      },
    }
  );

  return send;
}
