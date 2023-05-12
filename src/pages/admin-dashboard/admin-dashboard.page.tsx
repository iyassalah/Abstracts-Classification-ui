import { useState, useContext } from "react";
import { Modal, Input, Form, Button, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import "./admin-dashboard.scss";
import { AuthContext } from "../../state/reducer";

const { TabPane } = Tabs;

function AdminDashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { token } = useContext(AuthContext);

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

    axios
      .post(
        "/admin",
        {
          username,
          email,
          password,
          isAdmin: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      <div className="admin-dashboard-header">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="create-user-btn"
          onClick={handleShowModal}
        >
          Create Admin User
        </Button>
      </div>
      <hr />
      <div className="admin-dashboard-body">
        <Tabs defaultActiveKey="statistics" tabPosition="left">
          <TabPane tab="Statistics" key="statistics">
            <h1>Statistics</h1>
          </TabPane>
          <TabPane tab="Classes Management" key="class-management">
            <h1>Classes Management</h1>
          </TabPane>
        </Tabs>

        <div>
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
      </div>
    </div>
  );
}

export default AdminDashboard;
