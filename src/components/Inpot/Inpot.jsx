export default function Inpot(p) {
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
          value={p.State.user}
          autoComplete="off"
          required
          onChange={(e) =>
            p.setState((pev) => {
              return { ...pev, user: e.target.value };
            })
          }
          onFocus={() =>
            p.setState((pev) => {
              return { ...pev, focus: true };
            })
          }
          onBlur={() =>
            p.setState((pev) => {
              return { ...pev, focus: false };
            })
          }
          className={`w-30 p-4 text-dark rounded-larger font-medium text-center text-4xl focus:bg-dark focus:text-blue0 ${
            p.State.valid ? " green" : " none"
          }${p.State.valid || !p.State.user ? " none" : " red"}`}
        />
      </div>
    </>
  );
}
