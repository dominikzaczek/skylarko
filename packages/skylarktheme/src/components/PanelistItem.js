import React from "react";
import Link from "@frontity/components/link";
import { connect } from "frontity";

const PanelistItem = ({ state, panelist, event }) => {
  const { image, first_name, last_name, biography } = panelist.acf;
  // const person = state.source.panelists[panelist.panelists];
  return (
    <div
      className="col-md-5 col-xl-4 p-0 p-xl-1 mb-2 b-1"
      style={{ color: "#fff", backgroundColor: "#24080d" }}
    >
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h4 className="card-title">
          {first_name} {last_name}
        </h4>
        <div dangerouslySetInnerHTML={{ __html: biography }} />
      </div>
    </div>
  );
};

export default connect(PanelistItem);
