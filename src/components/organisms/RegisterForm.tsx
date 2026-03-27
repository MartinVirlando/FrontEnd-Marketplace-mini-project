import { Button, Input, Form, Select } from "antd";
import { Link } from "react-router-dom";
import FormInput from "../molecules/FormInput";

interface RegisterFormValues {
    email: string;
    password: string;
    phone?: string;
    name: string;
    role: "user" | "seller";
}

interface RegisterFormProps {
    onSubmit: (values: RegisterFormValues) => void;
    isLoading: boolean;
}

const RegisterForm = ({ onSubmit, isLoading}: RegisterFormProps) => {
    const onFinish = (values: RegisterFormValues) => {
        onSubmit(values);
    };

    return (
        <Form layout="vertical" onFinish={onFinish}>
            <FormInput
                name="name"
                label="Name"
                rules={[
                    {required: true, message: "Please enter your name"},
                ]}
            >
                <Input placeholder="Name" />

            </FormInput>

            <FormInput
                name="email"
                label="Email"
                rules={[
                    {required: true, message: "Please enter your email"},
                    {type: "email", message: "Invalid email"},
                ]}
            >
                <Input placeholder="Email" />

            </FormInput>

            <FormInput
                name="password"
                label="Password"
                rules={[
                    {required: true, message: "Please enter your password"},
                    {min: 6, message: "Password must be at least 6 characters"},
                ]}
            >
                <Input.Password placeholder="Password" />

            </FormInput>

            <FormInput
                name="phone"
                label="Phone"
            >
                <Input placeholder="Phone" />

            </FormInput>

            <FormInput
                name="role"
                label="Role"
                rules={[
                    {required: true, message: "Please select your role"},
                ]}
            >
                <Select placeholder="Select your role">
                    <Select.Option value="user">User</Select.Option>
                    <Select.Option value="seller">Seller</Select.Option>
                </Select>

            </FormInput>            

            <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
            >
                Register
            </Button>

            <div>
                Already have an account? <Link to="/login">Login</Link>
            </div>

        </Form>
    )

}

export default RegisterForm;