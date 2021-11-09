import React from "react";
import { AddEvent } from "./AddEvent";

export const MyEvents = ({ state, userId, source }) => {
  const [events, setEvents] = React.useState();
  console.log(userId);

  async function getEvents() {
    let filteredEvents = [];
    let response = await fetch(`${source}/wp-json/wp/v2/events`, {
      method: "GET",
    });

    if (response.ok) {
      let allEvents = await response.json();

      for (let i = 0; i < allEvents.length; i++) {
        console.log(allEvents[i]);
        if (allEvents[i].acf.event_owner === userId) {
          const validEvent = allEvents[i];
          filteredEvents.push(validEvent);
        }
      }

      setEvents(filteredEvents);
    } else {
      console.log(response.status);
    }
  }

  React.useEffect(() => {
    if (userId) {
      getEvents();
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          {events ? <h1>Your events</h1> : null}
          {events ? (
            events.map((event) => {
              return (
                <img style={{ maxWidth: "300px" }} src={event.acf.event_logo} />
              );
            })
          ) : (
            <h3>You have no events</h3>
          )}
        </div>
      </div>
    </>
  );
};
