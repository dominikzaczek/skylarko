import { fetch } from "frontity";
import React from "react";
export const AddEvent = ({ token }) => {
  const [banner, setBanner] = React.useState();
  const [logo, setLogo] = React.useState();

  async function handleUpload(e) {
    let formData = new FormData();

    formData.append("file", banner);
    await fetch("http://localhost:8888/skylark/wp-json/wp/v2/media", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formData,
      }),
    })
      .then((res) => {
        console.log(res.body);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function handleFile(e) {
    console.log(e.target.files);
  }
  return (
    <>
      <div className="container">
        <h1>Add an event</h1>
        <div className="row">
          <div className="col-md-3">
            <h3>Upload banner</h3>
            <input type="file" id="banner" onChange={(e) => handleFile(e)} />
            <button onClick={handleUpload}>Upload</button>
          </div>
          <div className="col-md-3">
            <h3>Upload logo</h3>
          </div>
          <div className="col-md-6">
            <h3>Event details</h3>
            <form class="form-horizontal">
              <fieldset>
                <div class="form-group">
                  <label class=" control-label" for="title">
                    Title
                  </label>
                  <div class="">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="A great event"
                      class="form-control input-md"
                      required
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class=" control-label" for="date">
                    Date
                  </label>
                  <div class="">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      placeholder="date"
                      class="form-control input-md"
                      required
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class=" control-label" for="time">
                    Time
                  </label>
                  <div class="">
                    <input
                      id="time"
                      name="time"
                      type="time"
                      placeholder="time"
                      class="form-control input-md"
                      required
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
