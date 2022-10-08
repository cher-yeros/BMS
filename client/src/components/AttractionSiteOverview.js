import React from "react";

export function AttractionSiteOverview(Site) {
  return (
    <>
      <h5 className="card-title">Site Details</h5>

      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Name</div>
        <div className="col-lg-9 col-md-8">{`${Site.Name} ${Site.lastname}`}</div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Description</div>
        <div className="col-lg-9 col-md-8">
          {Site.Description}
          lorem10
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Address</div>
        <div className="col-lg-9 col-md-8">{Site.addressTypeId}</div>
      </div>
    </>
  );
}
