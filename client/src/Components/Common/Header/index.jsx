import React, { Component } from "react";
import { Header } from "./index.style";
import Menu from "../Menu";
import Img from "../../../assets/header.png";

export default class Logo extends Component {
  render() {
    const { handleLogout } = this.props;

    return (
      <Header>
        <img src={Img} alt="logo" />
        <Menu handleLogout={handleLogout} />
      </Header>
    );
  }
}
