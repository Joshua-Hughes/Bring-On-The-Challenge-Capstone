import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./applicationView"
import { Login } from "../auth/login"
import { Register } from "../auth/register"
import "./Main.css"

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
            return <Redirect to="/login" />;
          }
        }}
      />
  
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </>
  );
  