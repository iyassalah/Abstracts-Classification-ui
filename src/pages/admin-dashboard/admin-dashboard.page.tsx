import { useState, useContext } from "react";
import { Modal, Input, Form, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios"; // import axios library
import "./admin-dashboard.scss";
import {AuthContext} from '../../state/reducer'

function AdminDashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {token} = useContext(AuthContext);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = (values: {
    email: string;
    password: string;
    username: string;
  }) => {
    const { username, email, password } = values;

    // send HTTP request to create admin user
    axios
      .post(
        "/admin",
        {
          username,
          email,
          password,
          isAdmin: true,
        },
        { headers: {
          Authorization: `Bearer ${token}`
        } }
      )
      .then((response) => {
        console.log(response.data);
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="admin-dashboard">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className="create-user-btn"
        onClick={handleShowModal}
      >
        Create Admin User
      </Button>
      <hr className="ant-divider-horizontal" />
      <Modal
        title="Create Admin User"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="create-user-modal"
      >
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email address",
              },
              {
                required: true,
                message: "Please enter an email address",
              },
            ]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please enter a username",
              },
            ]}
          >
            <Input placeholder="Username" size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
            ]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create User
            </Button>
            <Button type="danger" onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
