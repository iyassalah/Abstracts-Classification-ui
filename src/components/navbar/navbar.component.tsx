import { BulbFilled, BulbOutlined } from '@ant-design/icons';
import { Button, Menu, Switch } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/reducer";
import "./navbar.scss";

interface IProps {
  toggle(mode: boolean): void;
  darkTheme: boolean;
}

function Navbar(props: IProps) {
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
      <div className='left-group'>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["interactive"]}
          className="navbar"
          items={role === 'admin' ? [...items, adminLink] : items}
        />
      </div>
      <div className='right-group'>
        <Switch
          defaultChecked={!props.darkTheme}
          onChange={e => props.toggle(!e.valueOf())}
          checkedChildren={<BulbFilled />}
          unCheckedChildren={<BulbOutlined />}
        />
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
    </div>
  );
}

export default Navbar;
