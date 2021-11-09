import React from "react";
import Image from "@frontity/components/image";
import Link from "@frontity/components/link";
import Logo from "../../assets/images/logo.png";
import Banner from "../../assets/images/design.jpeg";
import Switch from "@frontity/components/switch";
import { connect } from "frontity";

const Header = (props) => {
  function handleLogOut() {
    props.actions.theme.setLoggedIn(false);
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  }
  return (
    <div className="container-fluid shadow-lg p-0">
      <div className="row">
        <div className="col-md-12 ps-5 pe-5 d-flex justify-content-between align-items-center">
          <Link link="/">
            <img src={Logo} className="img-fluid" width="220px" />
          </Link>

          <div>
            <p>
              {props.state.theme.userData ? (
                <div>
                  <Link link="dashboard">Dashboard</Link>{" "}
                  <span onClick={handleLogOut}>(Log out)</span>
                </div>
              ) : (
                <Link link="/login/">Log in</Link>
              )}
            </p>
            {/* {document.cookie ? <p>Login</p> : <p>Hello</p>} */}
            {/* <Switch>
              <Link when={!props.state.theme.userData} link="/login">
                Login / Sign Up
              </Link>
              <p when={props.state.theme.userData}>Hello</p>
            </Switch> */}
          </div>
        </div>
      </div>
      {props.isHome ? (
        <div className="row">
          <div className="col-md-12">
            <img src={Banner} className="img-fluid" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default connect(Header);
