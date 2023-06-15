import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/authSlice";

export default function Profile() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);

  const exsit = async () => {
    localStorage.clear();
    dispatch(actions.clear());
    setTimeout(() => {
      navigate("/login", { required: true });
    }, 1000);
  };

  return (
    <div className="bg-blue0 text-center rounded-3xl font-4xl mt-12 mx-auto p-8 min-w-[38rem] max-w-[75%] max-h-[62rem] aspect-[3/4]">
      <div className=" text-left ">
        <p className="py-4 text-blue-700 font-mono">
          Name:
          <span className=" font-mono font-bold text-blue-950">
            {auth.names.user}
            {/* {username} */}
          </span>
        </p>
        <p className="py-4 text-blue-700 font-mono">
          Password:
          <span className=" font-mono font-bold text-blue-950">
            {auth.pas.user}
            {/* {password} */}
          </span>
        </p>
        <p className="py-4 text-blue-700 font-mono">
          Phone Number:
          <span className=" font-mono font-bold text-blue-950">
            {auth.num.user}
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
