import React from "react";

export function UserOverView(User) {
  return (
    <>
      <h5 className="card-title">User Details</h5>

      <div className="row mb-1">
        <div className="col-lg-3 col-md-4 label ">FirstName</div>
        <div className="col-lg-9 col-md-8">{User.FirstName}</div>
      </div>

      <div className="row mb-1">
        <div className="col-lg-3 col-md-4 label ">MiddleName</div>
        <div className="col-lg-9 col-md-8">{User.MiddleName}</div>
      </div>

      <div className="row mb-1">
        <div className="col-lg-3 col-md-4 label ">LastName</div>
        <div className="col-lg-9 col-md-8">{User.LastName}</div>
      </div>

      <div className="row mb-1">
        <div className="col-lg-3 col-md-4 label ">Gender</div>
        <div className="col-lg-9 col-md-8">{User.Gender}</div>
      </div>

      <div className="row mb-1">
        <div className="col-lg-3 col-md-4 label ">Phone</div>
        <div className="col-lg-9 col-md-8">{User.PhoneNumber}</div>
      </div>

      <div className="row mb-1">
        <div className="col-lg-3 col-md-4 label">Email</div>
        <div className="col-lg-9 col-md-8">{User.Email}</div>
      </div>

      <div className="row mb-1">
        <div className="col-lg-3 col-md-4 label">Role</div>
        <div className="col-lg-9 col-md-8">{User.RoleId}</div>
      </div>
    </>
  );
}
