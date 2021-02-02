import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationView"
import { Login } from "./auth/login"
import { Register } from "./auth/register"

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
  