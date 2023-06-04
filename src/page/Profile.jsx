import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const classBut =
    "w-[13rem] p-4 text-dark rounded-larger font-medium text-center text-4xl";
  const classMain =
    "bg-blue0 text-center rounded-3xl font-4xl mt-12 mx-auto p-8 min-w-[38rem] max-w-[75%] max-h-[62rem] aspect-[3/4]";

  const send = async function() {
    const response = await authApi.post(
      "/login",
      JSON.stringify({
        username: localStorage.getItem("username"),
        password: localStorage.getItem("password"),
      })
    );
    console.log(response);
  };
  const exsit = async () => {
    localStorage.clear();
    setTimeout(() => {
      navigate("/profile", { required: true });
    }, 1000);
  };
 const username = localStorage.getItem("username");
 const password= localStorage.getItem("password");
 const number= localStorage.getItem("number");

  return (
    <div className={classMain}>
      <div className=" text-left ">
        <p className="py-4 text-blue-700 font-mono">
          Name:
          <span className=" font-mono font-bold text-blue-950">   {username}</span>
        </p>
        <p className="py-4 text-blue-700 font-mono">
          Password:
          <span className=" font-mono font-bold text-blue-950">   {password}</span>
        </p>
        <p className="py-4 text-blue-700 font-mono">
          Phone Number:
          <span className=" font-mono font-bold text-blue-950">   {number}</span>
        </p>
      </div>
      <div className="flex gap-8 justify-around mt-[22rem]">
        <button
          onClick={send}
          className={`focus:bg-dark focus:text-blue0 hover:bg-dark hover:text-blue0  mt-8 bg-white  ${classBut}`}
        >
          Refresh
        </button>
        <button
          onClick={exsit}
          className={`focus:bg-dark focus:text-blue0 hover:bg-dark hover:text-blue0  mt-8 bg-white  ${classBut}`}
        >
          Exit
        </button>
      </div>
    </div>
  );
}
