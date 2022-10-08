import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../apiCall";
import Auth from "../../Auth";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function ReadFeedbacks() {
  useEffect(() => {
    getFeedbacks();
  });

  function getFeedbacks() {
    api.get();
  }

  let comments = [];
  return (
    <>
      <Navbar />
      <Sidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item active">Tourist Areas</li>
            </ol>
          </nav>
        </div>

        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="card w-100">
              <div className="card-body">
                <h5 className="card-title">Tourist Areas</h5>

                <table className="table datatable">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>email</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Type</td>
                      <td>Description</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash-alt"></i>
                        </button>{" "}
                        <button className="btn btn-success btn-sm">
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <button className="btn btn-info btn-sm">
                          {" "}
                          <i className="fas fa-external-link-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Type</td>
                      <td>Description</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash-alt"></i>
                        </button>{" "}
                        <button className="btn btn-success btn-sm">
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <button className="btn btn-info btn-sm">
                          {" "}
                          <i className="fas fa-external-link-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Type</td>
                      <td>Description</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash-alt"></i>
                        </button>{" "}
                        <button className="btn btn-success btn-sm">
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <button className="btn btn-info btn-sm">
                          {" "}
                          <i className="fas fa-external-link-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Type</td>
                      <td>Description</td>
                      <td>
                        <button className="btn btn-danger btn-sm">
                          <i className="fas fa-trash-alt"></i>
                        </button>{" "}
                        <button className="btn btn-success btn-sm">
                          {" "}
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        <button className="btn btn-info btn-sm">
                          {" "}
                          <i className="fas fa-external-link-alt"></i>{" "}
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <button className="btn btn-primary btn-sm">
                          <i className="fas fa-plus"></i> Add New
                        </button>{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ReadFeedbacks;
