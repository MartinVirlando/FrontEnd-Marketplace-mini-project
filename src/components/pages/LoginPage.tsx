import LoginForm from "../organisms/LoginForm";
import { useLogin } from "../../hooks/useAuth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const { mutate, isPending } = useLogin();

    const handleSumbit = (values: {email: string; password: string}) => {
        mutate(values, {
            onSuccess: (data) => {
                login(data.token, data.user);
                navigate("/");
            },
            onError: () => {
                message.error("Login failed");
            },
        });
    };

    return (
        <LoginForm onSubmit={handleSumbit} isLoading={isPending} />
    )

}