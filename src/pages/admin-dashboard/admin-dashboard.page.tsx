import './admin-dashboard.scss';

import { Button, Form, Input, message, Tabs, TabsProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import ClassManagement from '../../components/class-management/class-management';
import { AuthContext } from '../../state/auth/provider';
import { AuthStatus } from '../../state/auth/state';
import { ICreateAdmin } from '../../types/responses';

const { TabPane } = Tabs;

type FormValues = {
  username: string;
  password: string;
  email: string;
}

function AdminDashboard() {
  const { state } = useContext(AuthContext);
  if (state.status === AuthStatus.LOGGED_OUT)
    return <Navigate to='/' />;
  const [form] = useForm<FormValues>();

  const handleCreateUser = (values: FormValues) => {
    const { username, email, password } = values;

    axios
      .post<ICreateAdmin>(
        "/admin",
        {
          username,
          email,
          password,
          isAdmin: true,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then(() => {
        message.success('User created successfully');
        form.resetFields();
      })
      .catch((error) => {
        console.error(error);
        message.error('User creation failed');
      });
  };

  const handleCancel = () => {
    form.resetFields();
  }

  const tabs: TabsProps['items'] = [
    {
      key: 'statistics',
      children: <h1>Statistics</h1>,
      label: 'Statistics'
    },
    {
      key: 'class-management',
      children: <ClassManagement token={state.token} />,
      label: 'Class Management'
    },
    {
      key: 'create-admin-user',
      children: (
        <div className="admin-dashboard-create-user-form">
          <Form form={form} layout="vertical" onFinish={handleCreateUser}>
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
              <Button danger onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
      label: 'Create Admin User',
    }
  ]

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-body">
        <h2>Admin Dashboard</h2>
      </div>
      <hr />
      <div className="admin-dashboard-header">
        <Tabs items={tabs} defaultActiveKey="statistics" tabPosition="left" />
      </div>
    </div>
  );

}

export default AdminDashboard;

