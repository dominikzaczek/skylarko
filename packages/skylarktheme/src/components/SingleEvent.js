import React from "react";
import { connect } from "frontity";
import PanelistItem from "./PanelistItem";
import Switch from "@frontity/components/switch";
import Register from "./Register";
import Link from "@frontity/components/link";
const SingleEvent = ({ state, actions, libraries }) => {
  const [panelistsData, setPanelistsData] = React.useState([]);
  const [register, setRegister] = React.useState();

  // fetching the data from the website
  const data = state.source.get(state.router.link);
  // getting the info about the specific event
  const event = state.source[data.type][data.id];

  // listing all the agenda
  const panelists = event.acf.agenda;
  // get all panelists to a state
  const getPanelistsData = async () => {
    //array of all panelists
    const promises = panelists.map(async (panelist) => {
      const panelistId = panelist.panelists[0];
      const panelistData = await libraries.source.api.get({
        endpoint: `/wp/v2/panelists/${panelistId}`,
      });
      const response = await panelistData.json();
      return response;
    });

    const resolvedProm = await Promise.all(promises);
    setPanelistsData(resolvedProm);
  };

  // mapping to get panelists' ids
  React.useEffect(() => {
    getPanelistsData();
  }, []);

  return (
    <div className="container">
      <img src={event.acf.event_banner} className="img-fluid mt-5" />
      <div style={{ backgroundColor: "#000" }} className="p-5">
        <Switch>
          <div when={state.router.link === event.link}>
            <div className="row">
              <div className="col-md-3">
                <img src={event.acf.event_logo} className="img-fluid" />
              </div>
              <div className="col-md-9 p-5">
                <h2>{event.title.rendered}</h2>
                <h5>{event.acf.description}</h5>
                <p>
                  Starts at {event.acf.start_time} on {event.acf.event_date}
                </p>
                <Link link={event.link + "#register"}>Register</Link>
              </div>
            </div>
            <div className="row">
              <h3
                style={{ backgroundColor: "#0f0f0f" }}
                className="mb-3 mt-3 p-3"
              >
                Agenda
              </h3>
              <ul>
                {event.acf.agenda.map((presenter) => {
                  return (
                    <li>
                      {presenter.start_time} - {presenter.end_time}:{" "}
                      {presenter.title}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="row d-flex justify-content-between">
              <h3
                style={{ backgroundColor: "#0f0f0f" }}
                className="mb-3 mt-3 p-3"
              >
                About the panelists
              </h3>
              {panelistsData.length > 0
                ? panelistsData.map((panelist) => {
                    console.log("panki", panelist);
                    return <PanelistItem panelist={panelist} event={event} />;
                  })
                : null}
            </div>
          </div>
          <div when={state.router.link === event.link + "#register"}>
            <Register
              eId={event.id}
              logo={event.acf.event_logo}
              name={event.title.rendered}
            />
          </div>
        </Switch>
      </div>
    </div>
  );
};
export default connect(SingleEvent);
