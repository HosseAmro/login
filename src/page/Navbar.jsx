import { Link } from "react-router-dom";
import "../index.css";
export default function Navbar() {
  return (
    <nav className=" min-w-[38rem] max-w-[75%] mt-12 mx-auto  rounded-3xl bg-blue0 h-[7rem]">
      <ul className=" flex min-w-[1rem] w-full p-5 text-3xl gap-5 justify-center ali ">
        <li>
          <Link
            className=" hover:text-blue0 hover:bg-dark text-dark rounded-3xl block px-4 py-2"
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className=" hover:text-blue0 hover:bg-dark text-dark rounded-3xl block px-4 py-2"
            to="/profile"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            className=" hover:text-blue0 hover:bg-dark text-dark rounded-3xl block px-4 py-2"
            to="/Signing"
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            className=" hover:text-blue0 hover:bg-dark text-dark rounded-3xl block px-4 py-2"
            to="/login"
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
