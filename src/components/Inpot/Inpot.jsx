import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/authSlice";
import { useEffect } from "react";

export default function Inpot(p) {
  const dispatch = useDispatch();
  const pasUser = useSelector((store) => store.auth.pas.user);
  const user = useSelector((store) => store.auth[p.storeName].user);
  const valid = useSelector((store) => store.auth[p.storeName].valid);

  let reg = undefined;
  if (p.storeName === "pas") {
    reg = /^.{4,24}$/;
  } else if (p.storeName === "pas22") {
    reg = /^.{4,24}$/;
  } else if (p.storeName === "num") {
    reg = /^[0-9]{11,13}$/;
  } else {
    reg = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
  }

  useEffect(() => {
    if (p.storeName === "pas22") {
      const reslut = reg.test(pasUser);
      const mach = pasUser === user;
      if (!mach) return;
      dispatch(actions.valid(p.storeName, reslut));
      return;
    }
    const reslut = reg.test(user);
    dispatch(actions.valid(p.storeName, reslut));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
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
          value={user}
          autoComplete="off"
          required
          onChange={(e) =>
            dispatch(actions.change(p.storeName, e.target.value))
          }
          onFocus={() => dispatch(actions.focus(p.storeName))}
          onBlur={() => dispatch(actions.focus(p.storeName))}
          className={`w-30 p-4 text-dark rounded-larger font-medium text-center text-4xl focus:bg-dark focus:text-blue0 ${
            valid ? " green" : " none"
          }${valid || !user ? " none" : " red"}`}
        />
      </div>
    </>
  );
}
