import axios from "axios";
import Auth from "./Auth";

const ls = JSON.parse(localStorage.getItem("persist:root"))?.auth;

const currentUser = ls ? JSON.parse(ls)?.loggedUser?.token : null;

const apiCall = axios.create({
  baseURL: "http://127.0.0.1:4000/api",
  headers: {
    "x-api-key": currentUser,
  },
});

export default apiCall;
