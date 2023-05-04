import React from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
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
    }
  ];

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["interactive"]}
      className="navbar"
      // items={items}
      >
      <div>
        {items.map((item) => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
      </div>

      <div>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </Menu>
  );
}

export default Navbar;
