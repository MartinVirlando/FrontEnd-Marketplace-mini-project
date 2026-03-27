import { Button, Input, Form } from "antd";
import { Link } from "react-router-dom";

import FormInput from "../molecules/FormInput";



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
            <FormInput
                name="email"
                label="Email"
                rules={[
                    {required: true, message: "Please Input your Email"},
                    {type: "email", message:"Invalid email"},
                ]}
            >
                <Input placeholder="Email" />

            </FormInput>

            <FormInput
                name="password"
                label="Password"
                rules={[
                    {required: true, message: "Please enter your password"},
                ]}
            >
                <Input.Password placeholder="Password" />
            </FormInput>

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

