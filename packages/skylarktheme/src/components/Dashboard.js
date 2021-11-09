import React from "react";
import { connect } from "frontity";
import CryptoJS from "crypto-js";
import Switch from "@frontity/components/switch";
import { MyEvents } from "./MyEvents";
import { AddEvent } from "./AddEvent";

const Dashboard = ({ state }) => {
  const pageData = state.source.get(state.router.link);
  const [user, setUser] = React.useState();
  const [token, setToken] = React.useState();
  console.log(pageData.route);

  async function getMyData() {
    const salt = await state.salt;
    const bytes = CryptoJS.AES.decrypt(state.theme.userData, salt);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    setToken(decryptedData.token);

    const response = await fetch(`${state.source.url}/wp-json/wp/v2/users/me`, {
      headers: {
        Authorization: `Bearer ${decryptedData.token}`,
      },
      method: "GET",
    });

    if (response.ok) {
      let json = await response.json();
      setUser(json);
    } else {
      console.log(response.status);
    }
  }

  React.useEffect(() => {
    getMyData();
  }, []);
  return (
    <>
      <Switch>
        <h1 when={!pageData || !user}>Loading</h1>
        <h1 when={user}>Hello, {user ? user.name : "Anonymus"}</h1>
        <h1 when={pageData.route === "/dashboard/create-event/"}>
          Create events
        </h1>
      </Switch>
      {user ? <MyEvents userId={user.id} source={state.source.url} /> : null}
      <AddEvent token={token} />
    </>
  );
};

export default connect(Dashboard);
