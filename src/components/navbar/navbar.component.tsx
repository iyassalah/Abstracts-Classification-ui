import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import "./navbar.scss";

function Navbar() {
  const items = [
    {
      key: "batch",
      label: <Link to="/batch">Batch</Link>
    },
    {
      key: "interactive",
      label: <Link to="/interactive">Interactive</Link>
    },
    {
      key: "results",
      label: <Link to="/results">Results</Link>
    }]

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["interactive"]}
      className="navbar"
      items={items}
    />
  );
}

export default Navbar;
