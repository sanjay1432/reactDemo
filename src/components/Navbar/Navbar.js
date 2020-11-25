/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { GlobalContext } from "../../plugins/globalContext";
function Navbar() {
  const [isActive, setisActive] = React.useState(false);

  return (
    <nav
      className="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt=""
          />
        </a>

        <a
          role="button"
          className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={() => {
            setisActive(!isActive);
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <NavLink className="navbar-item" to="/">
            Home
          </NavLink>

          <a className="navbar-item">Documentation</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <NavLink className="navbar-item" to="/About">
                About
              </NavLink>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
}

function AuthButtons() {
  const [state, setState] = useContext(GlobalContext);
  const history = useHistory();
  async function logout() {
    await setState((previoustate) => ({ ...previoustate, authUser: null }));
    localStorage.removeItem("bearer");
    history.push("/Login");
  }
  // console.log("auth", state.authUser);
  if (state?.authUser) {
    return (
      <div className="buttons">
        <NavLink className="navbar-item is-info" to="/Profile">
          Profile
        </NavLink>
        <button className="button is-warning" onClick={logout}>
          Log out
        </button>
      </div>
    );
  } else {
    return (
      <div className="buttons">
        <a className="button is-primary" href="/Signup">
          <strong>Sign up</strong>
        </a>
        <a className="button is-light" href="/Login">
          Log in
        </a>
      </div>
    );
  }
}
export default Navbar;
