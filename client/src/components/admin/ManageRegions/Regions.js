import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiCall from "../../../apiCall";
import { getRegions } from "../../../redux/api_calls";
import Region from "../../Region";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function Regions() {
  useEffect(() => {
    getRegions();
  }, []);
  const [selectedRegion, setselectedRegion] = useState({});
  const [NewRegion, setNewRegion] = useState({
    Name: "",
    Description: "",
    Photo: "",
  });

  const CU = useSelector((state) => state.auth.loggedUser);
  const Regions = useSelector((state) => state.region.regions);

  const dispatch = useDispatch();
  useEffect(() => {
    getRegions(CU.token, dispatch);
  }, []);

  function submit(e) {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("Name", NewRegion.Name);
    formdata.append("Description", NewRegion.Description);
    formdata.append("Photo", NewRegion.Photo);

    apiCall.post("/v1/admin/add-region", formdata).then(({ data }) => {
      if (!data.success) {
        alert(data.message);
      } else {
        alert("Successfully Added");
        setNewRegion({
          Name: "",
          Description: "",
          Photo: "",
        });
      }
    });

    getRegions(CU.token, dispatch);
  }
  function edit(e) {
    e.preventDefault();
    console.log(selectedRegion);
  }
  return (
    <>
      <Navbar />
      <Sidebar />

      <main className="main" id="main">
        <div className="section Site">
          <div
            className="row justify-content-center"
            style={{ width: "100% " }}
          >
            <div className="col-xl-9 col-lg-9">
              <div className="card">
                <div className="card-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#regions-list"
                      >
                        Regions List
                      </button>
                    </li>

                    {/*<li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#edit"
                      >
                        Edit
                      </button>
                    </li>*/}
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#addnew"
                      >
                        Add New
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active "
                      id="regions-list"
                    >
                      <div className="card-body">
                        <h5 className="card-title">Regions</h5>

                        <table className="table datatable">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Number of sites</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {Regions.map((r, i) => (
                              <tr key={r.Id}>
                                <td>{i + 1}</td>
                                <td>{r.Name}</td>

                                <td>
                                  {r.Description
                                    ? r.Description
                                    : "No Description"}
                                </td>
                                <td>{r?.attractionSites?.length}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/*<div className="tab-pane fade pt-3" id="edit">
                      <form>
                        <h3>Edit Region</h3>
                        <div className="col-lg-6">
                          <select
                            name="Type"
                            onChange={(e) => {
                              setselectedRegion(
                                Regions[parseInt(e.target.value)]
                              );
                            }}
                            className="box"
                          >
                            <option disabled value="default">
                              Select Type
                            </option>
                            {Regions.map((r, i) => (
                              <option key={i} value={i}>
                                {r.Name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <input
                              name="Name"
                              value={selectedRegion.Name}
                              onChange={(e) => {
                                setselectedRegion({
                                  ...selectedRegion,
                                  Name: e.target.value,
                                });
                              }}
                              type="text"
                              className="box"
                              placeholder="Enter region name"
                            />
                          </div>
                          <div className="col-lg-12">
                            <textarea
                              name="Description"
                              value={selectedRegion.Description}
                              onChange={(e) =>
                                setselectedRegion({
                                  ...selectedRegion,
                                  Description: e.target.value,
                                })
                              }
                              rows={3}
                              className="box"
                              placeholder="Enter Description"
                            />
                          </div>

                          <div className="col-lg-6">
                            <input
                              name="Photo"
                              style={{ borderRadius: "0px" }}
                              className="form-control box"
                              type="file"
                              id="formFileMultiple"
                              onChange={(e) => {
                                setselectedRegion({
                                  ...selectedRegion,
                                  Photo: e.target.files[0],
                                });
                              }}
                            ></input>
                          </div>
                        </div>

                        <br />
                        <div className="row mx-1">
                          <input
                            onClick={edit}
                            type="submit"
                            value="Add"
                            className="bttn"
                          />{" "}
                          <input type="reset" value="Reset" className="bttn" />
                        </div>
                      </form>
                    </div>*/}

                    <div className="tab-pane fade pt-3" id="addnew">
                      <form>
                        <h3>Add Region</h3>
                        {/*{setselectedRegion({})}*/}
                        <div className="row">
                          <div className="col-lg-12">
                            <input
                              name="Name"
                              value={NewRegion.Name}
                              onChange={(e) => {
                                setNewRegion({
                                  ...selectedRegion,
                                  Name: e.target.value,
                                });
                              }}
                              type="text"
                              className="box"
                              placeholder="Enter region name"
                            />
                          </div>
                          <div className="col-lg-12">
                            <textarea
                              name="Description"
                              value={NewRegion.Description}
                              onChange={(e) =>
                                setNewRegion({
                                  ...NewRegion,
                                  Description: e.target.value,
                                })
                              }
                              rows={3}
                              className="box"
                              placeholder="Enter Description"
                            />
                          </div>

                          <div className="col-lg-6">
                            <input
                              name="Photo"
                              style={{ borderRadius: "0px" }}
                              className="form-control box"
                              type="file"
                              id="formFileMultiple"
                              onChange={(e) => {
                                setNewRegion({
                                  ...NewRegion,
                                  Photo: e.target.files[0],
                                });
                              }}
                            ></input>
                          </div>
                        </div>

                        <br />
                        <div className="row mx-1">
                          <input
                            onClick={submit}
                            type="submit"
                            value="Add"
                            className="bttn"
                          />{" "}
                          <input type="reset" value="Reset" className="bttn" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Regions;
