import React from "react";
import "./navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="nav header">
      <div className="wrapper">
        <Link className="nav__logo" to={"/"}>
          TODOLIST
        </Link>
        <nav>
          <NavLink
            className={({ isActive }) =>
              ["nav__link", isActive && "nav__link--activate"].join(" ")
            }
            to={"/login"}
          >
            로그인
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              ["nav__link", isActive && "nav__link--activate"].join(" ")
            }
            to={"/register"}
          >
            회원가입
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
