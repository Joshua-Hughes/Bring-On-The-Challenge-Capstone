import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationView"
import { Login } from "./Auth/login"
import { Register } from "./Auth/register"

export const MainPage = () => (
    <>
      <Route
        render={() => {
          if (sessionStorage.getItem("site_user")) {
            return (
              <>
                <ApplicationViews />
              </>
            );
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
  
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );
  