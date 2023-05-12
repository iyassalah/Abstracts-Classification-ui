import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Button } from "antd";
import "./navbar.scss";
import { AuthContext } from "../../state/reducer";

function Navbar() {
  const { token, username, role, logout } = useContext(AuthContext);

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
      <div>{token === null ? (
          <Button>
            <Link to="/login">Login</Link>
          </Button>) : (
          <div>
            <span>Welcome, {username + " "}</span>
            <Button onClick={logout}>Logout</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
