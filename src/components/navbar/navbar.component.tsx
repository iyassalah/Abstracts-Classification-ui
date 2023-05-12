import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import "./navbar.scss";
import { AuthContext } from "../../state/reducer";

function Navbar() {
  const { token, username, role } = useContext(AuthContext);

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

  const adminLink = {
    key: "admin-dashboard",
    label: <Link to="/adminDashboard">Admin Dashboard</Link>
  };

  return (
    <div className="navbar-wrapper">
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["interactive"]}
        className="navbar"
        items={role === 'admin' ? [...items, adminLink] : items}
      >
      </Menu>
      <div>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      </div>
    </div >
  );
}

export default Navbar;
