import axios from "axios";
const baseurl = "http://185.213.167.156:8080/v1/service/ali/user";
const token = localStorage.getItem("token");
const authApi = axios.create({
  baseURL: baseurl,
  headers: {
    "Api-Key":
      "f2165063fdd61d4de33c389f5ea9aaa110097e2903c6b1b723cabe593886eebb",
    Authorization: `${token}`,
  },
});

export default authApi;
