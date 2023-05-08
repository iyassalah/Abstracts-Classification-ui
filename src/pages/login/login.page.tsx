import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

import "./login.scss";
import { ILogin } from "../../types/responses";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [Logged, setLogged] = useState(false);
  const handleLogin = (res: ILogin) => {
    setLogged(true);
  };

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      const response = await axios.post<ILogin>("http://localhost:8000/login", values);
      handleLogin(response.data)
    } catch (error) {
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-wrapper">
      <div className="login-form-container">
        <Form
          onFinish={handleSubmit}
          initialValues={{ remember: true }}
          layout="vertical"
          className="login-form"
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input size="large" placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password size="large" placeholder="Enter password" />
          </Form.Item>

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
