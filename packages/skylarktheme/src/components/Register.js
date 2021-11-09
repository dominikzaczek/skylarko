import React from "react";
import { connect } from "frontity";
import CryptoJS from "crypto-js";
const Register = ({ state, actions, libraries, eId, logo, name }) => {
  const [registerData, setRegisterData] = React.useState({
    firstName: null,
    lastName: null,
    email: null,
    telephone: null,
    eventId: eId,
  });

  const [registered, setRegistered] = React.useState();

  async function handleRegister(e) {
    e.preventDefault();
    const login = "Dominik";
    const appPass = "Fxo0 SIg0 Z927 BtFc YxZy 7GM4";
    const credsies = login + ":" + appPass;
    const credentials = btoa(credsies);
    const headers = {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    };
    console.log(credentials);
    await fetch(state.source.url + "/wp-json/wp/v2/registrations", {
      method: "POST",
      headers,
      body: JSON.stringify({
        acf: {
          first_name: registerData.firstName,
        },
      }),
    })
      .then(async (response) => {
        let json = await response.json();
        console.log(json);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <img src={logo} className="img-fluid" />
        </div>
        <div className="col-md-6">
          {JSON.stringify(registerData)}
          <h1>Register for {name}</h1>
          <form id="contactForm" style={{ color: "#000" }}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="emailAddress"
                type="email"
                placeholder="Email Address"
                data-sb-validations="required,email"
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                required
              />
              <label for="emailAddress">Email Address</label>
              <div
                className="invalid-feedback"
                data-sb-feedback="emailAddress:required"
              >
                Email Address is required.
              </div>
              <div
                className="invalid-feedback"
                data-sb-feedback="emailAddress:email"
              >
                Email Address Email is not valid.
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="firstName"
                type="text"
                placeholder="First name"
                data-sb-validations="required"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    firstName: e.target.value,
                  })
                }
                required
              />
              <label for="firstName">First name</label>
              <div
                className="invalid-feedback"
                data-sb-feedback="firstName:required"
              >
                First name is required.
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="lastName"
                type="text"
                placeholder="Last name"
                data-sb-validations="required"
                onChange={(e) =>
                  setRegisterData({ ...registerData, lastName: e.target.value })
                }
                required
              />
              <label for="lastName">Last name</label>
              <div
                className="invalid-feedback"
                data-sb-feedback="lastName:required"
              >
                Last name is required.
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="telephone"
                type="text"
                placeholder="Telephone"
                data-sb-validations="required"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    telephone: e.target.value,
                  })
                }
                required
              />
              <label for="telephone">Telephone</label>
              <div
                className="invalid-feedback"
                data-sb-feedback="telephone:required"
              >
                Telephone is required.
              </div>
            </div>

            <div className="d-grid">
              <button
                className="btn btn-primary btn-lg"
                id="submitButton"
                onClick={handleRegister}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default connect(Register);
