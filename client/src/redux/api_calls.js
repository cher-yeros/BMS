import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
import apiCall from "../apiCall";
import { loginSuccess } from "./authSlice";
import { updateHotel } from "./hotelSlice";
import { updateAttractionSites } from "./attractionSiteSlice";
import { updateRegion } from "./regionSlice";
import { updateUsers } from "./userSlice";
import { updateCounts } from "./adminSlice";
export const loginUser = async (user, dispatch, navigate) => {};

export const getCounts = async (token, dispatch) => {
  const { data } = await apiCall.get("/v1/admin/get-counts", {
    headers: {
      "x-api-key": token,
    },
  });

  dispatch(updateCounts(data));
};
export const getUsers = async (token, dispatch) => {
  apiCall
    .get("/v1/admin/get-users", {
      headers: {
        "x-api-key": token,
      },
    })
    .then(({ data }) => {
      if (data.success) {
        dispatch(updateUsers(data.message));
      } else {
        alert(data.message);
      }
    });
};
export const getHotelAdmins = async (token, dispatch) => {
  apiCall
    .get("/v1/admin/get-users", {
      headers: {
        "x-api-key": token,
      },
    })
    .then(({ data }) => {
      if (data.success) {
        dispatch(updateUsers(data.message));
      } else {
        alert(data.message);
      }
    });
};
export const getHotels = async (token, dispatch) => {
  apiCall
    .get("/v1/customer/get-hotels", {
      headers: {
        "x-api-key": token,
      },
    })
    .then(({ data }) => {
      if (data.success) {
        dispatch(updateHotel(data.message));
      } else {
        alert(data.message);
      }
    });
};
export const getAttractionSites = async (token, dispatch) => {
  apiCall
    .get("/v1/customer/get-attraction-site", {
      headers: {
        "x-api-key": token,
      },
    })
    .then(({ data }) => {
      console.log(data);
      if (data.success) {
        dispatch(updateAttractionSites(data.message));
      } else {
        alert(data.message);
      }
    });
};
export const getRegions = async (token, dispatch) => {
  apiCall
    .get("/v1/customer/get-region", {
      headers: {
        "x-api-key": token,
      },
    })
    .then(({ data }) => {
      console.log(data);

      if (data.success) {
        dispatch(updateRegion(data.message));
      } else {
        alert(data.message);
      }
    });
};
export const getMyHotels = async (uid, token, dispatch) => {};
