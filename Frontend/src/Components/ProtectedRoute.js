import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({
  component: Component,
  isAuthenticated: isAuthenticated,
  isNotAuthenticated :isNotAuthenticated,
  ...rest
}) {
  return (
    <Route
    {...rest}
    render={(props) => {
        if (isAuthenticated) {
          
            return <Component />;
        }
        else if(isNotAuthenticated){
          
            return <Component />
        }
        else {
          
        return (
            <Redirect push to={{ pathname: "/login", state: { from: props.location } }} />
        );
        }
    }}
    />
  );
}

export default ProtectedRoute;