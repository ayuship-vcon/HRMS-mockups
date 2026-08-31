import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PermissionRoute = ({
  permission,
  children,
}) => {
  const permissions = useSelector(
    (state) => state.user.permissions
  );

  const hasPermission =
    permissions?.includes(permission);

  if (!hasPermission) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default PermissionRoute;