import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/authSlice";

export default function Inpot(p) {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  return (
    <>
      <div>
        <label className="p-2 inline-block" htmlFor={p.nameInpot}>
          {p.nameInpot}{" "}
        </label>
        <br />
        <input
          type={p.type}
          name={p.nameInpot}
          id={p.nameInpot}
          value={auth[p.storeName].user}
          autoComplete="off"
          required
          onChange={(e) =>
            dispatch(actions.change(p.storeName, e.target.value))
          }
          onFocus={() => dispatch(actions.focus(p.storeName))}
          onBlur={() => dispatch(actions.focus(p.storeName))}
          className={`w-30 p-4 text-dark rounded-larger font-medium text-center text-4xl focus:bg-dark focus:text-blue0 ${
            auth[p.storeName].valid ? " green" : " none"
          }${
            auth[p.storeName].valid || !auth[p.storeName].user
              ? " none"
              : " red"
          }`}
        />
      </div>
    </>
  );
}