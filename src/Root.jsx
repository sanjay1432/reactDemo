import React, { useEffect } from "react";

import { Provider } from "./App";
import ROUTES from "./routes";
import { useHistory } from "react-router-dom";

export default function Root() {
  const history = useHistory();

  if (authenticationRequired(history.location)) {
    if (!checkAuthenticatedUser()) {
      history.push(`/Login?requiredAuth`);
    }
  }

  useEffect(() => {
    return history.listen((location) => {
      if (authenticationRequired(location)) {
  
        if (!checkAuthenticatedUser()) {
          history.push(`/Login?requiredAuth`);
        }
      }
    });
  }, [history]);

  return <Provider />;
}

function authenticationRequired(location) {
  return ROUTES.find(
    (route) => location.pathname.includes(route.path) && route.auth
  );
}
function checkAuthenticatedUser() {
  return localStorage.getItem("bearer");
}
