import React from "react";
import { connect } from "frontity";
import Link from "@frontity/components/link";

const EventListing = (props) => {
  const data = props.data;
  const post = props.state.source[data.type][data.id];
  return (
    <div
      className="container shadow mb-3 p-0"
      style={{ backgroundColor: "#000" }}
    >
      <div className="row d-flex">
        <div className="col-xs-12 col-lg-4">
          <div
            style={{
              backgroundImage: `url(${post.acf.event_logo})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              minHeight: "100%",
            }}
          ></div>
        </div>
        <div className="col-md-8 p-3 p-5">
          <h1>{post.title.rendered}</h1>
          <h4>
            {post.acf.event_date} at {post.acf.start_time}
          </h4>
          <p>{post.acf.description}</p>
          <Link link={post.link}>Learn more</Link>
        </div>
      </div>
    </div>
  );
};

export default connect(EventListing);
