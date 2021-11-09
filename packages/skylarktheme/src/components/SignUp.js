import React from "react";
import { connect } from "frontity";
import Logo from "../../assets/images/logo.png";
const SignUp = ({ state }) => {
  const data = state.source.get(state.router.link);
  const [userData, setUserData] = React.useState({
    username: null,
    first_name: null,
    email: null,
    password: null,
  });
  async function handleSignUp() {
    const login = "Dominik";
    const appPass = "Fxo0 SIg0 Z927 BtFc YxZy 7GM4";
    const credsies = login + ":" + appPass;
    const credentials = btoa(credsies);
    let response = await fetch(`${state.source.url}/wp-json/wp/v2/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        username: userData.username,
        first_name: userData.first_name,
        email: userData.email,
        password: userData.password,
      }),
    });

    let json = await response.json();

    console.log(json);
  }
  return (
    <div className="container h-100 d-flex align-items-center justify-content-center">
      <div className="row">
        <div className="col-10 p-5" style={{ backgroundColor: "#000" }}>
          <img src={Logo} className="img-fluid" />

          <div className="mb-3 row">
            <label
              htmlFor="inputUsername"
              className="col-sm-2 col-form-label visually-hidden"
            >
              Username
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                placeholder="Login"
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="inputFirstName"
              className="col-sm-2 col-form-label visually-hidden"
            >
              First Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputFirstName"
                placeholder="First name"
                onChange={(e) =>
                  setUserData({ ...userData, first_name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="inputUsername"
              className="col-sm-2 col-form-label visually-hidden"
            >
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="inputPassword"
              className="col-sm-2 col-form-label visually-hidden"
            >
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </div>
          </div>
          <button className="btn" onClick={() => handleSignUp()}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default connect(SignUp);
