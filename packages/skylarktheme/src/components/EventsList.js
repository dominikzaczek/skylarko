import React from "react";
import EventListing from "./ListItem";

const EventsList = ({ data }) => {
  if (data) {
    return (
      <>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12">
              {data.items.map((item) => {
                return <EventListing data={item} />;
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default EventsList;
