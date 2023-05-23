import { Button, Divider, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { useContext } from 'react';
import { MessageContext } from '../../state/message';
import { ICreateAdmin } from '../../types/responses';


type FormValues = {
    username: string;
    password: string;
    email: string;
}

interface IProps {
    token: string;
}

const CreateAdmin = (props: IProps) => {
    const [form] = useForm<FormValues>();
    const { msgAPI } = useContext(MessageContext);
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
                        Authorization: `Bearer ${props.token}`,
                    },
                }
            )
            .then(() => {
                msgAPI.success('User created successfully');
                form.resetFields();
            })
            .catch((error) => {
                console.error(error);
                msgAPI.error('User creation failed');
            });
    };

    const handleCancel = () => {
        form.resetFields();
    }
    return (
        <div className="admin-dashboard-create-user-form">
            <h1>Create Admin User</h1>
            <Divider />
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
    )
}

export default CreateAdmin