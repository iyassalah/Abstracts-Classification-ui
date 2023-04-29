import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import "./navbar.scss";

function Navbar() {
  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["interactive"]}
      className="navbar"
    >
      <Menu.Item key="batch">
        <Link to="/batch">Batch</Link>
      </Menu.Item>
      <Menu.Item key="interactive">
        <Link to="/interactive">Interactive</Link>
      </Menu.Item>
      <Menu.Item key="results">
        <Link to="/results">Results</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
