import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import About from "./pages/About/About";
import Home from "./pages/Home/home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: Home },
  {
    path: "/About",
    key: "APP_PAGE",
    exact: false,
    auth: true,
    component: About,
  },
  {
    path: "/Signup",
    key: "APP_PAGE",
    exact: false,
    component: Signup,
  },
  {
    path: "/Login",
    key: "APP_PAGE",
    exact: false,
    component: Login,
  },
  {
    path: "/Profile",
    key: "APP_PAGE",
    exact: false,
    auth: true,
    component: Profile,
  },
  // {
  //   path: "/app",
  //   key: "APP",
  //   component: RenderRoutes, // here's the update
  //   routes: [
  //     {
  //       path: "/app",
  //       key: "APP_ROOT",
  //       exact: true,
  //       component: () => <h1>App Index</h1>,
  //     },
  //     {
  //       path: "/app/page",
  //       key: "APP_PAGE",
  //       exact: true,
  //       component: () => <h1>App Page</h1>,
  //     },
  //   ],
  // },
];

export default ROUTES;

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      component={withRouter(route.component)}
    />
  );
}

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
