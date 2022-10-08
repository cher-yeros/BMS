import React from "react";

export function Gallary(Site) {
  return (
    <>
      <h3>Gallery</h3>
      <div className="row">
        {[0, 1, 2, 3, 4].map((p) => (
          <div key={p} className="col-lg-6 col-md-4">
            <img
              style={{ width: "100%" }}
              src={`http://127.0.0.1:4000/Attraction/${Site.Id + "" + p}.jpg`}
            />
            {/*<button className="btn btn-success btn-sm my-2" type="button">
              Upload another
            </button>*/}
          </div>
        ))}
      </div>
    </>
  );
}
