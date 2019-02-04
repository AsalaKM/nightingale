import React from "react";
import { Route } from "react-router-dom";

import Header from "../Common/Header";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import { Container } from "./index.style";
import Conversations from "../Pages/Conversations";

export default function index(props) {
  const { handleChangeState, isLogin } = props;
  return (
    <>
      {isLogin && <Header />}
      <Container>
        <Route
          exact
          path="/login"
          render={props => (
            <Login {...props} handleChangeState={handleChangeState} />
          )}
        />
        <Route
          path="/signup"
          exact
          render={props => (
            <SignUp {...props} handleChangeState={handleChangeState} />
          )}
        />
        <Route exact path="/:id/conversations" component={Conversations} />
      </Container>
    </>
  );
}
