import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Profile() {
  const navigate = useNavigate();
  const { Auth, setAuth } = useAuth();
  const username = Auth?.username;
  const password = Auth?.password;
  const number = Auth?.cellphone;

  const exsit = async () => {
    localStorage.clear();
    setAuth({});
    // console.log("profile old:", Auth);
    setTimeout(() => {
      navigate("/profile", { required: true });
    }, 1000);
  };

  return (
    <div className="bg-blue0 text-center rounded-3xl font-4xl mt-12 mx-auto p-8 min-w-[38rem] max-w-[75%] max-h-[62rem] aspect-[3/4]">
      <div className=" text-left ">
        <p className="py-4 text-blue-700 font-mono">
          Name:
          <span className=" font-mono font-bold text-blue-950">
            {username}
            {/* {username} */}
          </span>
        </p>
        <p className="py-4 text-blue-700 font-mono">
          Password:
          <span className=" font-mono font-bold text-blue-950">
            {password}
            {/* {password} */}
          </span>
        </p>
        <p className="py-4 text-blue-700 font-mono">
          Phone Number:
          <span className=" font-mono font-bold text-blue-950">
            {number}
          </span>
        </p>
      </div>
      <div className="flex gap-8 justify-around mt-[22rem]">
        <button
          onClick={exsit}
          className=" focus:bg-dark focus:text-blue0 hover:bg-dark hover:text-blue0  mt-8 bg-white  w-[13rem] p-4 text-dark rounded-larger font-medium text-center text-4xl"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
