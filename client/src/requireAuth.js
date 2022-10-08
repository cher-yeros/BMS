import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth.loggedUser);

  return auth ? (
    allowedRoles?.includes(auth.role.Name) ? (
      <Outlet />
    ) : (
      <Navigate to={`/${auth.role.Name}`} state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
