import React from "react";
import { connect } from "frontity";
import Logo from "../../assets/images/logo.png";
import CryptoJS from "crypto-js";
import Link from "@frontity/components/link";
const Login = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [response, setResponse] = React.useState();

  async function handleLogin() {
    const salty = await state.salt;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    const response = await fetch(
      `${state.source.url}/wp-json/jwt-auth/v1/token`,
      requestOptions
    );
    const responseInJson = await response.json();
    if (!responseInJson.token) {
      setResponse(responseInJson.message);
    } else {
      const ciphertext = await CryptoJS.AES.encrypt(
        JSON.stringify(responseInJson),
        salty //TODO: not loading???
      ).toString();
      document.cookie = ciphertext + "path=/";
      window.location.replace("/dashboard");
    }
  }

  return (
    <div className="container h-100 d-flex align-items-center justify-content-center">
      <div className="row">
        <div className="col-10 p-5" style={{ backgroundColor: "#000" }}>
          <img src={Logo} className="img-fluid" />

          <div className="mb-3 row">
            {response}
            <label
              htmlFor="inputUsername"
              className="col-sm-2 col-form-label visually-hidden"
            >
              Login
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputUsername"
                placeholder="Login"
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className="btn" onClick={() => handleLogin()}>
            Login
          </button>
          <Link className="btn" link="/sign-up/">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
export default connect(Login);
