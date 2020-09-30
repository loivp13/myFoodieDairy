import { isAuth, logout } from "../helpers/auth";
import Link from "next/link";

const Navbar = () => (
  <ul className="Navbar">
    <li className="Navbar-home">
      <Link href="/">
        <a className=" " href="">
          Home
        </a>
      </Link>
    </li>
    <li className="">
      {process.browser && !isAuth() && (
        <React.Fragment>
          <Link href="/login">
            <a className=" " href="/login">
              Login
            </a>
          </Link>
          {/* <li className=" ">
            <Link href="/register">
            <a className=" " href="">
            Register
            </a>
            </Link>
          </li> */}
        </React.Fragment>
      )}
    </li>
    <li className="nav-item ml-auto">
      {process.browser && isAuth() && isAuth().role === "admin" && (
        <Link href="/admin">
          <a href="" className=" ">
            Admin
          </a>
        </Link>
      )}
    </li>
    <li className="">
      {isAuth() && isAuth().role === "subscriber" && (
        <Link href="/user">
          <a href="" className="">
            Account
          </a>
        </Link>
      )}
    </li>
    <li className="">
      {isAuth() && isAuth().role === "subscriber" && (
        <Link href="/user/lists">
          <a href="" className="">
            Lists
          </a>
        </Link>
      )}
    </li>
    <li className=" ">
      {isAuth() && (
        <a onClick={logout} className=" " href="">
          Logout
        </a>
      )}
    </li>
  </ul>
);

export default Navbar;
