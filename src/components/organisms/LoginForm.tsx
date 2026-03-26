import { Button, Input, Form } from "antd";
import { Link } from "react-router-dom";



interface LoginFormValues {
    email: string;
    password: string;
}

interface LoginFormProps {
    onSubmit: (values: LoginFormValues) => void;
    isLoading: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
    const onFinish = (values: LoginFormValues) => {
        onSubmit(values);
    };

    return (
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {required: true, message: "Please Input your Email"},
                    {type: "email", message:"Invalid email"},
                ]}
            >
                <Input placeholder="Email" />

            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {required: true, message: "Please enter your password"},
                ]}
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={isLoading}>
                Login
            </Button>

            <div>
                Doesn't have an account? <Link to="/register">Register</Link>
            </div>

        </Form>
    );
}

export default LoginForm;

