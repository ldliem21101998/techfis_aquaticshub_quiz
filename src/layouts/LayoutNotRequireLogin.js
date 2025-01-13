
import { useEffect, useState } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import PublicLayout from "./PublicLayout";
import PrivateLayout from "./PrivateLayout";
import { PublicRoutes } from "../utils/routes/publicRoutes";
import { PrivateRoutes } from "../utils/routes/privateRoutes";
import { path, allowedRoles } from "../utils/constants";
import { NoAuth, Login } from "../pages";
import { getSessionVar } from "../utils/common/hashData";
import { sessionVar } from "../utils/constants";

const ProtectedRoute = ({ isAllowed, children, redirectPath }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAllowed) {
      return navigate(redirectPath ? redirectPath : `${path.common.Login}`)
    }
  }, []);

  return (<>
    {isAllowed
      ? children ? children : <Outlet />
      : <></>}
  </>)
}

const LayoutNotRequireLogin = () => {
  const [user, setUser] = useState(
    getSessionVar(sessionVar.user)
  );
  const handeSetUser = (userJson) => {
    setUser(userJson);
  };

  //Routes
  const showPublicMenu = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={route.main()}
            exact={route.exact}
          ></Route>
        );
      });
    }
    return result;
  };

  const showPrivateMenu = (routes) => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectedRoute
                isAllowed={
                  user
                    ? route.role
                      ? route.role.includes(user.role)
                      : false
                    : false
                }
                redirectPath={`../${path.common.NoAuth}`}
              >
                {route.main()}
              </ProtectedRoute>
            }
            exact={route.exact}
          ></Route>
        );
      });
    }
    return result;
  };

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {showPublicMenu(PublicRoutes)}
        <Route
          path={path.common.Login}
          element={<Login onSetUser={handeSetUser} />}
          exact={true}
        />
      </Route>

      <Route
        element={
          <ProtectedRoute
            isAllowed={user ? allowedRoles.includes(user.role) : false}
          >
            <PrivateLayout />
          </ProtectedRoute>
        }
      >
        <Route path={`${path.common.NoAuth}`} element={<NoAuth />} />
        {showPrivateMenu(PrivateRoutes)}
      </Route>
    </Routes>
  );
};

export default LayoutNotRequireLogin;
