import React from "react";
import bootstrap from "../../assets/css/bootstrap/bootstrap.min.css";
import { Global, css, styled } from "frontity";
import { connect } from "frontity";
import CryptoJS from "crypto-js";

import Header from "./Header";
import EventsList from "./EventsList";
import SingleEvent from "./SingleEvent";
import Switch from "@frontity/components/switch";
import Loading from "./Loading";
import Login from "./Login";
import SignUp from "./SignUp";
import Register from "./Register";
import Dashboard from "./Dashboard";
const Root = ({ state, actions }) => {
  // const [data, setData] = React.useState();
  const data = state.source.get("/events/");
  const pageData = state.source.get(state.router.link);

  async function checkIfLogged() {
    const salt = await state.salt;
    const bytes = CryptoJS.AES.decrypt(state.theme.userData, salt);

    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + decryptedData.token,
      },
      cors: "cors",
      body: JSON.stringify(decryptedData),
    };

    const response = await fetch(
      `${state.source.url}/wp-json/jwt-auth/v1/token/validate`,
      requestOptions
    );

    const responseInJson = await response.json();
    if (responseInJson.data.status === 200) {
      actions.theme.setLoggedIn(true);
    } else {
      actions.theme.setLoggedIn(false);
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    }
  }

  React.useEffect(() => {
    checkIfLogged();
  });
  return (
    <>
      <Global styles={css(bootstrap)} />
      <ContentWrapper>
        <Wrapper>
          <Header isHome={pageData.isHome} />
        </Wrapper>
        <Switch>
          <Loading when={!data} />
          <EventsList when={data && pageData.isHome} data={data} />
          <SingleEvent when={pageData.type === "events"} />
          <Login when={pageData.route === "/login/" && !state.theme.loggedIn} />
          <SignUp when={pageData.route === "/sign-up/"} />
          <Register when={pageData.link === "/register/"} />

          <Dashboard
            when={pageData.route === "/dashboard/" && state.theme.loggedIn}
          />
        </Switch>
      </ContentWrapper>
    </>
  );
};

export default connect(Root);

const Wrapper = styled.div`
  display: flex;
  background-color: #000;
`;
const ContentWrapper = styled.div`
  background-color: #24080d;
  color: white;
  min-height: 100vh;
  padding-bottom: 3rem;
`;
