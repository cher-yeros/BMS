import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminHome from "./components/admin/Home";
import TouristAreas from "./components/admin/ManageAttractionSites/TouristAreas";
import HotelAdmins from "./components/admin/ManageHotelAdmin/HotelAdmins";
import ManageHotels from "./components/admin/ManageHotels/ManageHotels";
import Regions from "./components/admin/ManageRegions/Regions";
import ManageUsers from "./components/admin/ManageUsers/ManageUsers";
import ReadFeedbacks from "./components/admin/ReadFeedbacks";
import AttractionSite from "./components/AttractionSite";
import Home from "./components/Home";
import AddHotel from "./components/hoteladmin/AddHotel";
import AddReceptionist from "./components/hoteladmin/AddReceptionist";
import ControlBooking from "./components/hoteladmin/ControlBooking";
import EditHotel from "./components/hoteladmin/EditHotel";
import HotelAdminHome from "./components/hoteladmin/Home";
import { default as Hotel } from "./components/hoteladmin/Hotel";
import MyHotel from "./components/hoteladmin/MyHotel";
import UpdateHotel from "./components/hoteladmin/UpdateHotel";
import Login from "./components/Login";
import ReceptionistHome from "./components/receptionist/Home";
import Region from "./components/Region";
import Profile from "./components/UserProfile";
import RequireAuth from "./requireAuth";

function App() {
  const auth = useSelector((state) => state.auth.loggedUser);

  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route
          path="/"
          element={auth ? <Navigate to={`/${auth.role.Name}`} /> : <Home />}
        ></Route>

        <Route
          element={
            <RequireAuth allowedRoles={["hoteladmin", "admin", "customer"]} />
          }
        ></Route>
        <Route path="/customer" element={<Home />} />
        {/*<Route path="/login" element={<Login />} />*/}
        <Route path="/region" element={<Region />} />
        <Route path="/attraction-site" element={<AttractionSite />} />
        <Route path="/hotel" element={<Hotel />} />

        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/tourist-areas" element={<TouristAreas />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/manage-hotels" element={<ManageHotels />} />
          <Route path="/hotel-admins" element={<HotelAdmins />} />
          <Route path="/read-feedbacks" element={<ReadFeedbacks />} />
          <Route path="/add-hotel" element={<AddHotel />} />
          <Route path="/edit-hotel" element={<EditHotel />} />
          <Route path="/update-hotel" element={<UpdateHotel />} />
          <Route path="/regions" element={<Regions />} />
        </Route>
        <Route
          element={
            <RequireAuth allowedRoles={["hoteladmin", "admin", "customer"]} />
          }
        ></Route>
        <Route element={<RequireAuth allowedRoles={["hoteladmin"]} />}>
          <Route path="/control-booking" element={<ControlBooking />} />
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/add-receptionist" element={<AddReceptionist />} />
          <Route path="/hoteladmin" element={<HotelAdminHome />} />
          <Route path="/hotels" element={<MyHotel />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["receptionist"]} />}>
          <Route path="/receptionist" element={<ReceptionistHome />} />
          <Route path="/available-rooms" element={<AddReceptionist />} />
          <Route path="/allocated-rooms" element={<AddReceptionist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
