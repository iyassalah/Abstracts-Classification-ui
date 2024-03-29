import { useContext, useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

import "./login.scss";
import * as Response from "../../types/responses";
import * as Request from "../../types/requests";
import { AuthContext } from "../../state/auth/provider";
import useMessage from "antd/es/message/useMessage";

function LoginForm() {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [msgAPI, messageContext] = useMessage();
  const handleLogin = (res: Response.ILogin) => {
    login(res.access_token);
  };

  const handleSubmit = async (values: Request.ILogin) => {
    setLoading(true);

    try {
      const response = await axios.post<Response.ILogin>("/auth/token", values, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      handleLogin(response.data)
    } catch (error) {
      msgAPI.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-wrapper">
      {messageContext}
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
