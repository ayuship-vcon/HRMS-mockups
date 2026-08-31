import { useSelector } from "react-redux";

export const usePermission = () => {
  const permissions = useSelector(
    (state) => state.user.permissions
  );

  const can = (permission) => {
    return permissions?.includes(permission);
  };

  const canAny = (requiredPermissions) => {
    return requiredPermissions.some((permission) =>
      permissions?.includes(permission)
    );
  };

  const canAll = (requiredPermissions) => {
    return requiredPermissions.every((permission) =>
      permissions?.includes(permission)
    );
  };

  return {
    can,
    canAny,
    canAll,
  };
};