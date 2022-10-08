import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import Login from "./Login";
function Navbar() {
  const n = useNavigate();
  const dispatch = useDispatch();
  const CU = useSelector((state) => state.auth.loggedUser);
  function logout() {
    dispatch(logoutUser());
    n("/");
  }
  function openLogin() {
    let loginForm = document.querySelector(".login-form-container");

    loginForm.classList.add("active");
  }
  return (
    <>
      <header>
        <div id="menu-bar" className="fas fa-bars"></div>

        <Link to="/" className="logo">
          <span>T</span>ravel
        </Link>

        <nav className="navbar">
          <Link to="/">home</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>

          {CU ? (
            <button onClick={logout} className="btn btn-danger">
              <i className="fas fa-right-from-bracket"></i>
              <i className="fas fa-arrow-right-from-bracket"></i>
              Logout
            </button>
          ) : (
            <button
              onClick={openLogin}
              id="login-btn"
              className="btn btn-danger"
            >
              <i className="fas fa-right-from-bracket"></i>
              Login
            </button>
          )}
        </nav>

        {/*<div className="icons">
        <i className="fas fa-search" id="search-btn"></i>
        <i className="fas fa-user" id="login-btn"></i>
    </div>*/}

        {/*<form action="" className="search-bar-container">
        <input type="search" id="search-bar" placeholder="search here..."/>
        <label htmlFor="search-bar" className="fas fa-search"></label>
    </form>*/}
        <Login />
      </header>
    </>
  );
}

export default Navbar;
